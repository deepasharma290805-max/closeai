import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ArrowRight, Check, AlertTriangle, FileText, Activity, Database, Shield } from 'lucide-react';
import { cn } from '../utils/cn';

const steps = [
  { 
    id: '01', 
    title: 'Match', 
    received: '2,000 records across Razorpay, Bank, and Ledger',
    discovered: '1,840 matched deterministically. 160 anomalies flagged.',
    decision: 'Send 160 records to investigation pipeline',
    evidence: 'Rules execution log REC_12',
    allowed: true
  },
  { 
    id: '02', 
    title: 'Investigate', 
    received: 'Case EX-293: ₹18,400 settlement discrepancy',
    discovered: 'Refund RF_8192 is inside settlement but missing from ledger.',
    decision: 'Root cause established: Missing ledger entry',
    evidence: 'PAY_2821 → RF_8192 → SETL_282 → UTR82912',
    allowed: true
  },
  { 
    id: '03', 
    title: 'Verify', 
    received: 'Proposed journal: Dr Customer Refund ₹5,000 / Cr Receivable ₹5,000',
    discovered: 'Journal balances perfectly. All source records exist.',
    decision: 'Calculations verified',
    evidence: 'Double-entry validation engine',
    allowed: true
  },
  { 
    id: '04', 
    title: 'Govern', 
    received: 'Verified action for Case EX-293',
    discovered: 'Refund corrections > ₹2,500 require human review (Rule REC_042).',
    decision: 'Automatic correction blocked',
    evidence: 'Policy Engine Rule REC_042',
    allowed: false
  },
  { 
    id: '05', 
    title: 'Close', 
    received: 'Human approval received from Finance Manager',
    discovered: 'Action authorized. Journal ready to sync.',
    decision: 'Case EX-293 Closed',
    evidence: 'Reviewer audit log AUD_891',
    allowed: true
  },
];

