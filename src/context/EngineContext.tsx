import React, { createContext, useContext, useState, ReactNode } from 'react';
import { generateMockDataset, runReconciliationEngine, ExceptionCase } from '../lib/reconciliation';

export interface AuditLog {
  id: string;
  timestamp: Date;
  action: string;
  actor: string;
  details: string;
  type: 'system' | 'user' | 'policy';
}

interface EngineState {
  isInitialized: boolean;
  isRunning: boolean;
  isComplete: boolean;
  lastRun: Date | null;
  stats: {
    total: number;
    matched: number;
    exceptions: number;
    autoResolved: number;
    escalated: number;
  } | null;
  exceptions: ExceptionCase[];
  auditLogs: AuditLog[];
}

interface EngineContextType {
  state: EngineState;
  runBenchmark: () => Promise<void>;
  updateCaseStatus: (id: string, status: 'Approved') => void;
  getCase: (id: string) => ExceptionCase | undefined;
}

const EngineContext = createContext<EngineContextType | undefined>(undefined);

export function EngineProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<EngineState>({
    isInitialized: false,
    isRunning: false,
    isComplete: false,
    lastRun: null,
    stats: null,
    exceptions: [],
    auditLogs: [
      {
        id: `AL-SYS-${Date.now()}`,
        timestamp: new Date(),
        action: 'System Initialized',
        actor: 'System',
        details: 'Reconciliation engine core booted and ready.',
        type: 'system'
      }
    ]
  });

  const addAuditLog = (log: Omit<AuditLog, 'id' | 'timestamp'>) => {
    setState(prev => ({
      ...prev,
      auditLogs: [
        {
          ...log,
          id: `AL-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          timestamp: new Date()
        },
        ...prev.auditLogs
      ]
    }));
  };

  const runBenchmark = async () => {
    setState(prev => ({ 
      ...prev, 
      isRunning: true, 
      isComplete: false,
      auditLogs: [
        {
          id: `AL-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          timestamp: new Date(),
          action: 'Benchmark Started',
          actor: 'User',
          details: 'Triggered dynamic generation of 100 mock transaction records.',
          type: 'user'
        },
        ...prev.auditLogs
      ]
    }));
    
    // Generate fresh data to prove it's dynamic
    const dataset = generateMockDataset(100); // 100 records for the benchmark
    
    // Simulate engine processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Run the engine
    const result = runReconciliationEngine(dataset);
    
    setState(prev => {
      const newLogs: AuditLog[] = [
        {
          id: `AL-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          timestamp: new Date(),
          action: 'Benchmark Completed',
          actor: 'System',
          details: `Processed 100 records. Found ${result.stats.exceptions} exceptions. Auto-resolved ${result.stats.autoResolved}. Escalated ${result.stats.escalated}.`,
          type: 'system'
        }
      ];

      result.exceptions.filter(e => e.status === 'Resolved').forEach(e => {
        newLogs.push({
          id: `AL-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          timestamp: new Date(),
          action: 'Case Auto-Resolved',
          actor: 'Policy Engine',
          details: `Case ${e.id} auto-resolved. Action: ${e.policy.action}`,
          type: 'policy'
        });
      });

      return {
        ...prev,
        isInitialized: true,
        isRunning: false,
        isComplete: true,
        lastRun: new Date(),
        stats: result.stats,
        exceptions: result.exceptions,
        auditLogs: [...newLogs, ...prev.auditLogs]
      };
    });
    
    // Reset complete badge after 3 seconds
    setTimeout(() => {
      setState(prev => ({ ...prev, isComplete: false }));
    }, 3000);
  };

  const updateCaseStatus = (id: string, status: 'Approved') => {
    setState(prev => {
      const targetCase = prev.exceptions.find(c => c.id === id);
      const newLogs = [...prev.auditLogs];
      
      if (targetCase && targetCase.status !== status) {
        newLogs.unshift({
          id: `AL-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          timestamp: new Date(),
          action: `Case ${status}`,
          actor: 'Finance Reviewer',
          details: `Manual approval granted for escalated case ${id}. Discrepancy: ₹${targetCase.discrepancy.toLocaleString()}`,
          type: 'user'
        });
      }

      return {
        ...prev,
        exceptions: prev.exceptions.map(c => c.id === id ? { ...c, status } : c),
        auditLogs: newLogs
      };
    });
  };

  const getCase = (id: string) => {
    return state.exceptions.find(c => c.id === id);
  };

  return (
    <EngineContext.Provider value={{ state, runBenchmark, updateCaseStatus, getCase }}>
      {children}
    </EngineContext.Provider>
  );
}

export function useEngine() {
  const context = useContext(EngineContext);
  if (context === undefined) {
    throw new Error('useEngine must be used within an EngineProvider');
  }
  return context;
}
