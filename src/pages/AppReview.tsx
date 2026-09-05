import React from 'react';
import { useEngine } from '../context/EngineContext';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Button } from '../components/ui/Button';
import { CheckCircle2, AlertTriangle, Check, ChevronRight } from 'lucide-react';

export function AppReview() {
  const { state } = useEngine();
  const { exceptions } = state;
  const navigate = useNavigate();
  
  // Filter for cases that need human review (Escalated)
  const escalatedCases = exceptions.filter(c => c.status === 'Escalated');

  return (
    <div className="flex flex-col gap-6 max-w-6xl pb-16">
      <div>
        <h1 className="font-display text-[32px] md:text-[40px] font-semibold leading-none tracking-tight text-active-black mb-3">
          Human Review
        </h1>
        <p className="text-[16px] text-text-secondary max-w-[600px] leading-[1.5]">
          Exceptions escalated by the Policy Engine requiring human intervention and approval.
        </p>
      </div>

      <div className="bg-white border border-border-light rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
        {escalatedCases.length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center text-text-secondary">
              <CheckCircle2 className="w-12 h-12 text-border-strong mb-4" />
              <p className="font-medium text-active-black">No cases pending review</p>
              <p className="text-[14px]">All exceptions have been handled or none were generated.</p>
            </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">Case ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Discrepancy</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {escalatedCases.map((caseItem) => (
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
