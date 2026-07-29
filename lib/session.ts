'use client';

import { useEffect, useState } from 'react';

const KEY = 'cms_tm_token';

export type Session = { token: string } | null;

export function useSession() {
  const [session, setSession] = useState<Session>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    try {
      const t = window.localStorage.getItem(KEY);
      setSession(t ? { token: t } : null);
    } catch {}
    setLoaded(true);
  }, []);
  function save(token: string | null) {
    try {
      if (token) window.localStorage.setItem(KEY, token);
      else window.localStorage.removeItem(KEY);
    } catch {}
    setSession(token ? { token } : null);
  }
  return { session, loaded, login: (t) => save(t), logout: () => save(null) };
}

export function getClientToken(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(KEY);
  } catch {
    return null;
  }
}
