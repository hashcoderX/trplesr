"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import { startConversation, getMessages, sendMessage } from '@/lib/api/chat';
import { useAuth } from '@/context/AuthContext';

export default function ChatWidget() {
  const { token, role } = useAuth();
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ id: number; sender: 'visitor' | 'admin'; content: string; created_at: string }>>([]);
  const [input, setInput] = useState('');
  const pollRef = useRef<number | null>(null);

  const isAdmin = useMemo(() => {
    const normalized = (role || '').toLowerCase().replace(/[-_\s]/g, '');
    return normalized === 'admin' || normalized === 'superadmin';
  }, [role]);

  useEffect(() => {
    if (!open) return;
    let active = true;
    (async () => {
      try {
        const res = await startConversation();
        if (!active) return;
        setConversationId(res.conversation_id);
      } catch (e) {
        console.error(e);
      }
    })();
    return () => { active = false; };
  }, [open]);

  useEffect(() => {
    if (!conversationId) return;
    // Start polling messages every 2s
    const poll = async () => {
      try {
        const msgs = await getMessages(conversationId);
        setMessages(msgs);
      } catch (e) {
        console.error(e);
      }
    };
    poll();
    pollRef.current = window.setInterval(poll, 2000);
    return () => {
      if (pollRef.current) window.clearInterval(pollRef.current);
      pollRef.current = null;
    };
  }, [conversationId]);

  const onSend = async () => {
    if (!input.trim() || !conversationId) return;
    const content = input.trim();
    setInput('');
    try {
      await sendMessage(conversationId, content, isAdmin ? token ?? undefined : undefined);
      // Optimistically refresh
      const msgs = await getMessages(conversationId);
      setMessages(msgs);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!open ? (
        <button onClick={() => setOpen(true)} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition-transform hover:scale-105">
          Chat
        </button>
      ) : (
        <div className="w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <span className="font-semibold">Instant Chat</span>
            <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white">✕</button>
          </div>
          <div className="h-80 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map(m => (
              <div key={m.id} className={`max-w-[80%] p-3 rounded-xl ${m.sender === 'visitor' ? 'bg-white text-gray-800' : 'bg-purple-600 text-white ml-auto'}`}>
                <div className="text-sm opacity-80 mb-1">{m.sender === 'visitor' ? 'You' : 'Admin'}</div>
                <div>{m.content}</div>
              </div>
            ))}
            {messages.length === 0 && (
              <div className="text-center text-gray-500">Say hello to start the chat.</div>
            )}
          </div>
          <div className="p-3 flex gap-2">
            <input
              className="flex-1 p-2 border rounded-lg"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') onSend(); }}
            />
            <button onClick={onSend} className="px-4 py-2 bg-purple-600 text-white rounded-lg">Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
