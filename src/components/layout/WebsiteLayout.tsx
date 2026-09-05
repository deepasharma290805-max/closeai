import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Menu, X } from 'lucide-react';
import { cn } from '../../utils/cn';

export function WebsiteLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-bg-main text-text-primary">
      <header className="sticky top-0 z-50 w-full border-b border-border-light bg-white/80 backdrop-blur-md h-[68px] flex items-center">
        <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between px-5 md:px-[32px] lg:px-[48px]">
          <div className="flex items-center gap-12">
            <Link to="/" className="font-display text-[22px] font-semibold tracking-tight text-active-black">
              CloseAI
            </Link>
            <nav className="hidden md:flex items-center gap-8 text-[14px] font-medium text-text-secondary">
              <a href="#product" className="hover:text-text-primary transition-colors">Product</a>
              <a href="#how-it-works" className="hover:text-text-primary transition-colors">How it works</a>
              <a href="#security" className="hover:text-text-primary transition-colors">Security</a>
              <Link to="/docs" className="hover:text-text-primary transition-colors">Documentation</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/signin" className="hidden md:inline-block text-[14px] font-medium text-text-secondary hover:text-text-primary transition-colors">
              Sign in
            </Link>
            <Button size="sm" className="hidden md:inline-flex h-[36px] px-4 text-[13px]" onClick={() => navigate('/app')}>
              Open product demo
            </Button>
            <button 
              className="md:hidden p-2 -mr-2 text-active-black"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[68px] z-40 bg-white md:hidden flex flex-col border-b border-border-light">
          <nav className="flex flex-col p-5 gap-6 text-[16px] font-medium text-active-black">
            <a href="#product" onClick={() => setMobileMenuOpen(false)}>Product</a>
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>How it works</a>
            <a href="#security" onClick={() => setMobileMenuOpen(false)}>Security</a>
            <Link to="/docs" onClick={() => setMobileMenuOpen(false)}>Documentation</Link>
            <div className="h-px w-full bg-border-light my-2"></div>
            <Link to="/signin" onClick={() => setMobileMenuOpen(false)}>Sign in</Link>
            <Button size="lg" className="w-full" onClick={() => { setMobileMenuOpen(false); navigate('/app'); }}>
              Open product demo
            </Button>
          </nav>
        </div>
      )}

      <main className="flex-1 w-full">
        <Outlet />
      </main>

      <footer className="border-t border-border-light bg-bg-main py-16 md:py-24">
        <div className="mx-auto max-w-[1240px] px-5 md:px-[32px] lg:px-[48px] grid grid-cols-2 md:grid-cols-4 gap-12">
          <div>
            <div className="text-xl font-medium tracking-tight mb-4 text-active-black" style={{ letterSpacing: '-0.035em' }}>CloseAI</div>
            <p className="text-[15px] text-text-secondary leading-relaxed">AI Finance Controller for resolving reconciliation exceptions.</p>
          </div>
          <div>
            <h4 className="font-medium mb-4 text-[15px] text-active-black">Product</h4>
            <ul className="space-y-3 text-[14px] text-text-secondary">
              <li><a href="#" className="hover:text-text-primary transition-colors">Reconciliation</a></li>
              <li><a href="#" className="hover:text-text-primary transition-colors">Policy Engine</a></li>
              <li><a href="#" className="hover:text-text-primary transition-colors">Security</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4 text-[15px] text-active-black">Resources</h4>
            <ul className="space-y-3 text-[14px] text-text-secondary">
              <li><a href="#" className="hover:text-text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-text-primary transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-text-primary transition-colors">Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4 text-[15px] text-active-black">Company</h4>
            <ul className="space-y-3 text-[14px] text-text-secondary">
              <li><a href="#" className="hover:text-text-primary transition-colors">About</a></li>
              <li><a href="#" className="hover:text-text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-text-primary transition-colors">Careers</a></li>
            </ul>
          </div>
        </div>
        <div className="mx-auto max-w-[1240px] px-5 md:px-[32px] lg:px-[48px] mt-16 pt-8 border-t border-border-light flex flex-col md:flex-row justify-between items-center text-[14px] text-text-muted">
          <p>© {new Date().getFullYear()} CloseAI Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
