'use client'

import words from '@/assets/words.json';
import { useLocalStorage } from "@/hooks/use-local-storage";
import { DefeatDialog, Keyboard, Row, WinDialog } from "@/components";

export default function Home() {
  const chosenWord = words[Math.floor(Math.random() * words.length)];
  const correctWord = chosenWord.word;
  const wordSize = correctWord.length;
  const maxAttempts = 5;
  const [defeat, setDefeat] = useLocalStorage('defeat', false);
  const [win, setWin] = useLocalStorage('win', false);
  const initialChecks = Array(maxAttempts).fill(false);
  const [canCheck, setCanCheck] = useLocalStorage('checks', initialChecks);
  const [attempt, setAttempt] = useLocalStorage('attempt', maxAttempts);
  const fillGrid = Array(maxAttempts).fill('');
  const [gameWords, setGameWords] = useLocalStorage<string[]>('game', fillGrid);
  const [currentWord, setCurrentWord] = useLocalStorage('word', '');

  const handleBackspace = () => {
    if (currentWord.length > 0) {
      setCurrentWord((prev: string) => prev.slice(0, -1));
      const newGameWords = [...gameWords];
      newGameWords[maxAttempts - attempt] = currentWord.slice(0, -1);
      setGameWords(newGameWords);
    }
  };

  const handleConfirm = () => {
    nextAttempt();
  }

  const handleWordChange = (newLetter: string) => {
    if (currentWord.length < wordSize && !defeat && !win) {
      const newWord = currentWord + newLetter;
      setCurrentWord(newWord);
      const newGameWords = [...gameWords];
      newGameWords[maxAttempts - attempt] = newWord;
      setGameWords(newGameWords);
    }
  };

  const nextAttempt = () => {
    setCanCheck(prev => {
      const newChecks = [...prev];
      newChecks[attempt] = true;
      return newChecks;
    });
    const isWin = verifyWin();
    if (attempt <= 0 && !isWin) {
      setDefeat(true);
    }
    setAttempt((prev: number) => prev - 1);
    if (!win) setCurrentWord('');
  }

  const verifyWin = () => {
    const validation = currentWord.toLowerCase() === correctWord;
    if (validation) {
      setWin(true);
      return true;
    }
    return false;
  }

  // const verifyDefeat = () => {
  //   if (win) return false;
  //   const winValidation = currentWord.toLowerCase() !== correctWord;
  //   if (attempt <= 0 && winValidation) {
  //     setDefeat(true)
  //     return true;
  //   }
  //   return false;
  // }

  const resetTurn = () => {
    setAttempt(maxAttempts);
    setGameWords(fillGrid);
    setCurrentWord('');
    setDefeat(false);
    setWin(false);
    setCanCheck(initialChecks);
  };

  return (
    <div className="p-4 flex flex-col h-dvh items-center justify-between">
      <div className="flex flex-col gap-6">
        <header className="flex flex-col gap-1 items-center">
          <h1 className="text-4xl font-bold text-center text-gray-100">Guess the word</h1>
          <p className="text-center text-gray-300 text-xl">
            You have {' '}
            <code
              className="py-1 px-2 aspect-square text-white bg-gray-800 rounded-md font-semibold"
            >
              {attempt}
            </code>
            {' '} attempts left
          </p>
          <div className="flex flex-row gap-1 text-gray-300"><dt className="font-bold">Tip:</dt> <dd>{chosenWord.tip}</dd></div>

        </header>
        <WinDialog
          open={win}
          data={{ attempts: maxAttempts - attempt }}
          onNextRound={resetTurn}
        />

        <DefeatDialog
          open={defeat}
          onTryAgain={resetTurn}
        />

        <main className="max-w-2xl flex flex-col w-full space-y-4">
          {gameWords.map((word: string, index: number) => (
            <Row
              focused={index === attempt && !win}
              key={`row-${index}`}
              word={index === attempt ? currentWord : word}
              size={wordSize}
              correctWord={correctWord}
              checkWord={canCheck[index]}
            />
          )
          )}
        </main>
        <Keyboard
          disabled={defeat || win}
          onKeyPress={handleWordChange}
          onBackspace={handleBackspace}
          wordSize={wordSize} onConfirm={handleConfirm}
        />
      </div>
      <footer className="flex flex-col items-center justify-center">
        <span className="text-gray-300 text-sm">
          @2024 Defy. All rights reserved.
        </span>
      </footer>
    </div>
  );
}