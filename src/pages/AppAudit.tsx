import React from 'react';
import { useEngine } from '../context/EngineContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Shield, Cpu, User, CheckCircle2 } from 'lucide-react';

export function AppAudit() {
  const { state } = useEngine();
  const { auditLogs } = state;

  return (
    <div className="flex flex-col gap-6 max-w-6xl pb-16">
      <div>
        <h1 className="font-display text-[32px] md:text-[40px] font-semibold leading-none tracking-tight text-active-black mb-3">
          Audit Logs
        </h1>
        <p className="text-[16px] text-text-secondary max-w-[600px] leading-[1.5]">
          Immutable ledger of all actions, approvals, and automated resolutions.
        </p>
      </div>

      <div className="bg-white border border-border-light rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
        {auditLogs.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center text-text-secondary">
            <Shield className="w-12 h-12 text-border-strong mb-4" />
            <p className="font-medium text-active-black mb-1">No logs available</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Timestamp</TableHead>
                <TableHead className="w-[140px]">Log ID</TableHead>
                <TableHead className="w-[180px]">Actor</TableHead>
                <TableHead className="w-[200px]">Action</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.map((log) => (
                <TableRow key={log.id} className="hover:bg-[#FAFAFA]">
                  <TableCell className="font-mono text-[12px] text-text-secondary">
                    {log.timestamp.toLocaleString([], {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit'
                    })}
                  </TableCell>
                  <TableCell className="font-mono font-medium text-[12px] text-text-muted">
                    {log.id}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        log.type === 'system' ? 'bg-active-black' :
                        log.type === 'policy' ? 'bg-success' :
                        'bg-blue-500'
                      }`}></span>
                      <span className="text-[13px] font-medium text-active-black">{log.actor}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-[13px] font-medium text-text-primary">
                    {log.action}
                  </TableCell>
                  <TableCell className="text-[13px] text-text-secondary">
                    {log.details}
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
