"use client";

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { adminListChats, getMessages, sendMessage } from '@/lib/api/chat';

export default function AdminChats() {
  const { token, role } = useAuth();
  const [conversations, setConversations] = useState<Array<{ id: number; status: string; last_message: { content: string; sender: string; created_at: string } | null; created_at: string }>>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Array<{ id: number; sender: 'visitor' | 'admin'; content: string; created_at: string }>>([]);
  const [input, setInput] = useState('');

  const isAdmin = useMemo(() => {
    const normalized = (role || '').toLowerCase().replace(/[-_\s]/g, '');
    return normalized === 'admin' || normalized === 'superadmin';
  }, [role]);

  useEffect(() => {
    if (!token || !isAdmin) return;
    (async () => {
      const list = await adminListChats(token);
      setConversations(list);
      if (list.length > 0) setSelectedId(list[0].id);
    })();
  }, [token, isAdmin]);

  useEffect(() => {
    if (!selectedId) return;
    (async () => {
      const msgs = await getMessages(selectedId);
      setMessages(msgs);
    })();
  }, [selectedId]);

  const onSend = async () => {
    if (!selectedId || !input.trim() || !token) return;
    await sendMessage(selectedId, input.trim(), token);
    setInput('');
    const msgs = await getMessages(selectedId);
    setMessages(msgs);
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100 p-8 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-[#0B6E65] to-[#095850] rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-3xl mx-auto w-full relative z-10 bg-white/80 backdrop-blur-lg rounded-3xl p-10 shadow-2xl border border-white/20 text-center">
          <h1 className="text-4xl font-bold mt-12 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">Access Restricted</h1>
          <p className="text-gray-600">You need admin privileges to view chats.</p>
          <Link href="/" className="inline-block mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-[#0B6E65] to-[#095850] text-white shadow-md hover:shadow-lg">Go Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100 p-8 flex items-center justify-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-[#0B6E65] to-[#095850] rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-12 bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="flex items-center space-x-4">
            <Link
              href="/admin/dashboard"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 hover:scale-105 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </Link>
            <div>
              <h1 className="text-4xl font-bold mt-12 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Visitor Chats</h1>
              <p className="text-gray-600 mt-2 text-lg">View conversations and reply to visitors instantly</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Conversations List */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mr-3 shadow-md">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h6m-6 4h8M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H7l-2 2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900">Conversations</h2>
            </div>
            <div className="space-y-3 max-h-[28rem] overflow-y-auto pr-2">
              {conversations.map(c => (
                <button
                  key={c.id}
                  onClick={() => setSelectedId(c.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${selectedId === c.id ? 'bg-purple-50 border-purple-200 shadow-md' : 'hover:bg-gray-50'} flex items-center justify-between`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#0B6E65] to-[#095850] text-white flex items-center justify-center text-sm font-semibold shadow">
                      {String(c.id).slice(-2)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Conversation #{c.id}</div>
                      <div className="text-xs text-gray-500 truncate max-w-[14rem]">{c.last_message?.content ?? 'No messages yet'}</div>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${c.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{c.status}</span>
                </button>
              ))}
              {conversations.length === 0 && (
                <div className="p-6 rounded-xl bg-gray-50 border text-gray-600 text-center">No conversations yet</div>
              )}
            </div>
          </div>

          {/* Messages Panel */}
          <div className="lg:col-span-2 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-6 flex flex-col">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-[#0B6E65] to-[#095850] rounded-xl flex items-center justify-center mr-3 shadow-md">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900">Messages</h2>
            </div>
            <div className="flex-1 overflow-y-auto space-y-3 p-2 bg-gray-50 rounded-2xl border">
              {messages.map(m => (
                <div key={m.id} className={`max-w-[80%] p-3 rounded-2xl ${m.sender === 'visitor' ? 'bg-white text-gray-800' : 'bg-purple-600 text-white ml-auto'} shadow-sm`}>
                  <div className="text-xs opacity-70 mb-1">{m.sender === 'visitor' ? 'Visitor' : 'Admin'}</div>
                  <div>{m.content}</div>
                </div>
              ))}
              {messages.length === 0 && (
                <div className="text-gray-500 text-center py-10">Select a conversation to view messages</div>
              )}
            </div>
            <div className="mt-4 flex gap-2">
              <input
                className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:ring-4 focus:ring-purple-600/10 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                placeholder="Type a reply..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') onSend(); }}
              />
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg" onClick={onSend}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
