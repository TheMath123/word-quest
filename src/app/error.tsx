'use client'

import { Footer } from '@/components';
import { Button } from '@/components/ui/button';

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex flex-col h-dvh">
      <main className="grid place-content-center h-full space-y-6">
        <h1 className='font-bold text-2xl text-red-600'>_I @m 3rr0!</h1>
        <h2 className='font-semibold text-xl text-yellow-600'>W3 h@v3 a b1g pr0blem!</h2>
        <code className='font-medium text-lg max-w-lg text-gray-400 bg-gray-800 p-4 rounded-md'>{error.message}</code>
        <Button
          onClick={
            () => reset()
          }
        >
          Try again
        </Button>
      </main>
      <Footer />
    </div>
  );
}