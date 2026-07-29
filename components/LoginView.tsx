'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/api';
import { useSession } from '@/lib/session';

export default function LoginView() {
  const router = useRouter();
  const { login: persist } = useSession();
  const [email, setEmail] = useState('admin@cmstnm.com');
  const [password, setPassword] = useState('admin123');
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const res = await login(email, password);
      persist(res.token);
      router.push('/admin/dashboard');
    } catch (e: any) {
      setErr(e?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] grid place-items-center px-5 py-16">
      <form onSubmit={onSubmit} className="w-full max-w-md rounded-3xl bg-white border border-sand p-8 shadow-soft">
        <div className="text-xs tracking-[2px] uppercase text-leaf font-bold">Admin</div>
        <h1 className="mt-3 font-display font-extrabold text-3xl tracking-tight">Sign in</h1>
        <p className="mt-2 text-ink/60 text-sm leading-6">
          Default credentials from <code className="bg-sand px-1.5 py-0.5 rounded">.env.example</code> can be
          changed by editing the server environment variables.
        </p>
        <div className="mt-6 space-y-4">
          <label className="block">
            <span className="text-xs uppercase tracking-[2px] text-ink/60 font-bold">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-2xl bg-paper border border-sand focus:border-leaf outline-none"
            />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-[2px] text-ink/60 font-bold">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-2xl bg-paper border border-sand focus:border-leaf outline-none"
            />
          </label>
          {err ? <div className="text-[13px] text-red-600">{err}</div> : null}
          <button
            disabled={loading}
            className="w-full px-5 py-3 rounded-2xl bg-ink text-white font-extrabold disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </div>
      </form>
    </div>
  );
}
