
'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import Index from '@/pages/Index';

export default function HomePage() {
  // Check if we're running on the client
  useEffect(() => {
    // This will prevent hydration mismatch
    const documentElement = document.documentElement;
    documentElement.style.colorScheme = 'light dark';
  }, []);

  return <Index />;
}
