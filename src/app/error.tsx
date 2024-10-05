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
      <main className="grid place-content-center h-full">
        <h1>_I m@ 3rr0!</h1>
        <h2>W3 h@v3 a b1g pr0blem!</h2>
        <h3>{error.message}</h3>
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