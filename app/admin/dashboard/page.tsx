import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

export const metadata: Metadata = { title: 'Admin Dashboard | CMS T&M' };

const DashboardView = dynamic(() => import('@/components/DashboardView'), { ssr: false });

export default function DashboardPage() {
  return <DashboardView />;
}
