'use client'

import colors from 'tailwindcss/colors';
import { BlinkBlur } from 'react-loading-indicators';

export default function Loading() {
  return (
    <div className="flex flex-col h-dvh">
      <main className="grid place-content-center h-full">
        <BlinkBlur
          color={[colors.gray[500], colors.yellow[500], colors.red[500], colors.blue[500], colors.green[500]]}
          size="medium"
          text="Word Quest"
        />
      </main>
      <footer className="flex flex-col items-center justify-center">
        <span className="text-gray-300 text-sm my-4">
          @2024 Word Quest. All rights reserved.
        </span>
      </footer>
    </div>
  );
}