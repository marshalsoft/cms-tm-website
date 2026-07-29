import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

export const metadata: Metadata = { title: 'Admin Login | CMS T&M' };

const LoginView = dynamic(() => import('@/components/LoginView'), { ssr: false });

export default function AdminPage() {
  return <LoginView />;
}
