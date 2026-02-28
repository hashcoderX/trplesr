'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Container from '@/components/Container';
import { useAuth } from '@/context/AuthContext';
import { apiUpdateProfile } from '@/lib/api/auth';
import { useRouter } from 'next/navigation';

export default function AccountPage() {
  const { user, token, loading, profileComplete, refreshProfile } = useAuth();
  const router = useRouter();
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    country: '',
    address: '',
    avatar_url: '',
    bio: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !token) {
      // Not logged in; redirect to home
      router.push('/');
    }
  }, [loading, token, router]);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        phone: (user as any).phone || '',
        country: (user as any).country || '',
        address: (user as any).address || '',
        avatar_url: (user as any).avatar_url || '',
        bio: (user as any).bio || '',
      });
    }
  }, [user]);

  const isIncomplete = useMemo(() => !profileComplete, [profileComplete]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setSaving(true);
    setError(null);
    try {
      // Basic completion requirement: phone + address
      const payload: any = { ...form };
      await apiUpdateProfile(token, payload);
      await refreshProfile();
      setEdit(false);
    } catch (err: any) {
      const details = err?.details;
      const msg = details?.phone?.[0] || details?.address?.[0] || details?.name?.[0] || details?.avatar_url?.[0] || err?.message || 'Failed to save profile';
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="py-16">
      <Container>
        <h1 className="font-['Poppins'] text-3xl font-bold mb-6">My Account</h1>

        {loading ? (
          <p>Loading…</p>
        ) : user ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow p-6">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-[#0B6E65] text-white flex items-center justify-center text-2xl">
                    {user.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <div>
                    <div className="font-semibold text-lg">{user.name}</div>
                    <div className="text-gray-600 text-sm">{user.email}</div>
                  </div>
                </div>
                <div className="mt-6 text-sm text-gray-600">
                  <p>Phone: {(user as any).phone || '—'}</p>
                  <p>Country: {(user as any).country || '—'}</p>
                  <p>Address: {(user as any).address || '—'}</p>
                </div>
                <div className="mt-6">
                  <button onClick={() => setEdit(true)} className="px-4 py-2 rounded-lg bg-[#0B6E65] text-white hover:bg-[#095850]">Edit Profile</button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              {isIncomplete && !edit ? (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-900 rounded-xl p-4 mb-6">
                  Your profile is incomplete. Please provide your contact details.
                  <div className="mt-3">
                    <button onClick={() => setEdit(true)} className="px-4 py-2 rounded-lg bg-yellow-600 text-white hover:bg-yellow-700">Complete Profile</button>
                  </div>
                </div>
              ) : null}

              {(isIncomplete || edit) && (
                <form onSubmit={onSubmit} className="bg-white rounded-2xl shadow p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Name</label>
                      <input name="name" value={form.name} onChange={onChange} className="w-full rounded-lg border px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone</label>
                      <input name="phone" value={form.phone} onChange={onChange} required className="w-full rounded-lg border px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Country</label>
                      <input name="country" value={form.country} onChange={onChange} className="w-full rounded-lg border px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Address</label>
                      <input name="address" value={form.address} onChange={onChange} required className="w-full rounded-lg border px-3 py-2" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1">Avatar URL</label>
                      <input name="avatar_url" value={form.avatar_url} onChange={onChange} className="w-full rounded-lg border px-3 py-2" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1">Bio</label>
                      <textarea name="bio" value={form.bio} onChange={onChange} rows={4} className="w-full rounded-lg border px-3 py-2" />
                    </div>
                  </div>
                  {error && <p className="text-sm text-red-600">{error}</p>}
                  <div className="flex gap-3">
                    <button disabled={saving} className="px-4 py-2 rounded-lg bg-[#0B6E65] text-white hover:bg-[#095850] disabled:opacity-60">{saving ? 'Saving…' : 'Save'}</button>
                    {edit && <button type="button" onClick={() => setEdit(false)} className="px-4 py-2 rounded-lg border">Cancel</button>}
                  </div>
                </form>
              )}

              {!isIncomplete && !edit && (
                <div className="bg-white rounded-2xl shadow p-6">
                  <h2 className="font-['Poppins'] text-xl font-semibold mb-4">Profile Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div><span className="text-gray-500">Name:</span> {user.name}</div>
                    <div><span className="text-gray-500">Email:</span> {user.email}</div>
                    <div><span className="text-gray-500">Phone:</span> {(user as any).phone || '—'}</div>
                    <div><span className="text-gray-500">Country:</span> {(user as any).country || '—'}</div>
                    <div className="md:col-span-2"><span className="text-gray-500">Address:</span> {(user as any).address || '—'}</div>
                    {(user as any).bio && <div className="md:col-span-2"><span className="text-gray-500">Bio:</span> {(user as any).bio}</div>}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <p>Not signed in.</p>
        )}
      </Container>
    </section>
  );
}
