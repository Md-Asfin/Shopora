import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, LogIn, ArrowRight, Eye, EyeOff } from 'lucide-react';
import Logo from '../components/common/Logo';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      navigate(redirect);
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="w-full max-w-4xl bg-white dark:bg-dark-surface rounded-3xl border border-gray-100 dark:border-dark-border shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Form Column */}
        <div className="p-8 sm:p-12 flex flex-col justify-between">
          <div>
            <div className="mb-6">
              <Logo />
            </div>

            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-1">
              Welcome Back
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
              Sign in to continue shopping and manage your orders.
            </p>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <Link to="#" className="text-[11px] font-semibold text-primary-600 hover:underline">
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-md text-xs transition-all flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" /> Sign In
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-dark-border text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Don't have an account?{' '}
              <Link to={`/register?redirect=${redirect}`} className="font-bold text-primary-600 dark:text-primary-400 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>

        {/* Right Illustration Column */}
        <div className="hidden md:flex flex-col items-center justify-center p-12 bg-gradient-to-br from-primary-600 via-secondary-600 to-indigo-800 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]"></div>
          
          <div className="relative z-10 text-center max-w-xs">
            {/* SVG Shopping Illustration */}
            <div className="w-40 h-40 mx-auto mb-6 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md shadow-inner">
              <svg className="w-24 h-24 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 10a4 4 0 01-8 0" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <h2 className="text-xl font-extrabold mb-2">Great products. Better prices.</h2>
            <p className="text-xs text-indigo-100 leading-relaxed">
              Explore thousands of top-rated items with instant checkout and fast shipping.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
