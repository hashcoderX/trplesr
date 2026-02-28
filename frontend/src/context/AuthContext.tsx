'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ApiUser, apiLogin, apiLogout, apiMe, apiRegister, apiGetProfile } from '@/lib/api/auth';

type AuthContextType = {
  user: ApiUser | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  profileComplete: boolean;
  role: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'tsr_auth_token';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<ApiUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileComplete, setProfileComplete] = useState(false);

  // Prefer the simple 'roll' column when available, fallback to first spatie role
  const role = useMemo(() => user?.roll ?? user?.roles?.[0]?.name ?? null, [user]);

  // Load token from storage and fetch user
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null;
    if (stored) {
      setToken(stored);
      // Fetch profile (includes completion flag)
      apiGetProfile(stored)
        .then((resp) => {
          setUser(resp.user);
          setProfileComplete(resp.is_complete);
        })
        .catch(() => {
          // Invalid token, clear it
          localStorage.removeItem(TOKEN_KEY);
          setToken(null);
          setUser(null);
          setProfileComplete(false);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await apiLogin(email, password);
    setUser(res.user);
    setToken(res.token);
    if (typeof window !== 'undefined') localStorage.setItem(TOKEN_KEY, res.token);
    // Immediately refresh profile to get completion flag
    try {
      const prof = await apiGetProfile(res.token);
      setUser(prof.user);
      setProfileComplete(prof.is_complete);
    } catch {}
    // Redirect if admin
    const newRoleRaw = res.user.roles?.[0]?.name || '';
    const newRole = newRoleRaw.toLowerCase().replace(/[-_\s]/g, '');
    if (newRole === 'admin' || newRole === 'superadmin') {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const register = useCallback(async (name: string, email: string, password: string) => {
    const res = await apiRegister(name, email, password);
    setUser(res.user);
    setToken(res.token);
    if (typeof window !== 'undefined') localStorage.setItem(TOKEN_KEY, res.token);
    try {
      const prof = await apiGetProfile(res.token);
      setUser(prof.user);
      setProfileComplete(prof.is_complete);
    } catch {}
  }, []);

  const logout = useCallback(async () => {
    if (token) {
      try { await apiLogout(token); } catch {}
    }
    setUser(null);
    setToken(null);
    setProfileComplete(false);
    if (typeof window !== 'undefined') localStorage.removeItem(TOKEN_KEY);
  }, [token]);

  const refreshProfile = useCallback(async () => {
    if (!token) return;
    try {
      const prof = await apiGetProfile(token);
      setUser(prof.user);
      setProfileComplete(prof.is_complete);
    } catch {}
  }, [token]);

  const value = useMemo(() => ({ user, token, loading, login, register, logout, refreshProfile, profileComplete, role }), [user, token, loading, login, register, logout, refreshProfile, profileComplete, role]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
