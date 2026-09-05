import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useEngine } from '../context/EngineContext';
import { ArrowLeft, Check, AlertTriangle, Activity, ShieldAlert, Cpu } from 'lucide-react';

export function AppInvestigator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCase, updateCaseStatus } = useEngine();
  
  const mockCase = id ? getCase(id) : undefined;
  
  const [evidenceRequested, setEvidenceRequested] = useState(false);

  if (!mockCase) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <AlertTriangle className="w-12 h-12 text-warning mb-4" />
        <h2 className="text-2xl font-medium mb-2">Case Not Found</h2>
        <p className="text-text-secondary mb-6">This case may not exist or the benchmark needs to be run.</p>
        <Button onClick={() => navigate('/app')}>Return to Dashboard</Button>
      </div>
    );
  }

  const handleApprove = () => {
    if (id) {
      updateCaseStatus(id, 'Approved');
    }
  };

  const isResolvedOrApproved = mockCase.status === 'Resolved' || mockCase.status === 'Approved';

  return (
    <div className="flex flex-col h-full max-w-[1400px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="sm" onClick={() => navigate('/app')} className="px-2 -ml-2 text-text-secondary hover:text-active-black">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to benchmark
          </Button>
          <div className="h-6 w-px bg-border-light"></div>
          <div>
            <div className="text-[11px] font-mono font-medium tracking-[0.1em] text-text-muted uppercase mb-1">CASE {mockCase.id}</div>
            <h1 className="font-display text-[24px] font-semibold tracking-tight text-active-black flex items-center gap-3 leading-none">
              <span className="tabular-nums">₹{mockCase.discrepancy.toLocaleString()}</span> {mockCase.type}
              <span className={`h-[22px] px-2 flex items-center justify-center text-[10px] font-bold tracking-wider rounded-md border ${
                mockCase.status === 'Resolved' ? 'bg-success-bg text-success border-success/20' : 
                mockCase.status === 'Approved' ? 'bg-success-bg text-success border-success/20' : 
                'bg-warning-bg text-warning border-warning/20'
              }`}>
                {mockCase.status === 'Resolved' ? 'AUTO-RESOLVED' : 
                 mockCase.status === 'Approved' ? 'HUMAN APPROVED' : 'REVIEW REQUIRED'}
              </span>
            </h1>
          </div>
        </div>
        <div className="flex gap-3">
          {!isResolvedOrApproved && (
            <>
              <Button 
                variant="outline" 
                onClick={() => setEvidenceRequested(true)}
                disabled={evidenceRequested} 
                className="h-[40px] text-[13px] px-5"
              >
                {evidenceRequested ? "Evidence requested" : "Request Evidence"}
              </Button>
              <Button 
                onClick={handleApprove}
                className="h-[40px] text-[13px] px-5 transition-all"
              >
                Approve Resolution
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Investigation Three-Part Layout */}
      <div className="mt-4 border border-border-light rounded-xl overflow-hidden bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex flex-col lg:flex-row flex-1 min-h-0">
        
        {/* Left: Deterministic Records */}
        <div className="w-full lg:w-[30%] p-6 md:p-8 lg:border-r border-border-light flex flex-col overflow-y-auto bg-[#FAFAFA]/50">
          <h2 className="text-[11px] font-mono font-medium tracking-[0.1em] text-text-muted uppercase mb-6 flex items-center gap-2">
            <Activity className="h-3.5 w-3.5" /> Deterministic Match
          </h2>
          
          <div className="flex flex-col gap-8">
            {/* Razorpay */}
            {mockCase.relatedRecords.razorpay.length > 0 && (
              <div>
                <div className="text-[12px] font-medium text-text-secondary mb-4 border-b border-border-light pb-2">Source: Razorpay</div>
                <div className="space-y-3">
                  {mockCase.relatedRecords.razorpay.map(r => (
                    <div key={r.id} className="flex justify-between items-center text-[13px] bg-white border border-border-light p-3 rounded-lg shadow-sm">
                      <div>
                        <div className="text-text-primary font-medium">{r.type}</div>
                        <div className="font-mono text-[11px] text-text-muted mt-0.5">{r.id}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-medium text-active-black tabular-nums">₹{r.amount.toLocaleString()}</div>
                        <div className={`text-[11px] flex items-center justify-end gap-1 mt-0.5 ${r.status === 'Verified' ? 'text-success' : 'text-error'}`}>
                          {r.status === 'Verified' ? <Check className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />} {r.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Bank */}
            {mockCase.relatedRecords.bank.length > 0 && (
              <div>
                <div className="text-[12px] font-medium text-text-secondary mb-4 border-b border-border-light pb-2">Source: Bank</div>
                <div className="space-y-3">
                  {mockCase.relatedRecords.bank.map(r => (
                    <div key={r.id} className="flex justify-between items-center text-[13px] bg-white border border-border-light p-3 rounded-lg shadow-sm">
                      <div>
                        <div className="text-text-primary font-medium">{r.type}</div>
                        <div className="font-mono text-[11px] text-text-muted mt-0.5">{r.id}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-medium text-active-black tabular-nums">₹{r.amount.toLocaleString()}</div>
                        <div className={`text-[11px] flex items-center justify-end gap-1 mt-0.5 ${r.status === 'Verified' ? 'text-success' : 'text-error'}`}>
                          {r.status === 'Verified' ? <Check className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />} {r.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Ledger */}
            {mockCase.relatedRecords.ledger.length > 0 ? (
              <div>
                <div className="text-[12px] font-medium text-text-secondary mb-4 border-b border-border-light pb-2">Source: ERP Ledger</div>
                <div className="space-y-3">
                  {mockCase.relatedRecords.ledger.map(r => (
                    <div key={r.id} className={`flex justify-between items-center text-[13px] border p-3 rounded-lg shadow-sm ${r.status === 'Mismatch' ? 'bg-error-bg/30 border-error/20' : 'bg-white border-border-light'}`}>
                      <div>
                        <div className={`font-medium ${r.status === 'Mismatch' ? 'text-error' : 'text-text-primary'}`}>{r.type}</div>
                        <div className={`font-mono text-[11px] mt-0.5 ${r.status === 'Mismatch' ? 'text-error/70' : 'text-text-muted'}`}>{r.id}</div>
                      </div>
                      <div className="text-right">
                        <div className={`font-mono font-medium tabular-nums ${r.status === 'Mismatch' ? 'text-error' : 'text-active-black'}`}>₹{r.amount.toLocaleString()}</div>
                        <div className={`text-[11px] flex items-center justify-end gap-1 mt-0.5 ${r.status === 'Verified' ? 'text-success' : 'text-error'}`}>
                          {r.status === 'Verified' ? <Check className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />} {r.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                 <div className="text-[12px] font-medium text-text-secondary mb-4 border-b border-border-light pb-2">Source: ERP Ledger</div>
                 <div className="text-[13px] text-error flex items-center gap-2 p-3 bg-error-bg/30 border border-error/20 rounded-lg">
                   <AlertTriangle className="w-4 h-4" />
                   Missing entry for this reference
                 </div>
              </div>
            )}
          </div>
        </div>

        {/* Centre: AI Investigation */}
        <div className="w-full lg:w-[40%] p-6 md:p-8 lg:border-r border-border-light flex flex-col overflow-y-auto bg-white">
          <h2 className="text-[11px] font-mono font-medium tracking-[0.1em] text-text-muted uppercase mb-6 flex items-center gap-2">
            <Cpu className="h-3.5 w-3.5" /> Agent Trace
          </h2>
          
          <div className="flex flex-col flex-1">
            <div className="space-y-5 mb-8 flex-1">
              {mockCase.agentTrace.map((trace, i) => (
                <div key={i} className="flex gap-4">
                  <div className="font-mono text-[11px] text-text-muted pt-0.5 shrink-0">{trace.time}</div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        trace.type === 'system' ? 'bg-active-black' :
                        trace.type === 'retrieve' ? 'bg-blue-500' :
                        trace.type === 'compare' ? 'bg-purple-500' :
                        trace.type === 'evaluate' ? 'bg-warning' :
                        'bg-success'
                      }`}></span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-text-secondary">{trace.type}</span>
                    </div>
                    <div className="text-[14px] text-text-primary leading-[1.5]">{trace.action}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-6 border-t border-border-light">
              <div className="text-[11px] font-mono font-medium tracking-[0.1em] text-text-muted uppercase mb-3">AI Hypothesis</div>
              <h3 className="text-[16px] font-medium text-active-black mb-3">{mockCase.hypothesis.title}</h3>
              <ul className="space-y-2 mb-4">
                {mockCase.hypothesis.evidence.map((ev, i) => (
                  <li key={i} className="flex gap-2.5 text-[13px] text-text-secondary leading-[1.5]">
                    <span className="text-text-muted mt-0.5">•</span> {ev}
                  </li>
                ))}
              </ul>
              <div className={`inline-flex items-center gap-1.5 text-[13px] font-medium px-3 py-1.5 rounded-md ${
                mockCase.status === 'Resolved' ? 'bg-success-bg text-success' : 
                mockCase.status === 'Approved' ? 'bg-success-bg text-success' : 'bg-error-bg text-error'
              }`}>
                {mockCase.status === 'Resolved' || mockCase.status === 'Approved' ? <Check className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                {mockCase.hypothesis.conclusion}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Policy & Action */}
        <div className="w-full lg:w-[30%] p-6 md:p-8 bg-[#FAFAFA]/50 flex flex-col overflow-y-auto">
          <h2 className="text-[11px] font-mono font-medium tracking-[0.1em] text-text-muted uppercase mb-6 flex items-center gap-2">
            <ShieldAlert className="h-3.5 w-3.5" /> Policy Engine
          </h2>
          
          <div className="flex flex-col h-full">
            <div className="mb-8">
              <div className="space-y-3">
                {mockCase.policy.rules.map((rule, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white border border-border-light p-3 rounded-lg shadow-sm">
                    <div className={`mt-0.5 shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${rule.passed ? 'bg-success' : 'bg-error'}`}>
                      {rule.passed ? <Check className="h-2.5 w-2.5 text-white" /> : <AlertTriangle className="h-2.5 w-2.5 text-white" />}
                    </div>
                    <div>
                      <div className="font-mono text-[11px] text-text-muted mb-0.5">{rule.id}</div>
                      <div className={`text-[13px] ${rule.passed ? 'text-text-primary' : 'text-error font-medium'}`}>{rule.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-6 border-t border-border-light">
              <div className="text-[11px] font-mono font-medium tracking-[0.1em] text-text-muted uppercase mb-4">Policy Result</div>
              
              <div className={`text-[15px] font-medium flex items-center gap-2 mb-6 ${
                isResolvedOrApproved ? 'text-success' : 'text-error'
              }`}>
                {isResolvedOrApproved ? <Check className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />} 
                {mockCase.policy.result}
              </div>

              {mockCase.policy.journal.length > 0 ? (
                <>
                  <div className="text-[11px] font-mono font-medium tracking-[0.1em] text-text-muted uppercase mb-3">Proposed Action</div>
                  <p className="text-[14px] text-text-primary font-medium mb-4">{mockCase.policy.action}</p>
                  
                  <div className="font-mono text-[12px] text-active-black bg-white p-4 rounded-[8px] border border-border-light shadow-sm mb-4 space-y-2.5">
                    {mockCase.policy.journal.map((entry, i) => (
                      <div key={i} className="flex justify-between items-center pb-2.5 border-b border-border-light last:border-0 last:pb-0">
                        <div>
                          <span className="text-text-muted mr-2">{entry.type}</span>
                          {entry.account}
                        </div>
                        <span className="tabular-nums">₹{entry.amount.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                   <div className="text-[11px] font-mono font-medium tracking-[0.1em] text-text-muted uppercase mb-3">Proposed Action</div>
                   <p className="text-[14px] text-text-primary font-medium mb-4">{mockCase.policy.action}</p>
                </>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
