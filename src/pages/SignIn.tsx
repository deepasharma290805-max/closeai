import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate network delay
    setTimeout(() => {
      navigate('/app');
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#09090B]">
      <div className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link to="/" className="flex justify-center font-display text-[28px] font-semibold tracking-tight text-active-black">
            CloseAI
          </Link>
          <h2 className="mt-6 text-center text-2xl font-semibold tracking-tight">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-[14px] text-text-secondary">
            Or{' '}
            <Link to="/" className="font-medium text-active-black hover:underline">
              return to website
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] sm:rounded-xl border border-border-light sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-[14px] font-medium text-active-black">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-border-strong rounded-md shadow-sm placeholder-text-muted focus:outline-none focus:ring-active-black focus:border-active-black sm:text-[14px]"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-[14px] font-medium text-active-black">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-border-strong rounded-md shadow-sm placeholder-text-muted focus:outline-none focus:ring-active-black focus:border-active-black sm:text-[14px]"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-active-black focus:ring-active-black border-border-strong rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-[14px] text-text-secondary">
                    Remember me
                  </label>
                </div>

                <div className="text-[14px]">
                  <a href="#" className="font-medium text-active-black hover:underline">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <Button 
                  type="submit" 
                  className="w-full flex justify-center py-2.5 px-4"
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                </Button>
              </div>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border-light" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-text-muted text-[13px]">
                    Demo environment
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={() => navigate('/app')}
                >
                  Bypass sign in & go to app
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
