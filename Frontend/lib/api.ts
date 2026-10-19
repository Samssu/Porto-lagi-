import type { ContactForm, Profile, Project, Skill } from '@/types';

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** GET JSON dengan retry 2x (backoff 500ms, 1s) saat network error. */
async function getJson<T>(path: string, retries = 2): Promise<T> {
  for (let attempt = 0; ; attempt++) {
    try {
      const res = await fetch(`${API_URL}${path}`);
      if (!res.ok) throw new Error(`HTTP ${res.status} ${path}`);
      return (await res.json()) as T;
    } catch (error) {
      if (attempt >= retries) throw error;
      await delay(500 * (attempt + 1));
    }
  }
}

export const getProfile = () => getJson<Profile>('/api/profile');
export const getSkills = () => getJson<Skill[]>('/api/skills');
export const getProjects = () => getJson<Project[]>('/api/projects');

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: AuthUser;
  error?: string;
}

function saveSession(token: string, user: AuthUser) {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  window.dispatchEvent(new Event('auth-changed'));
}

export async function register(
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  const data = (await res.json()) as AuthResponse;
  if (data.success && data.token && data.user) saveSession(data.token, data.user);
  return data;
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = (await res.json()) as AuthResponse;
  if (data.success && data.token && data.user) saveSession(data.token, data.user);
  return data;
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.dispatchEvent(new Event('auth-changed'));
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem('user');
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export async function sendContact(
  form: ContactForm
): Promise<{ success: boolean; message?: string; error?: string }> {
  const res = await fetch(`${API_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  });
  return res.json();
}
