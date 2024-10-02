import * as React from 'react';
import { cn } from "@/lib/cn";
import { Letter } from '@/components/letter';

export function ContentInfo({ className }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(className, 'flex flex-col gap-6 py-4')}
    >
      <p>The goal of the game is to discover the correct word in as few attempts as possible.</p>
      <p>Click on the letters to type the word and fill in all the fields in the row to verify if the word is correct.</p>

      <div className='flex gap-4 items-center flex-wrap'>
        <div className='flex gap-2 w-full max-w-[300px]'>
          <Letter>A</Letter>
          <Letter>E</Letter>
          <Letter>I</Letter>
          <Letter state='correct'>O</Letter>
          <Letter>U</Letter>
        </div>
        <span className='font-normal text-base'>If the correct letter is in the correct position, the field will turn green.</span>
      </div>

      <div className='flex gap-4 items-center flex-wrap'>
        <div className='flex gap-2 w-full max-w-[300px]'>
          <Letter>A</Letter>
          <Letter>E</Letter>
          <Letter state='exist'>I</Letter>
          <Letter>O</Letter>
          <Letter>U</Letter>
        </div>
        <span className='font-normal text-base'>If the letter exists in the word but is in the wrong position, the field will turn orange.</span>
      </div>

      <div className='flex gap-4 items-center flex-wrap'>
        <div className='flex gap-2 w-full max-w-[300px]'>
          <Letter>A</Letter>
          <Letter state='wrong'>E</Letter>
          <Letter>I</Letter>
          <Letter>O</Letter>
          <Letter>U</Letter>
        </div>
        <span className='font-normal text-base'>If the letter does not exist in the word, the field will turn dark gray.</span>
      </div>

      <div className='flex gap-4 items-center flex-wrap'>
        <div className='flex gap-2 w-full max-w-[300px]'>
          <Letter>A</Letter>
          <Letter>E</Letter>
          <Letter>I</Letter>
          <Letter>O</Letter>
          <Letter>U</Letter>
        </div>
        <span>Word without validation.</span>
      </div>

      <div className='flex gap-4 items-center flex-wrap'>
        <div className='flex gap-2 w-full max-w-[300px]'>
          <Letter>A</Letter>
          <Letter>E</Letter>
          <Letter></Letter>
          <Letter></Letter>
          <Letter></Letter>
        </div>
        <span className='font-normal text-base'>If you do not fill in all the fields, validation of whether the letters are in the correct position will not occur.</span>
      </div>

      <p className='font-medium mb-4'>Have fun and good luck! 😎</p>
    </div>
  )
}
