export type ApiUser = {
  id: number;
  name: string;
  email: string;
  roll?: string | null;
  phone?: string | null;
  country?: string | null;
  address?: string | null;
  avatar_url?: string | null;
  bio?: string | null;
  created_at?: string;
  updated_at?: string;
  roles?: { name: string }[];
};

type LoginResponse = {
  message: string;
  user: ApiUser;
  token: string;
  token_type: 'Bearer';
};

type RegisterResponse = LoginResponse;

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    // In dev, credentials not required since we're using tokens
  });
  if (!res.ok) {
    let body: any = null;
    try {
      body = await res.json();
    } catch {}
    const err = new Error(body?.message || body?.error || body || `Request failed: ${res.status}`);
    // Attach validation errors when present
    (err as any).details = body?.errors || body;
    throw err;
  }
  return res.json() as Promise<T>;
}

export async function apiRegister(name: string, email: string, password: string): Promise<RegisterResponse> {
  return request('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
}

export async function apiLogin(email: string, password: string): Promise<LoginResponse> {
  return request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function apiMe(token: string): Promise<ApiUser> {
  return request('/api/auth/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

type ProfileResponse = { user: ApiUser; is_complete: boolean };

export async function apiGetProfile(token: string): Promise<ProfileResponse> {
  return request('/api/profile', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function apiUpdateProfile(token: string, data: Partial<ApiUser>): Promise<{ message: string; user: ApiUser; is_complete: boolean }> {
  return request('/api/profile', {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
}

export async function apiLogout(token: string): Promise<{ message: string }>{
  return request('/api/auth/logout', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
