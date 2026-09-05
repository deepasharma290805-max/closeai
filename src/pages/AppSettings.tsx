import React from 'react';
import { Settings } from 'lucide-react';

export function AppSettings() {
  return (
    <div className="flex flex-col gap-6 max-w-6xl pb-16">
      <div>
        <h1 className="font-display text-[32px] md:text-[40px] font-semibold leading-none tracking-tight text-active-black mb-3">
          Settings
        </h1>
        <p className="text-[16px] text-text-secondary max-w-[600px] leading-[1.5]">
          Configure reconciliation rules, tolerance thresholds, and policy escalations.
        </p>
      </div>

      <div className="bg-white border border-border-light rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)] p-12 text-center flex flex-col items-center text-text-secondary">
        <Settings className="w-12 h-12 text-border-strong mb-4" />
        <p className="font-medium text-active-black mb-1">Demo Mode</p>
        <p className="text-[14px]">Rule configuration is locked in this interactive prototype.</p>
      </div>
    </div>
  );
}
