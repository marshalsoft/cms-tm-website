'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const nav = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About' },
  { href: '/routes', label: 'Routes' },
  { href: '/leadership', label: 'Leadership' },
  { href: '/blog', label: 'Blog' }
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 backdrop-blur bg-[#0A2A1F]/90 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sun grid place-items-center shadow-soft">
              <span className="font-display font-extrabold text-ink tracking-tight">T</span>
            </div>
            <div className="leading-tight">
              <div className="font-display font-extrabold text-white text-[18px] tracking-tight">CMS T&amp;M</div>
              <div className="text-[11px] uppercase tracking-[2px] text-white/60">Lekki–Ajah Corridor</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {nav.map((n) => {
              const active = path === n.href;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`px-4 py-2 rounded-xl text-[14px] font-semibold transition ${
                    active ? 'bg-white/10 text-white' : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://cmstnm.com/request-card"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-sun text-ink font-extrabold text-sm shadow-soft hover:brightness-105"
            >
              Apply for Card
            </a>
            <a
              href="https://cmstnm.com/register"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl border border-white/20 text-white font-semibold text-sm hover:bg-white/5"
            >
              Drive for TMO
            </a>
            <a
              href="https://dashboard.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl text-white font-semibold text-sm hover:bg-white/5"
            >
              Login
            </a>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
              ) : (
                <>
                  <path d="M4 7h16" strokeLinecap="round" />
                  <path d="M4 12h16" strokeLinecap="round" />
                  <path d="M4 17h16" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-white/10 px-5 py-4 space-y-2 bg-[#0A2A1F]">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-xl text-white/90 font-semibold border-b border-white/5"
              >
                {n.label}
              </Link>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <a
                href="https://cmstnm.com/request-card"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center px-4 py-3 rounded-xl bg-sun text-ink font-extrabold"
              >
                Apply for Card
              </a>
              <a
                href="https://cmstnm.com/register"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center px-4 py-3 rounded-xl border border-white/15 text-white font-semibold"
              >
                Drive for TMO
              </a>
              <a
                href="https://dashboard.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center px-4 py-3 rounded-xl text-white/80 font-semibold"
              >
                Login
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-[#0A2A1F] text-white/80 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 grid gap-10 md:grid-cols-4">
          <div>
            <div className="font-display font-extrabold text-white text-xl">CMS T&amp;M</div>
            <p className="mt-3 text-sm leading-6 text-white/60">
              Operator of the Lekki–Ajah Corridor. Powered by 58 years of Lagos transport heritage.
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[2px] text-leaf font-bold mb-4">Company</div>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/leadership" className="hover:text-white">Leadership</Link></li>
              <li><Link href="/routes" className="hover:text-white">Routes</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[2px] text-leaf font-bold mb-4">Products</div>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="hover:text-white">TMO Card</Link></li>
              <li><Link href="/products" className="hover:text-white">Hire Vehicles</Link></li>
              <li><Link href="/products" className="hover:text-white">Corporate Travel</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[2px] text-leaf font-bold mb-4">Contact</div>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:info@cmstnm.com" className="hover:text-white">info@cmstnm.com</a>
              </li>
              <li>
                <a href="https://wa.me/2348140467195" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  +234 814 046 7195
                </a>
              </li>
              <li className="pt-2 flex items-center gap-3">
                <a href="https://www.facebook.com/people/CMS-TM/61591233941784" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 grid place-items-center hover:bg-white/10">
                  <span className="text-xs font-bold">f</span>
                </a>
                <a href="https://www.tiktok.com/@tmorides0?_r=1&_t=ZS-98IdgFJOv2H" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 grid place-items-center hover:bg-white/10">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z"/></svg>
                </a>
                <a href="https://www.instagram.com/tmorides?igsh=MTRkaml2dWQyY3VwaQ==" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 grid place-items-center hover:bg-white/10">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
                </a>
                <a href="https://wa.me/2348140467195" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 grid place-items-center hover:bg-white/10">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.52 3.48A11.88 11.88 0 0 0 12.04 0C5.5 0 .2 5.29.2 11.84c0 2.09.55 4.13 1.6 5.94L0 24l6.4-1.68a11.87 11.87 0 0 0 5.64 1.44h.01c6.54 0 11.85-5.29 11.85-11.83 0-3.16-1.23-6.13-3.38-8.45zM12.05 21.64h-.01a9.84 9.84 0 0 1-5.02-1.4l-.36-.21-3.8 1 1.02-3.7-.23-.38a9.82 9.82 0 0 1-1.51-5.2c0-5.43 4.43-9.85 9.9-9.85 2.64 0 5.13 1.03 7 2.9a9.81 9.81 0 0 1 2.9 6.95c0 5.43-4.43 9.85-9.89 9.85zm5.43-7.36c-.3-.15-1.76-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.96 1.17-.18.2-.36.22-.66.08-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.64-.93-2.25-.25-.59-.5-.51-.68-.52l-.58-.01c-.2 0-.53.08-.8.38-.28.3-1.06 1.03-1.06 2.5s1.09 2.9 1.24 3.1c.15.2 2.13 3.25 5.16 4.56.72.3 1.28.49 1.72.63.72.22 1.38.19 1.9.12.58-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.08-.12-.28-.2-.58-.35z"/></svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
            <div>© {new Date().getFullYear()} CMS T&amp;M. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <a href="https://cmstnm.com/register" target="_blank" rel="noopener noreferrer" className="hover:text-white">TMO X</a>
              <a href="https://dashboard.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">Dashboard</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
