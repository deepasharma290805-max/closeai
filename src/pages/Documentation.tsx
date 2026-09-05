import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Code2, Zap, Terminal, ChevronRight } from 'lucide-react';

export function Documentation() {
  return (
    <div className="pt-[60px] pb-24 bg-[#FAFAFA] min-h-screen">
      <div className="mx-auto w-full max-w-[1240px] px-5 md:px-[32px] lg:px-[48px]">
        <div className="flex flex-col md:flex-row gap-12">
            
            {/* Sidebar navigation */}
            <div className="hidden md:block w-[240px] shrink-0">
              <div className="sticky top-[120px]">
                <h3 className="font-mono text-[11px] font-medium tracking-[0.1em] text-text-muted uppercase mb-4">Getting Started</h3>
                <ul className="space-y-3 mb-8">
                  <li><a href="#" className="text-[14px] text-active-black font-medium">Introduction</a></li>
                  <li><a href="#" className="text-[14px] text-text-secondary hover:text-active-black">Quickstart</a></li>
                  <li><a href="#" className="text-[14px] text-text-secondary hover:text-active-black">Authentication</a></li>
                </ul>
                
                <h3 className="font-mono text-[11px] font-medium tracking-[0.1em] text-text-muted uppercase mb-4">Core Concepts</h3>
                <ul className="space-y-3 mb-8">
                  <li><a href="#" className="text-[14px] text-text-secondary hover:text-active-black">Reconciliation Engine</a></li>
                  <li><a href="#" className="text-[14px] text-text-secondary hover:text-active-black">Exceptions & Escalations</a></li>
                  <li><a href="#" className="text-[14px] text-text-secondary hover:text-active-black">Policy Configuration</a></li>
                </ul>
                
                <h3 className="font-mono text-[11px] font-medium tracking-[0.1em] text-text-muted uppercase mb-4">API Reference</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-[14px] text-text-secondary hover:text-active-black">REST API Overview</a></li>
                  <li><a href="#" className="text-[14px] text-text-secondary hover:text-active-black">Webhooks</a></li>
                  <li><a href="#" className="text-[14px] text-text-secondary hover:text-active-black">SDKs</a></li>
                </ul>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 max-w-[800px]">
              <div className="mb-6">
                <Link to="/" className="inline-flex items-center text-[13px] text-text-secondary hover:text-active-black mb-6">
                  Home <ChevronRight className="w-3 h-3 mx-1" /> Documentation
                </Link>
                <h1 className="font-display text-[40px] md:text-[48px] font-semibold leading-none tracking-tight text-active-black mb-4">
                  CloseAI Documentation
                </h1>
                <p className="text-[18px] text-text-secondary leading-[1.6]">
                  Everything you need to integrate CloseAI's financial reconciliation engine into your platform.
                </p>
              </div>

              <div className="h-px w-full bg-border-light my-10" />

              <div className="prose prose-slate max-w-none">
                <h2 className="text-[24px] font-medium text-active-black mb-4">Overview</h2>
                <p className="text-[15px] text-text-secondary leading-[1.6] mb-6">
                  CloseAI is an AI-powered financial controller designed to automate reconciliation processes, detect discrepancies across disparate data sources, and manage complex policy escalations without manual intervention.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                  <div className="p-5 border border-border-light rounded-lg bg-white shadow-sm hover:border-border-strong cursor-pointer transition-colors">
                    <Terminal className="w-5 h-5 text-active-black mb-3" />
                    <h3 className="text-[15px] font-medium text-active-black mb-1">Quickstart Guide</h3>
                    <p className="text-[13px] text-text-secondary">Get up and running in under 5 minutes.</p>
                  </div>
                  <div className="p-5 border border-border-light rounded-lg bg-white shadow-sm hover:border-border-strong cursor-pointer transition-colors">
                    <Code2 className="w-5 h-5 text-active-black mb-3" />
                    <h3 className="text-[15px] font-medium text-active-black mb-1">API Reference</h3>
                    <p className="text-[13px] text-text-secondary">Explore our REST endpoints and models.</p>
                  </div>
                </div>

                <h2 className="text-[24px] font-medium text-active-black mb-4">Authentication</h2>
                <p className="text-[15px] text-text-secondary leading-[1.6] mb-4">
                  The CloseAI API uses API keys to authenticate requests. You can view and manage your API keys in the CloseAI Dashboard.
                </p>
                
                <div className="bg-active-black rounded-lg p-5 mb-8 overflow-x-auto">
                  <code className="text-white text-[13px] font-mono">
                    curl -H "Authorization: Bearer sk_test_12345" \<br/>
                    &nbsp;&nbsp;https://api.closeai.com/v1/reconciliations
                  </code>
                </div>

                <h2 className="text-[24px] font-medium text-active-black mb-4">Sending Data</h2>
                <p className="text-[15px] text-text-secondary leading-[1.6] mb-4">
                  You can push transactional data directly to our ingestion endpoints, or use one of our pre-built connectors for Stripe, Razorpay, or standard CSV uploads.
                </p>

                <div className="bg-active-black rounded-lg p-5 mb-8 overflow-x-auto">
                  <pre className="text-white text-[13px] font-mono leading-[1.5]">
{`{
  "transaction_id": "txn_892347293",
  "amount": 1450.00,
  "currency": "INR",
  "source": "stripe",
  "timestamp": "2026-09-05T09:12:00Z"
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
