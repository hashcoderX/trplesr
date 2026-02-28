'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { API_BASE } from '@/lib/config';
import { adminListChats } from '@/lib/api/chat';

interface Stats {
  destinations: number;
  hotels: number;
  itineraries: number;
}

export default function AdminDashboard() {
  const { user, role, token, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<Stats>({ destinations: 0, hotels: 0, itineraries: 0 });
  const [chatPreview, setChatPreview] = useState<Array<{ id: number; status: string; last_message: { content: string; sender: string; created_at: string } | null; created_at: string }>>([]);

  useEffect(() => {
    if (!loading && (!user)) {
      router.push('/');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (token) {
      fetchStats();
    }
  }, [token]);

  useEffect(() => {
    const normalized = (role || '').toLowerCase().replace(/[-_\s]/g, '');
    const isAdmin = normalized === 'admin' || normalized === 'superadmin';
    if (token && isAdmin) {
      (async () => {
        try {
          const list = await adminListChats(token);
          setChatPreview(list.slice(0, 5));
        } catch (e) {
          console.error('Failed to fetch chats:', e);
        }
      })();
    }
  }, [token, role]);

  const fetchStats = async () => {
    try {
      const [destRes, hotelRes, itinRes] = await Promise.all([
        fetch(`${API_BASE}/admin/destinations`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API_BASE}/admin/hotels`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API_BASE}/admin/itineraries`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      const destData = destRes.ok ? await destRes.json() : [];
      const hotelData = hotelRes.ok ? await hotelRes.json() : [];
      const itinData = itinRes.ok ? await itinRes.json() : [];
      setStats({
        destinations: Array.isArray(destData) ? destData.length : 0,
        hotels: Array.isArray(hotelData) ? hotelData.length : 0,
        itineraries: Array.isArray(itinData) ? itinData.length : 0,
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

  if (!user) return null;

  const cards = [
    {
      href: '/admin/destinations',
      title: 'Destinations',
      description: 'Manage destinations for itineraries',
      count: stats.destinations,
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      href: '/admin/hotels',
      title: 'Hotels',
      description: 'Manage hotel listings',
      count: stats.hotels,
      icon: (
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
    },
    {
      href: '/admin/itineraries',
      title: 'Itineraries',
      description: 'Manage travel itineraries',
      count: stats.itineraries,
      icon: (
        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 flex items-center justify-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-[#0B6E65] to-[#095850] rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full relative z-10">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mt-30 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">Admin Dashboard</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Manage your travel platform content with powerful tools and insights</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {cards.map((card, index) => (
            <Link
              key={index}
              href={card.href}
              className={`${card.bgColor} p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${card.color} text-white shadow-lg`}>
                  {card.icon}
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900">{card.count}</div>
                  <div className="text-sm text-gray-600">Total</div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{card.title}</h3>
              <p className="text-gray-600">{card.description}</p>
              <div className="mt-4 flex items-center text-sm font-medium text-gray-700">
                Manage {card.title.toLowerCase()}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/admin/destinations"
              className="flex items-center p-4 bg-gradient-to-r from-[#0B6E65]/10 to-[#095850]/10 rounded-xl hover:from-[#0B6E65]/20 hover:to-[#095850]/20 transition-all duration-300 border border-[#0B6E65]/20"
            >
              <div className="p-2 bg-gradient-to-r from-[#0B6E65] to-[#095850] rounded-lg mr-3 shadow-md">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <span className="font-medium text-gray-900">Add Destination</span>
            </Link>
            <Link
              href="/admin/hotels"
              className="flex items-center p-4 bg-gradient-to-r from-[#0B6E65]/10 to-[#095850]/10 rounded-xl hover:from-[#0B6E65]/20 hover:to-[#095850]/20 transition-all duration-300 border border-[#0B6E65]/20"
            >
              <div className="p-2 bg-gradient-to-r from-[#0B6E65] to-[#095850] rounded-lg mr-3 shadow-md">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <span className="font-medium text-gray-900">Add Hotel</span>
            </Link>
            <Link
              href="/admin/itineraries"
              className="flex items-center p-4 bg-gradient-to-r from-[#0B6E65]/10 to-[#095850]/10 rounded-xl hover:from-[#0B6E65]/20 hover:to-[#095850]/20 transition-all duration-300 border border-[#0B6E65]/20"
            >
              <div className="p-2 bg-gradient-to-r from-[#0B6E65] to-[#095850] rounded-lg mr-3 shadow-md">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <span className="font-medium text-gray-900">Create Itinerary</span>
            </Link>
            <div className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="p-2 bg-gray-100 rounded-lg mr-3">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="font-medium text-gray-900">View Analytics</span>
            </div>
            <Link
              href="/admin/chats"
              className="flex items-center p-4 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-xl hover:from-purple-600/20 hover:to-pink-600/20 transition-all duration-300 border border-purple-200"
            >
              <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg mr-3 shadow-md">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h6m-6 4h8M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H7l-2 2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="font-medium text-gray-900">View Instant Chats</span>
            </Link>
          </div>
        </div>

        {/* Instant Chats Preview */}
        {chatPreview.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Instant Chats</h2>
              <Link href="/admin/chats" className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition">Open Chats</Link>
            </div>
            <div className="space-y-3">
              {chatPreview.map((c) => (
                <div key={c.id} className="p-4 rounded-xl border hover:bg-gray-50 transition">
                  <div className="flex justify-between items-center">
                    <div className="font-medium text-gray-900">Conversation #{c.id}</div>
                    <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">{c.status}</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-2 truncate">{c.last_message?.content ?? 'No messages yet'}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* User Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Welcome back, {user.name}!</h3>
              <p className="text-gray-600">Role: <span className="font-medium capitalize">{role}</span></p>
              <p className="text-sm text-gray-500 mt-1">Last login: Today</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}