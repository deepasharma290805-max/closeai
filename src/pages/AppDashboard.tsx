import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { useEngine } from '../context/EngineContext';
import { Play, CheckCircle2, ChevronRight, Check, AlertTriangle } from 'lucide-react';

export function AppDashboard() {
  const navigate = useNavigate();
  const { state, runBenchmark } = useEngine();
  const { isRunning, isComplete, lastRun, stats, exceptions } = state;

  return (
    <div className="flex flex-col gap-10 max-w-6xl pb-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="text-[11px] font-mono font-medium tracking-[0.1em] text-text-muted uppercase">Reconciliation Engine</div>
            {lastRun && (
              <div className="text-[10px] font-mono text-text-muted bg-black/5 px-2 py-0.5 rounded-sm">
                Completed {lastRun.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            )}
          </div>
          <h1 className="font-display text-[32px] md:text-[40px] font-semibold leading-none tracking-tight text-active-black mb-3">
            Live Benchmark
          </h1>
          <p className="text-[16px] text-text-secondary max-w-[600px] leading-[1.5]">
            Dynamically tests multi-source matching and policy-governed resolution across a generated dataset of Razorpay, Bank, and ERP Ledger records.
          </p>
        </div>
        
        <Button 
          size="lg" 
          onClick={runBenchmark} 
          disabled={isRunning} 
          className={`gap-2 min-w-[180px] h-[44px] transition-all duration-300 ${isComplete ? 'bg-success hover:bg-success text-white border-success' : ''}`}
        >
          {isRunning ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              Generating & Processing...
            </span>
          ) : isComplete ? (
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" /> Benchmark complete
            </span>
          ) : (
            <>
              <Play className="h-4 w-4" fill="currentColor" /> Run benchmark
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#FAFAFA] border border-border-light rounded-xl p-5 shadow-sm">
          <div className="text-[12px] text-text-secondary font-medium mb-1">Records Processed</div>
          <div className="font-mono text-[24px] font-semibold text-active-black">{stats?.total || 0}</div>
        </div>
        <div className="bg-[#FAFAFA] border border-border-light rounded-xl p-5 shadow-sm">
          <div className="text-[12px] text-text-secondary font-medium mb-1">Deterministically Matched</div>
          <div className="font-mono text-[24px] font-semibold text-success">{stats?.matched || 0}</div>
        </div>
        <div className="bg-[#FAFAFA] border border-border-light rounded-xl p-5 shadow-sm">
          <div className="text-[12px] text-text-secondary font-medium mb-1">Safely Auto-Resolved</div>
          <div className="font-mono text-[24px] font-semibold text-active-black">{stats?.autoResolved || 0}</div>
        </div>
        <div className="bg-error-bg/30 border border-border-light rounded-xl p-5 shadow-sm">
          <div className="text-[12px] text-error font-medium mb-1">Escalated to Human</div>
          <div className="font-mono text-[24px] font-semibold text-error">{stats?.escalated || 0}</div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[18px] font-semibold text-active-black font-display tracking-tight">Exception Explorer</h2>
          {exceptions.length > 0 && (
            <div className="text-[13px] text-text-secondary font-medium">Viewing {exceptions.length} exceptions</div>
          )}
        </div>
        
        <div className="bg-white border border-border-light rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          {exceptions.length === 0 ? (
             <div className="p-12 text-center flex flex-col items-center text-text-secondary">
               <CheckCircle2 className="w-12 h-12 text-border-strong mb-4" />
               <p className="font-medium text-active-black">No exceptions found</p>
               <p className="text-[14px]">Run the benchmark to generate test data and process exceptions.</p>
             </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Case ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Discrepancy</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exceptions.map((caseItem) => (
                  <TableRow key={caseItem.id} className="cursor-pointer hover:bg-[#FAFAFA]" onClick={() => navigate(`/app/exceptions/${caseItem.id}`)}>
                    <TableCell className="font-mono font-medium text-[13px] text-active-black">{caseItem.id}</TableCell>
                    <TableCell className="text-text-primary text-[14px]">{caseItem.type}</TableCell>
                    <TableCell className="text-right font-mono font-medium text-active-black tabular-nums text-[13px]">₹{caseItem.discrepancy.toLocaleString()}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center text-[12px] font-medium px-2 py-0.5 rounded-[4px] border ${
                        caseItem.severity === 'High' ? 'bg-error-bg text-error border-error/20' : 
                        caseItem.severity === 'Medium' ? 'bg-warning-bg text-warning border-warning/20' : 
                        'bg-[#F0F0EE] text-text-secondary border-border-light'
                      }`}>
                        {caseItem.severity}
                      </span>
                    </TableCell>
                    <TableCell>
                      {caseItem.status === 'Resolved' ? (
                        <div className="inline-flex items-center gap-1.5 text-success text-[12px] font-medium">
                          <Check className="w-3.5 h-3.5" /> Auto-resolved
                        </div>
                      ) : caseItem.status === 'Approved' ? (
                        <div className="inline-flex items-center gap-1.5 text-success text-[12px] font-medium">
                          <Check className="w-3.5 h-3.5" /> Human Approved
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 text-error text-[12px] font-medium">
                          <AlertTriangle className="w-3.5 h-3.5" /> Escalate
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-[32px] px-3 text-[13px] text-text-secondary hover:text-active-black"
                      >
                        Investigate <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
}
