'use client'

import { GridLoader } from "react-spinners";
import colors from 'tailwindcss/colors';

export default function Loading() {
  return (
    <div className="flex flex-col h-dvh">
      <main className="grid place-content-center h-full">
        <GridLoader color={colors.gray[300]} size={32} />
      </main>
      <footer className="flex flex-col items-center justify-center">
        <span className="text-gray-300 text-sm my-4">
          @2024 Word Quest. All rights reserved.
        </span>
      </footer>
    </div>
  );
}