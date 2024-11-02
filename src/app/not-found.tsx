'use client'

import { BlinkLoading } from '@/components/blink-loading';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function NotFound() {
  const router = useRouter()
  useEffect(() => {
    router.push('/')
  }, []);
  return (
    <div className="flex flex-col h-full justify-center">
      <BlinkLoading />
    </div>
  );
}