export function Website() {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full selection:bg-success-bg selection:text-success">
      
      {/* Hero Section */}
      <section className="mx-auto w-full max-w-[1240px] px-5 md:px-[32px] lg:px-[48px] pt-[48px] md:pt-[64px] pb-[48px] md:pb-[64px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          <div className="lg:col-span-5 flex flex-col">
            <div className="text-[11px] font-mono font-medium tracking-[0.2em] text-text-muted uppercase mb-6">
              AI Finance Controller
            </div>
            <h1 className="font-display text-[44px] lg:text-[56px] xl:text-[68px] font-semibold leading-[1.05] tracking-tight text-active-black mb-6 max-w-[600px]">
              Close the transactions<br className="hidden lg:block" /> your rules can't.
            </h1>
            <p className="text-[17px] leading-[1.6] text-text-secondary mb-10 max-w-[480px]">
              CloseAI investigates reconciliation exceptions across Razorpay, bank, and books, then resolves what it can prove and escalates what it cannot.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Button size="lg" className="w-full sm:w-auto h-[44px] px-6 text-[14px]" onClick={() => navigate('/app')}>
                Run the product demo
              </Button>
              <Button size="lg" variant="secondary" className="w-full sm:w-auto h-[44px] px-6 text-[14px]" onClick={() => navigate('/app')}>
                See a resolved case
              </Button>
            </div>
            <div className="text-[12px] font-medium text-text-muted">
              Rules for certainty · AI for investigation · Policy for control
            </div>
          </div>

          <div className="lg:col-span-7 flex w-full relative">
            {/* Subtle glow effect behind product window */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/[0.02] to-transparent rounded-2xl blur-xl translate-y-4"></div>
            
            <div className="w-full bg-white rounded-2xl shadow-[0_24px_60px_-15px_rgba(0,0,0,0.08)] border border-border-light overflow-hidden flex flex-col relative z-10">
              {/* Toolbar */}
              <div className="h-10 border-b border-border-light bg-[#FAFAFA]/80 backdrop-blur-md flex items-center px-4 justify-between shrink-0">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-border-strong/40"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-border-strong/40"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-border-strong/40"></div>
                </div>
                <div className="font-mono text-[10px] text-text-muted tracking-wide">app.closeai.com/cases/EX-293</div>
                <div className="w-8"></div>
              </div>
              
              <div className="p-8 md:p-10 flex-1">
                <div className="flex justify-between items-start border-b border-border-light pb-6 mb-6">
                  <div>
                    <div className="font-mono text-[11px] font-medium tracking-wider text-text-secondary mb-2">CASE EX-293</div>
                    <div className="font-display text-[32px] font-semibold text-active-black tracking-tight leading-none mb-3">₹18,400 <span className="font-sans text-[16px] text-text-secondary font-medium tracking-normal">discrepancy</span></div>
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-warning mt-1">
                      <AlertTriangle className="w-4 h-4" /> Resolution proposed
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="font-mono text-[11px] font-medium text-text-muted uppercase tracking-[0.1em] mb-3">Root cause</div>
                  <div className="text-[15px] text-text-primary leading-[1.6]">Refund RF_8192 was included in the settlement but missing from the ledger.</div>
                </div>

                <div className="mb-8">
                  <div className="font-mono text-[11px] font-medium text-text-muted uppercase tracking-[0.1em] mb-3">Evidence chain</div>
                  <div className="flex items-center gap-2.5 flex-wrap font-mono text-[13px] text-active-black">
                    <span className="border border-border-light bg-[#FAFAFA] shadow-sm px-2.5 py-1.5 rounded-[6px]">PAY_2821</span>
                    <ArrowRight className="w-4 h-4 text-border-strong" />
                    <span className="border border-border-light bg-[#FAFAFA] shadow-sm px-2.5 py-1.5 rounded-[6px]">RF_8192</span>
                    <ArrowRight className="w-4 h-4 text-border-strong" />
                    <span className="border border-border-light bg-[#FAFAFA] shadow-sm px-2.5 py-1.5 rounded-[6px]">SETL_282</span>
                    <ArrowRight className="w-4 h-4 text-border-strong" />
                    <span className="border border-border-light bg-[#FAFAFA] shadow-sm px-2.5 py-1.5 rounded-[6px]">UTR82912</span>
                    <ArrowRight className="w-4 h-4 text-border-strong" />
                    <span className="text-text-secondary px-2.5 py-1.5">Ledger</span>
                  </div>
                </div>

                <div className="bg-[#FAFAFA] border border-border-light rounded-[8px] p-5 font-mono text-[13px]">
                  <div className="flex justify-between mb-2"><span className="text-text-secondary">Expected settlement</span><span className="text-active-black">₹82,492</span></div>
                  <div className="flex justify-between mb-2"><span className="text-text-secondary">Bank received</span><span className="text-active-black">₹82,492</span></div>
                  <div className="flex justify-between mb-2"><span className="text-text-secondary">Ledger expected</span><span className="text-active-black">₹100,892</span></div>
                  <div className="flex justify-between border-t border-border-light pt-3 mt-3 font-medium"><span className="text-error">Missing refund entry</span><span className="text-error">₹18,400</span></div>
                </div>

                <div className="mt-8 flex flex-wrap gap-5 text-[13px] font-medium">
                  <div className="flex items-center gap-2 text-success"><Check className="w-4 h-4" /> Bank reconciles</div>
                  <div className="flex items-center gap-2 text-success"><Check className="w-4 h-4" /> Journal balanced</div>
                  <div className="flex items-center gap-2 text-warning"><AlertTriangle className="w-4 h-4" /> Approval required</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Trust Strip */}
      <section className="border-y border-border-light bg-[#F0F0EE]">
        <div className="mx-auto w-full max-w-[1240px] px-5 md:px-[32px] lg:px-[48px]">
          <div className="py-4 border-b border-border-strong/50">
            <div className="font-mono text-[11px] font-medium tracking-wider text-text-muted uppercase">Synthetic benchmark (Live preview)</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border-strong/50">
            <div className="py-6 sm:pr-8"><span className="font-mono font-medium text-active-black">100</span> <span className="text-[14px] text-text-secondary ml-1">records evaluated</span></div>
            <div className="py-6 sm:px-8"><span className="font-mono font-medium text-active-black">72</span> <span className="text-[14px] text-text-secondary ml-1">matched by rules</span></div>
            <div className="py-6 sm:px-8"><span className="font-mono font-medium text-active-black">28</span> <span className="text-[14px] text-text-secondary ml-1">exceptions investigated</span></div>
            <div className="py-6 sm:pl-8"><span className="font-mono font-medium text-active-black">0</span> <span className="text-[14px] text-text-secondary ml-1">false automatic resolutions</span></div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-[104px] md:py-[128px]">
        <div className="mx-auto w-full max-w-[1240px] px-5 md:px-[32px] lg:px-[48px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            
            <div className="lg:col-span-5">
              <h2 className="text-[30px] md:text-[36px] lg:text-[44px] font-medium leading-[1.08] tracking-[-0.035em] text-active-black mb-6">
                Three systems.<br/>One unexplained difference.
              </h2>
              <p className="text-[17px] md:text-[19px] leading-[1.55] text-text-secondary">
                A payment can be correct in Razorpay, received correctly by the bank, and still be recorded incorrectly in the books. Finance teams must reconstruct the complete money trail before they can safely close the exception.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-white border border-border-light rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border-light bg-[#FAFAFA]">
                      <th className="py-3.5 px-6 font-mono text-[11px] font-medium tracking-[0.1em] text-text-muted uppercase">System</th>
                      <th className="py-3.5 px-6 font-mono text-[11px] font-medium tracking-[0.1em] text-text-muted uppercase">Record</th>
                      <th className="py-3.5 px-6 font-mono text-[11px] font-medium tracking-[0.1em] text-text-muted uppercase text-right">Value</th>
                      <th className="py-3.5 px-6 font-mono text-[11px] font-medium tracking-[0.1em] text-text-muted uppercase text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-[14px]">
                    <tr className="border-b border-border-light/60 hover:bg-black/[0.01] transition-colors">
                      <td className="py-4 px-6 font-medium text-active-black">Razorpay</td>
                      <td className="py-4 px-6 text-text-secondary">Settlement batch</td>
                      <td className="py-4 px-6 font-mono text-right text-active-black tabular-nums">₹82,492.00</td>
                      <td className="py-4 px-6 text-right">
                        <div className="inline-flex items-center gap-1.5 text-success text-[12px] font-medium bg-success-bg px-2.5 py-1 rounded-full">
                          <Check className="w-3.5 h-3.5" /> Reconciled
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-border-light/60 hover:bg-black/[0.01] transition-colors">
                      <td className="py-4 px-6 font-medium text-active-black">Bank</td>
                      <td className="py-4 px-6 text-text-secondary">Statement receipt</td>
                      <td className="py-4 px-6 font-mono text-right text-active-black tabular-nums">₹82,492.00</td>
                      <td className="py-4 px-6 text-right">
                        <div className="inline-flex items-center gap-1.5 text-success text-[12px] font-medium bg-success-bg px-2.5 py-1 rounded-full">
                          <Check className="w-3.5 h-3.5" /> Reconciled
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-border-light hover:bg-black/[0.01] transition-colors">
                      <td className="py-4 px-6 font-medium text-active-black">Ledger</td>
                      <td className="py-4 px-6 text-text-secondary">Books balance</td>
                      <td className="py-4 px-6 font-mono text-right text-active-black tabular-nums">₹100,892.00</td>
                      <td className="py-4 px-6 text-right">
                        <div className="inline-flex items-center gap-1.5 text-error text-[12px] font-medium bg-error-bg px-2.5 py-1 rounded-full">
                          <AlertTriangle className="w-3.5 h-3.5" /> Unmatched
                        </div>
                      </td>
                    </tr>
                    <tr className="bg-error-bg/50">
                      <td colSpan={2} className="py-4 px-6 font-medium text-error">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" />
                          Missing refund entry
                        </div>
                      </td>
                      <td className="py-4 px-6 font-mono text-right text-error font-semibold tabular-nums">₹18,400.00</td>
                      <td className="py-4 px-6"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="how-it-works" className="py-[104px] md:py-[128px] border-t border-border-light bg-[#F9F9F8]">
        <div className="mx-auto w-full max-w-[1240px] px-5 md:px-[32px] lg:px-[48px]">
          <h2 className="text-[30px] md:text-[36px] lg:text-[44px] font-medium leading-[1.08] tracking-[-0.035em] text-active-black mb-16 text-center">
            How CloseAI investigates
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Desktop Left / Mobile Top - Steps Navigation */}
            <div className="lg:col-span-4 flex flex-col gap-2">
              {steps.map((step, index) => (
                <button 
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  className={cn(
                    "text-left p-4 rounded-[8px] transition-colors border outline-none focus-visible:ring-2 focus-visible:ring-active-black flex items-center gap-4",
                    activeStep === index 
                      ? "bg-white border-border-strong shadow-sm" 
                      : "border-transparent hover:bg-black/5 text-text-secondary"
                  )}
                >
                  <span className={cn("font-mono text-[14px]", activeStep === index ? "text-active-black font-medium" : "text-text-muted")}>
                    {step.id}
                  </span>
                  <span className={cn("text-[17px] font-medium", activeStep === index ? "text-active-black" : "")}>
                    {step.title}
                  </span>
                </button>
              ))}
            </div>

            {/* Desktop Right / Mobile Bottom - Product Panel */}
            <div className="lg:col-span-8">
              <div className="bg-white border border-border-strong rounded-[10px] p-6 md:p-10 min-h-[400px] flex flex-col justify-center transition-opacity duration-220">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  <div className="space-y-8">
                    <div>
                      <div className="font-mono text-[11px] font-medium tracking-wider text-text-muted uppercase mb-2">What we received</div>
                      <div className="text-[15px] text-text-primary">{steps[activeStep].received}</div>
                    </div>
                    <div>
                      <div className="font-mono text-[11px] font-medium tracking-wider text-text-muted uppercase mb-2">What we discovered</div>
                      <div className="text-[15px] text-active-black font-medium">{steps[activeStep].discovered}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    <div>
                      <div className="font-mono text-[11px] font-medium tracking-wider text-text-muted uppercase mb-2">Decision</div>
                      <div className="text-[15px] text-text-primary">{steps[activeStep].decision}</div>
                    </div>
                    <div>
                      <div className="font-mono text-[11px] font-medium tracking-wider text-text-muted uppercase mb-2">Evidence</div>
                      <div className="font-mono text-[13px] bg-[#F0F0EE] px-2 py-1 rounded-[4px] inline-block text-active-black">{steps[activeStep].evidence}</div>
                    </div>
                    <div>
                      <div className={cn(
                        "inline-flex items-center gap-2 px-3 py-1.5 rounded-[4px] text-[13px] font-medium border",
                        steps[activeStep].allowed ? "bg-success-bg text-success border-success/20" : "bg-error-bg text-error border-error/20"
                      )}>
                        {steps[activeStep].allowed ? <Check className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                        {steps[activeStep].allowed ? "Action allowed" : "Action blocked"}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Proof of Reconciliation */}
      <section id="product" className="py-[104px] md:py-[128px] bg-[var(--color-bg-dark)] text-[var(--color-text-dark-primary)]">
        <div className="mx-auto w-full max-w-[1240px] px-5 md:px-[32px] lg:px-[48px] grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          <div className="lg:col-span-5">
            <h2 className="text-[30px] md:text-[36px] lg:text-[44px] font-medium leading-[1.08] tracking-[-0.035em] mb-6">
              Every closed case comes with proof.
            </h2>
            <p className="text-[17px] md:text-[19px] leading-[1.55] text-[var(--color-text-dark-secondary)]">
              CloseAI links the source records, calculations, policy decision, and financial action behind every resolution.
            </p>
          </div>

          <div className="lg:col-span-7 flex items-start gap-4">
            
            {/* Audit Timeline */}
            <div className="hidden sm:flex flex-col items-center pt-8">
              <div className="w-3 h-3 rounded-full bg-border-strong"></div>
              <div className="w-px h-16 bg-border-strong/30 my-1"></div>
              <div className="w-3 h-3 rounded-full bg-border-strong"></div>
              <div className="w-px h-16 bg-border-strong/30 my-1"></div>
              <div className="w-3 h-3 rounded-full border-2 border-white bg-transparent"></div>
            </div>

            {/* Document */}
            <div className="flex-1 bg-[#F9F9F8] text-active-black rounded-[10px] p-6 md:p-10">
              <div className="font-mono text-[12px] font-medium tracking-wider text-text-muted uppercase mb-10 pb-4 border-b border-border-strong">
                Proof of Reconciliation
              </div>

              <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
                <div>
                  <div className="text-[13px] text-text-secondary mb-1">Case</div>
                  <div className="font-mono text-[15px] font-medium">EX-293</div>
                </div>
                <div>
                  <div className="text-[13px] text-text-secondary mb-1">Difference</div>
                  <div className="font-mono text-[15px] font-medium">₹18,400</div>
                </div>
                <div className="col-span-2">
                  <div className="text-[13px] text-text-secondary mb-1">Root cause</div>
                  <div className="text-[15px] font-medium">Missing refund entry</div>
                </div>
              </div>

              <div className="border-t border-border-light pt-6 mb-6">
                <div className="text-[13px] text-text-secondary mb-3">Source records</div>
                <div className="flex flex-wrap gap-2 font-mono text-[12px]">
                  <span className="bg-white border border-border-light px-2 py-1 rounded-[4px]">PAY_2821</span>
                  <span className="bg-white border border-border-light px-2 py-1 rounded-[4px]">RF_8192</span>
                  <span className="bg-white border border-border-light px-2 py-1 rounded-[4px]">SETL_282</span>
                  <span className="bg-white border border-border-light px-2 py-1 rounded-[4px]">UTR82912</span>
                </div>
              </div>

              <div className="border-t border-border-light pt-6 grid grid-cols-2 gap-y-4">
                <div>
                  <div className="text-[13px] text-text-secondary mb-1">Arithmetic</div>
                  <div className="text-[14px] font-medium flex items-center gap-1.5"><Check className="w-4 h-4 text-success" /> Verified</div>
                </div>
                <div>
                  <div className="text-[13px] text-text-secondary mb-1">Journal</div>
                  <div className="text-[14px] font-medium flex items-center gap-1.5"><Check className="w-4 h-4 text-success" /> Balanced</div>
                </div>
                <div>
                  <div className="text-[13px] text-text-secondary mb-1">Policy</div>
                  <div className="text-[14px] font-medium flex items-center gap-1.5"><AlertTriangle className="w-4 h-4 text-warning" /> Approval required</div>
                </div>
                <div>
                  <div className="text-[13px] text-text-secondary mb-1">Final state</div>
                  <div className="text-[14px] font-medium">Ready for review</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Control and Refusal Section */}
      <section id="security" className="py-[104px] md:py-[128px]">
        <div className="mx-auto w-full max-w-[1240px] px-5 md:px-[32px] lg:px-[48px] grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div>
            <h2 className="text-[30px] md:text-[36px] lg:text-[44px] font-medium leading-[1.08] tracking-[-0.035em] text-active-black mb-6">
              Built to know when not to act.
            </h2>
            <p className="text-[17px] md:text-[19px] leading-[1.55] text-text-secondary max-w-[500px]">
              CloseAI can investigate an exception, but evidence and company policy determine whether a correction is permitted. When the financial trail is incomplete, the system stops.
            </p>
          </div>

          <div className="bg-white border border-border-strong rounded-[10px] p-6 md:p-10">
            <div className="inline-flex items-center gap-2 bg-error-bg text-error px-3 py-1.5 rounded-[4px] text-[12px] font-mono font-medium tracking-wider uppercase mb-8 border border-error/20">
              Automatic correction blocked
            </div>
            
            <div className="font-mono text-[24px] md:text-[28px] font-medium text-active-black mb-6">
              ₹12,492 <span className="text-[16px] text-text-secondary font-sans tracking-normal">remains unexplained.</span>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-center justify-between text-[14px] border-b border-border-light pb-2">
                <span className="text-text-secondary">Razorpay records</span>
                <span className="font-medium flex items-center gap-1.5"><Check className="w-4 h-4 text-success" /> complete</span>
              </div>
              <div className="flex items-center justify-between text-[14px] border-b border-border-light pb-2">
                <span className="text-text-secondary">Bank records</span>
                <span className="font-medium flex items-center gap-1.5"><Check className="w-4 h-4 text-success" /> complete</span>
              </div>
              <div className="flex items-center justify-between text-[14px] border-b border-border-light pb-2">
                <span className="text-text-secondary">Ledger records</span>
                <span className="font-medium flex items-center gap-1.5"><Check className="w-4 h-4 text-success" /> complete</span>
              </div>
              <div className="flex items-center justify-between text-[14px] pb-2">
                <span className="text-text-secondary">Supporting evidence</span>
                <span className="font-medium flex items-center gap-1.5 text-error">insufficient</span>
              </div>
            </div>

            <div className="text-[14px] font-medium text-active-black bg-bg-main p-4 rounded-[6px] border border-border-light mb-4">
              No financial records changed.
            </div>
            <div className="text-[14px] font-medium text-text-primary text-center">
              Human review required.
            </div>
          </div>

        </div>
      </section>

      {/* Results Section */}
      <section className="py-[104px] md:py-[128px] border-t border-border-light bg-[#F9F9F8]">
        <div className="mx-auto w-full max-w-[1240px] px-5 md:px-[32px] lg:px-[48px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            
            <div className="border-t border-border-strong pt-6">
              <div className="font-mono text-[48px] md:text-[64px] font-medium text-active-black leading-none tracking-tight mb-4">
                97.8%
              </div>
              <div className="text-[17px] text-text-secondary font-medium">Reconciliation completeness</div>
            </div>

            <div className="border-t border-border-strong pt-6">
              <div className="font-mono text-[48px] md:text-[64px] font-medium text-active-black leading-none tracking-tight mb-4">
                100%
              </div>
              <div className="text-[17px] text-text-secondary font-medium">Exception-resolution precision</div>
            </div>

            <div className="border-t border-border-strong pt-6">
              <div className="font-mono text-[48px] md:text-[64px] font-medium text-active-black leading-none tracking-tight mb-4">
                72.5%
              </div>
              <div className="text-[17px] text-text-secondary font-medium">Exceptions safely resolved</div>
            </div>

            <div className="border-t border-border-strong pt-6">
              <div className="font-mono text-[48px] md:text-[64px] font-medium text-active-black leading-none tracking-tight mb-4">
                0
              </div>
              <div className="text-[17px] text-text-secondary font-medium">False automatic resolutions</div>
            </div>

          </div>
          
          <div className="mt-16 text-[13px] font-mono font-medium tracking-wider text-text-muted uppercase text-center md:text-left">
            Results from the current synthetic benchmark
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section id="architecture" className="py-[104px] md:py-[128px] border-t border-border-light bg-[#FAFAFA]">
        <div className="mx-auto w-full max-w-[1240px] px-5 md:px-[32px] lg:px-[48px]">
          <h2 className="text-[30px] md:text-[36px] lg:text-[44px] font-medium leading-[1.08] tracking-[-0.035em] text-active-black mb-16 text-center">
            System Architecture
          </h2>

          <div className="max-w-[800px] mx-auto bg-white border border-border-light rounded-[10px] p-8 md:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.02)] overflow-x-auto">
            <pre className="font-mono text-[13px] md:text-[14px] leading-[1.6] text-text-primary whitespace-pre-wrap flex justify-center">
{`                    USER
                     |
                     v
             CLOSEAI CONTROLLER
                     |
          +----------+----------+
          |          |          |
        MATCH   INVESTIGATE   VERIFY
    (Rules)      (Agent)     (Math)
          |          |          |
          +----------+----------+
                     |
                     v
               POLICY ENGINE
                /          \\
               /            \\
       AUTO CLOSE        HUMAN REVIEW
               \\            /
                \\          /
                  AUDIT LOG`}
            </pre>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-[1000px] mx-auto">
            <div>
              <h3 className="font-mono text-[11px] font-medium tracking-[0.1em] text-text-muted uppercase mb-2">Deterministic Layer</h3>
              <p className="text-[14px] text-text-secondary leading-[1.6]">Performs exact arithmetic, exact transaction matching, threshold checks, and double-entry validation.</p>
            </div>
            <div>
              <h3 className="font-mono text-[11px] font-medium tracking-[0.1em] text-text-muted uppercase mb-2">Agent Layer</h3>
              <p className="text-[14px] text-text-secondary leading-[1.6]">Retrieves unstructured evidence, formulates hypotheses for discrepancies, and extracts structured actions.</p>
            </div>
            <div>
              <h3 className="font-mono text-[11px] font-medium tracking-[0.1em] text-text-muted uppercase mb-2">Policy Layer</h3>
              <p className="text-[14px] text-text-secondary leading-[1.6]">Evaluates hardcoded company permissions, approval thresholds, and escalation pathways. AI cannot override policy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Section */}
      <section id="docs" className="py-[104px] md:py-[128px] bg-white border-t border-border-light">
        <div className="mx-auto w-full max-w-[1240px] px-5 md:px-[32px] lg:px-[48px]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <h2 className="text-[30px] md:text-[36px] lg:text-[44px] font-medium leading-[1.08] tracking-[-0.035em] text-active-black mb-4">
                Developer Documentation
              </h2>
              <p className="text-[17px] md:text-[19px] leading-[1.55] text-text-secondary max-w-[600px]">
                Integrate CloseAI into your existing financial stack with our unified API. Drop-in support for Razorpay, Stripe, and standard bank feeds.
              </p>
            </div>
            <Button variant="outline" size="lg" className="h-[46px] px-6 text-[15px]" onClick={() => navigate('/docs')}>Read the Docs</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-border-light rounded-xl p-8 bg-[#FAFAFA] hover:bg-black/[0.01] transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <div className="w-12 h-12 bg-active-black rounded-[10px] flex items-center justify-center mb-6 shadow-sm">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-[19px] font-medium text-active-black mb-3">API Reference</h3>
              <p className="text-[15px] text-text-secondary leading-[1.6]">Comprehensive guides for endpoints, webhooks, and rate limits.</p>
            </div>
            <div className="border border-border-light rounded-xl p-8 bg-[#FAFAFA] hover:bg-black/[0.01] transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <div className="w-12 h-12 bg-active-black rounded-[10px] flex items-center justify-center mb-6 shadow-sm">
                <Database className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-[19px] font-medium text-active-black mb-3">ERP Integrations <span className="inline-block ml-2 px-2 py-0.5 bg-black/5 text-text-muted text-[10px] uppercase font-mono rounded-sm tracking-wider">Planned</span></h3>
              <p className="text-[15px] text-text-secondary leading-[1.6]">Connect seamlessly to NetSuite, Tally, and custom SQL ledgers.</p>
            </div>
            <div className="border border-border-light rounded-xl p-8 bg-[#FAFAFA] hover:bg-black/[0.01] transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <div className="w-12 h-12 bg-active-black rounded-[10px] flex items-center justify-center mb-6 shadow-sm">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-[19px] font-medium text-active-black mb-3">Security Architecture</h3>
              <p className="text-[15px] text-text-secondary leading-[1.6]">View our <span className="font-medium text-active-black">Architecture Preview</span> for planned SOC2 Type II, ISO 27001, and data residency guidelines.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-[104px] md:py-[128px] border-t border-border-light bg-[#F6F6F2]">
        <div className="mx-auto w-full max-w-[800px] px-5 text-center">
          <h2 className="text-[38px] md:text-[56px] font-medium leading-[1.08] tracking-[-0.045em] text-active-black mb-6">
            Close what your rules leave behind.
          </h2>
          <p className="text-[17px] md:text-[19px] leading-[1.55] text-text-secondary mb-10 max-w-[620px] mx-auto">
            Investigate exceptions, verify every conclusion, and keep financial actions under policy control.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto h-[46px] px-6 text-[15px]" onClick={() => navigate('/app')}>
              Open CloseAI
            </Button>
            <a href="#how-it-works">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto h-[46px] px-6 text-[15px]">
                Explore the architecture
              </Button>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
