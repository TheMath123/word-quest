'use client'

import { useEffect, useState } from "react";
import { Letter } from "@/components";
import { convertStringToArray } from "@/lib/convert-string-to-array";
import { cn } from "@/lib/cn";
import { Alphabet } from "@prisma/client";

interface RowProps {
  focused?: boolean,
  checkWord?: boolean,
  word?: string,
  size: number,
  correctWord: string;
  alphabet?: Alphabet | null,
}

export function Row({ focused = false, word = '', size, checkWord = false, correctWord, alphabet }: RowProps) {
  const [wordLetters, setWordLetters] = useState<string[]>(convertStringToArray(word, size));
  let isDavek = false;

  useEffect(() => {
    setWordLetters(convertStringToArray(word, size))
  }, [size, word]);

  const getWordLettersState = (letter: string, index: number) => {
    if (checkWord) {
      const rawLetter = letter.toLowerCase().trim();

      if (word.length === correctWord.length) {
        if (rawLetter === correctWord[index]) {
          return 'correct';
        }
        return correctWord.includes(rawLetter) ? 'exist' : 'wrong';
      }
    }

    return 'default';
  }

  if (alphabet) {
    isDavek = alphabet.name.toLowerCase().trim() === 'davek';
  }

  return <div
    className={cn(
      isDavek && 'font-davek',
      `flex flex-row gap-2 md:gap-4 justify-center min-w-[300px]`,
    )}
  >
    {wordLetters.map((letter, index) => (
      <Letter
        key={`${letter}-${index}`}
        state={getWordLettersState(letter, index)}
        focused={focused}
      >
        {letter ? letter : ''}
      </Letter>
    ))}
  </div>
}