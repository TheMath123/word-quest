'use client'

import { BlinkLoading } from '@/components/blink-loading';

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-1/2">
      <BlinkLoading />
    </div>
  );
}