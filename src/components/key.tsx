import React from 'react';
import { tv, VariantProps } from 'tailwind-variants';
import { cn } from '@/lib/cn';

const keyVariants = tv({
  base: 'p-4 w-full min-w-6 min-h-6  max-w-16 max-h-16 rounded-md aspect-square font-semibold text-xl md:text-2xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100',
  variants: {
    color: {
      default: 'bg-blue-400 text-blue-950 hover:bg-blue-500 disabled:bg-blue-400',
      confirm: 'bg-green-500 text-green-950 hover:bg-green-600 disabled:bg-green-500',
      erase: 'bg-blue-500 text-gray-950 hover:bg-blue-600 disabled:bg-blue-500',
    },
  },
  defaultVariants: {
    color: 'default'
  }
});

type KeyProps = React.ComponentProps<'button'> & VariantProps<typeof keyVariants>

export function Key({ children, className, color, ...props }: KeyProps) {

  return <button
    className={cn(keyVariants({ color }), className)}
    {...props}
  >
    {children}
  </button>
}