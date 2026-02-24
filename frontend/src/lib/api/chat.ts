const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';

function getVisitorToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('chat_visitor_token');
}

function setVisitorToken(token: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('chat_visitor_token', token);
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getVisitorToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };
  if (token) headers['X-Visitor-Token'] = token;
  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json() as Promise<T>;
}

export async function startConversation(): Promise<{ conversation_id: number; visitor_token: string }>{
  const res = await request<{ conversation_id: number; visitor_token: string }>('/api/chat/start', { method: 'POST' });
  setVisitorToken(res.visitor_token);
  return res;
}

export async function getMessages(conversationId: number): Promise<Array<{ id: number; sender: 'visitor' | 'admin'; content: string; created_at: string }>>{
  return request<Array<{ id: number; sender: 'visitor' | 'admin'; content: string; created_at: string }>>(`/api/chat/${conversationId}/messages`, { method: 'GET' });
}

export async function sendMessage(conversationId: number, content: string, authToken?: string): Promise<void> {
  const headers: Record<string, string> = {};
  if (authToken) headers['Authorization'] = `Bearer ${authToken}`;
  await request(`/api/chat/${conversationId}/messages`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ content }),
  });
}

export async function adminListChats(authToken: string): Promise<Array<{ id: number; status: string; last_message: { content: string; sender: string; created_at: string } | null; created_at: string }>>{
  return request<Array<{ id: number; status: string; last_message: { content: string; sender: string; created_at: string } | null; created_at: string }>>('/api/admin/chats', {
    method: 'GET',
    headers: { Authorization: `Bearer ${authToken}` },
  });
}
