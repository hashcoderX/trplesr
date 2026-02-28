'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function AuthModal({ open, onClose }: Props) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const reset = () => {
    setName('');
    setEmail('');
    setPassword('');
    setError(null);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (mode === 'signin') {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
      reset();
      onClose();
    } catch (err: any) {
      const details = err?.details;
      const msg = details?.email?.[0] || details?.password?.[0] || details?.name?.[0] || err?.message || 'Something went wrong';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white w-[95%] max-w-md rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-['Poppins'] text-xl font-semibold">
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </h3>
          <button onClick={onClose} aria-label="Close" className="text-gray-500 hover:text-gray-800">✕</button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B6E65]"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B6E65]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B6E65]"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0B6E65] text-white rounded-lg py-2 font-medium hover:bg-[#095850] disabled:opacity-60"
          >
            {loading ? 'Please wait…' : mode === 'signin' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          {mode === 'signin' ? (
            <>
              Don&apos;t have an account?{' '}
              <button onClick={() => setMode('signup')} className="text-[#0B6E65] hover:underline">Sign Up</button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button onClick={() => setMode('signin')} className="text-[#0B6E65] hover:underline">Sign In</button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
