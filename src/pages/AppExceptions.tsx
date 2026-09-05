import React from 'react';
import { useEngine } from '../context/EngineContext';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Button } from '../components/ui/Button';
import { CheckCircle2, AlertTriangle, Check, ChevronRight } from 'lucide-react';

export function AppExceptions() {
  const { state } = useEngine();
  const { exceptions } = state;
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 max-w-6xl pb-16">
      <div>
        <h1 className="font-display text-[32px] md:text-[40px] font-semibold leading-none tracking-tight text-active-black mb-3">
          Exceptions
        </h1>
        <p className="text-[16px] text-text-secondary max-w-[600px] leading-[1.5]">
          All flagged discrepancies across sources requiring review or auto-resolved.
        </p>
      </div>

      <div className="bg-white border border-border-light rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
        {exceptions.length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center text-text-secondary">
              <CheckCircle2 className="w-12 h-12 text-border-strong mb-4" />
              <p className="font-medium text-active-black">No exceptions found</p>
              <p className="text-[14px]">Run the benchmark in the Close dashboard to generate test data and process exceptions.</p>
              <Button className="mt-4" onClick={() => navigate('/app')}>Go to Dashboard</Button>
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
  );
}
