export type RecordSource = 'razorpay' | 'bank' | 'ledger';

export interface BaseRecord {
  id: string;
  amount: number;
  date: string;
  type: string;
  source: RecordSource;
  status?: string;
}

export interface RazorpayRecord extends BaseRecord {
  source: 'razorpay';
  fee: number;
  tax: number;
  settlementId?: string;
}

export interface BankRecord extends BaseRecord {
  source: 'bank';
  reference: string;
}

export interface LedgerRecord extends BaseRecord {
  source: 'ledger';
  account: string;
  reference: string;
}

export interface ExceptionCase {
  id: string;
  type: string;
  discrepancy: number;
  severity: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'Resolved' | 'Escalated' | 'Approved';
  relatedRecords: {
    razorpay: RazorpayRecord[];
    bank: BankRecord[];
    ledger: LedgerRecord[];
  };
  agentTrace: { time: string; action: string; type: 'system' | 'retrieve' | 'compare' | 'evaluate' | 'decision' }[];
  hypothesis: {
    title: string;
    evidence: string[];
    conclusion: string;
  };
  policy: {
    rules: { id: string; description: string; passed: boolean }[];
    result: string;
    action: string;
    journal: { account: string; type: 'Dr' | 'Cr'; amount: number }[];
  };
}

// Data generator
export function generateMockDataset(count: number) {
  const razorpay: RazorpayRecord[] = [];
  const bank: BankRecord[] = [];
  const ledger: LedgerRecord[] = [];
  
  for (let i = 0; i < count; i++) {
    const isAnomaly = Math.random() < 0.25; // 25% exception rate for demo
    const baseAmount = Math.floor(Math.random() * 50000) + 1000;
    const date = new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000).toISOString().split('T')[0];
    const id = `TXN_${Math.floor(Math.random() * 1000000)}`;
    
    // Razorpay record
    const rzpRecord: RazorpayRecord = {
      id: `RZP_${id}`,
      amount: baseAmount,
      fee: Math.floor(baseAmount * 0.02),
      tax: Math.floor(baseAmount * 0.02 * 0.18),
      date,
      type: 'Payment',
      source: 'razorpay',
      status: 'Settled'
    };
    razorpay.push(rzpRecord);
    
    const netAmount = rzpRecord.amount - rzpRecord.fee - rzpRecord.tax;
    
    // Bank record
    const bankRecord: BankRecord = {
      id: `BNK_${id}`,
      amount: netAmount,
      date,
      type: 'Credit',
      source: 'bank',
      reference: `SETL_${id}`
    };
    bank.push(bankRecord);
    
    // Ledger record
    if (isAnomaly) {
      const anomalyType = Math.random();
      if (anomalyType < 0.33) {
        // Missing ledger entirely
      } else if (anomalyType < 0.66) {
        // Recorded gross instead of net
        ledger.push({
          id: `LDG_${id}`,
          amount: baseAmount,
          date,
          type: 'Journal Entry',
          source: 'ledger',
          account: '1001-Cash',
          reference: `SETL_${id}`
        });
      } else {
        // Typo in amount
        ledger.push({
          id: `LDG_${id}`,
          amount: netAmount + 1000,
          date,
          type: 'Journal Entry',
          source: 'ledger',
          account: '1001-Cash',
          reference: `SETL_${id}`
        });
      }
    } else {
      // Perfect match
      ledger.push({
        id: `LDG_${id}`,
        amount: netAmount,
        date,
        type: 'Journal Entry',
        source: 'ledger',
        account: '1001-Cash',
        reference: `SETL_${id}`
      });
    }
  }
  
  return { razorpay, bank, ledger };
}

