'use client';

import dynamic from 'next/dynamic';
const TimezoneConverter = dynamic(() => import('../components/TimezoneConverter'), {
  ssr: false
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 bg-gray-100">
      <TimezoneConverter />
    </main>
  );
}