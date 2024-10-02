import React from 'react';
import { tv, VariantProps } from 'tailwind-variants';
import { cn } from '@/lib/cn';

const letterVariants = tv({
  base: 'flex flex-col w-full max-w-16 aspect-square rounded-md font-semibold text-xl md:text-2xl items-center justify-center',
  variants: {
    state: {
      default: 'bg-gray-400 text-gray-950',
      wrong: 'bg-gray-500 text-gray-950',
      correct: 'bg-green-600 text-gray-950',
      exist: 'bg-amber-600 text-gray-950',
    },
    focused: {
      true: 'border-2 border-slate-300',
      false: ''
    }
  },
  defaultVariants: {
    state: 'default'
  }

});

type LetterProps = React.ComponentProps<'div'> & VariantProps<typeof letterVariants>

export function Letter({ children, state, focused, className, ...props }: LetterProps) {



  return <div className={cn(letterVariants({ state, focused, className }))} {...props}>{children}</div>
}