'use client'

import colors from 'tailwindcss/colors';
import { BlinkBlur } from 'react-loading-indicators';
import { Footer } from '@/components';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function NotFound() {
  const router = useRouter()
  useEffect(() => {
    router.push('/')
  }, []);
  return (
    <div className="flex flex-col h-dvh">
      <main className="grid place-content-center h-full">
        <BlinkBlur
          color={[colors.blue[500], colors.green[500], colors.red[500], colors.yellow[500]]}
          size="medium"
          text="Word Quest"
        />
      </main>
      <Footer />
    </div>
  );
}