// Reconciliation Engine Simulation
export function runReconciliationEngine(data: { razorpay: RazorpayRecord[], bank: BankRecord[], ledger: LedgerRecord[] }) {
  const { razorpay, bank, ledger } = data;
  let matched = 0;
  const exceptions: ExceptionCase[] = [];
  
  const ledgerByRef = new Map<string, LedgerRecord>();
  ledger.forEach(l => ledgerByRef.set(l.reference, l));
  
  const bankByRef = new Map<string, BankRecord>();
  bank.forEach(b => bankByRef.set(b.reference, b));
  
  razorpay.forEach((rzp, index) => {
    const expectedNet = rzp.amount - rzp.fee - rzp.tax;
    const ref = `SETL_${rzp.id.replace('RZP_', '')}`;
    
    const bnk = bankByRef.get(ref);
    const ldg = ledgerByRef.get(ref);
    
    if (bnk && bnk.amount === expectedNet && ldg && ldg.amount === expectedNet) {
      matched++;
    } else {
      // Generate Case
      const caseId = `EX-${1000 + exceptions.length}`;
      const discrepancy = ldg ? Math.abs(ldg.amount - expectedNet) : expectedNet;
      
      let type = "Unknown";
      let severity: 'High' | 'Medium' | 'Low' = 'Low';
      let title = "";
      let evidence: string[] = [];
      let conclusion = "";
      let rulePassed = false;
      let action = "";
      let journal: any[] = [];
      let status: 'Resolved' | 'Escalated' = 'Escalated';
      
      if (!ldg) {
        type = "Missing Ledger Entry";
        severity = discrepancy > 10000 ? 'High' : 'Medium';
        title = "Ledger entry completely missing for settled batch";
        evidence = [
          "Razorpay settlement verified",
          "Bank statement shows credit of " + expectedNet,
          "No matching reference found in ERP Ledger"
        ];
        conclusion = "Transaction settled successfully but ERP synchronization failed.";
        rulePassed = discrepancy <= 25000;
        action = "Post missing journal entry to Cash and Receivables";
        journal = [
          { account: "1001-Cash", type: "Dr", amount: expectedNet },
          { account: "1200-Receivables", type: "Cr", amount: expectedNet }
        ];
        status = rulePassed ? 'Resolved' : 'Escalated';
      } else if (ldg.amount === rzp.amount) {
        type = "Gross vs Net Mismatch";
        severity = 'Medium';
        title = "Ledger recorded Gross amount instead of Net (less fees)";
        evidence = [
          "Razorpay shows Gross " + rzp.amount + " and Fee " + (rzp.fee + rzp.tax),
          "Bank received Net " + expectedNet,
          "Ledger recorded Gross " + ldg.amount
        ];
        conclusion = "ERP recorded gross sales without accounting for payment gateway fees.";
        rulePassed = true;
        action = "Post adjustment for PG fees";
        journal = [
          { account: "6001-PG Fees", type: "Dr", amount: rzp.fee + rzp.tax },
          { account: "1001-Cash", type: "Cr", amount: rzp.fee + rzp.tax }
        ];
        status = 'Resolved';
      } else {
        type = "Amount Mismatch";
        severity = 'High';
        title = "Unexplained variance between Bank and Ledger";
        evidence = [
          "Bank shows " + expectedNet,
          "Ledger shows " + ldg.amount,
          "Variance is " + discrepancy
        ];
        conclusion = "Data entry error or combined journal entry in ERP.";
        rulePassed = false;
        action = "Manual investigation required to locate variance source.";
        journal = [];
        status = 'Escalated';
      }
      
      const formatTime = (offsetSecs: number) => {
        const d = new Date(Date.now() - 3600000 + offsetSecs * 1000);
        return d.toISOString().substr(11, 8);
      };

      exceptions.push({
        id: caseId,
        type,
        discrepancy,
        severity,
        status,
        relatedRecords: {
          razorpay: [ { ...rzp, status: 'Verified' } ],
          bank: bnk ? [ { ...bnk, status: 'Verified' } ] : [],
          ledger: ldg ? [ { ...ldg, status: 'Mismatch' } ] : []
        },
        agentTrace: [
          { time: formatTime(0), action: `Case ${caseId} opened automatically by Reconciliation Engine`, type: "system" },
          { time: formatTime(2), action: `Retrieved Razorpay settlement ${rzp.id}`, type: "retrieve" },
          { time: formatTime(4), action: `Queried bank feed for reference ${ref}`, type: "retrieve" },
          { time: formatTime(5), action: `Compared expected net (${expectedNet}) vs actual bank (${bnk?.amount || 0})`, type: "compare" },
          { time: formatTime(7), action: `Searched ERP ledger for reference ${ref}`, type: "retrieve" },
          { time: formatTime(9), action: `Evaluated variance of ${discrepancy} across 3 systems`, type: "evaluate" },
          { time: formatTime(12), action: `Formulated hypothesis: ${title}`, type: "decision" }
        ],
        hypothesis: {
          title,
          evidence,
          conclusion
        },
        policy: {
          rules: [
            { id: "REC_001", description: "Source records exist and are authentic", passed: !!bnk },
            { id: "REC_015", description: "Variance is fully explainable deterministically", passed: type !== "Amount Mismatch" },
            { id: "REC_042", description: "Auto-correction threshold < ₹25,000", passed: rulePassed }
          ],
          result: (rulePassed && type !== "Amount Mismatch") ? "Approval criteria met" : "Escalated for human review",
          action,
          journal
        }
      });
    }
  });
  
  return {
    stats: {
      total: razorpay.length,
      matched,
      exceptions: exceptions.length,
      autoResolved: exceptions.filter(e => e.status === 'Resolved').length,
      escalated: exceptions.filter(e => e.status === 'Escalated').length
    },
    exceptions
  };
}
