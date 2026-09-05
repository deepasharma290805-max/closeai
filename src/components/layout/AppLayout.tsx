import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, CheckSquare, Shield, Settings, LogOut } from 'lucide-react';
import { cn } from '@/src/utils/cn';

const navItems = [
  { icon: LayoutDashboard, label: 'Close', path: '/app' },
  { icon: FileText, label: 'Exceptions', path: '/app/exceptions' },
  { icon: CheckSquare, label: 'Review', path: '/app/review' },
  { icon: Shield, label: 'Audit', path: '/app/audit' },
  { icon: Settings, label: 'Settings', path: '/app/settings' },
];

export function AppLayout() {
  const location = useLocation();

  return (
    <div className="flex h-screen w-full bg-white text-text-primary">
      {/* Sidebar */}
      <aside className="flex flex-col w-[240px] border-r border-border-light bg-[#FAFAFA]">
        <div className="h-[68px] flex items-center px-6">
          <Link to="/" className="font-display text-[22px] font-semibold tracking-tight text-active-black">
            CloseAI
          </Link>
        </div>
        
        <nav className="flex-1 py-4 px-3 space-y-0.5">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/app' && location.pathname.startsWith(item.path));
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-2 text-[13px] font-medium rounded-[6px] transition-colors relative group",
                  isActive
                    ? "text-active-black bg-white shadow-sm ring-1 ring-border-light"
                    : "text-text-secondary hover:text-text-primary hover:bg-black/5"
                )}
              >
                <Icon className={cn("mr-3 h-4 w-4", isActive ? "text-active-black" : "text-text-muted group-hover:text-text-secondary")} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border-light/60">
          <Link to="/" className="flex items-center px-3 py-2 text-[13px] font-medium text-text-secondary hover:text-text-primary hover:bg-black/5 rounded-[6px] transition-colors">
            <LogOut className="mr-3 h-4 w-4 text-text-muted" />
            Exit demo
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white">
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-7xl p-8 lg:p-12">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
