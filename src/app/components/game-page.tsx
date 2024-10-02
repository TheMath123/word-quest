
import words from '@/assets/words.json';
import { useLocalStorage } from "@/hooks/use-local-storage";
import { DefeatDialog, Footer, Keyboard, Row, WinDialog } from "@/components";
import { useEffect, useState } from 'react';
import Loading from '@/app/loading';

interface Word {
  id: string,
  word: string,
  tip: string,
  alphabet: string;
}

export function GamePage() {
  const [loading, setLoading] = useState(true);
  const maxAttempts = 5;
  const [wordID, setWordID] = useLocalStorage<string | undefined>('id');
  const [correctWord, setCorrectWord] = useState<Word | null>(null);
  const [wordSize, setWordSize] = useLocalStorage('sizew', 0);
  const [defeat, setDefeat] = useLocalStorage('defeat', false);
  const [win, setWin] = useLocalStorage('win', false);
  const initialChecks = Array(maxAttempts).fill(false);
  const [canCheck, setCanCheck] = useLocalStorage('checks', initialChecks);
  const [currentAttempt, setCurrentAttempt] = useLocalStorage('attempt', 0);
  const fillGrid = Array(maxAttempts).fill('');
  const [gameWords, setGameWords] = useLocalStorage<string[]>('game', fillGrid);
  const [currentWord, setCurrentWord] = useLocalStorage<string>('word', '');

  const chooseNewWord = () => {
    const chosenWord = randomNewWord();
    setCorrectWord(chosenWord);
    setWordSize(chosenWord.word.length);
  }

  const getWord = (id: string): Word | null => {
    return words.find(word => word.id === id) || null;
  }

  useEffect(() => {
    setLoading(false);
    if (wordID) {
      const chosenWord = getWord(wordID);
      if (chosenWord) {
        setCorrectWord(chosenWord);
        setWordSize(chosenWord.word.length);
        return;
      }
    }
    chooseNewWord()
  }, []);

  const randomNewWord = (): Word => {
    const rawWord = words[Math.floor(Math.random() * words.length)];
    setWordID(rawWord.id);
    return rawWord;
  }

  const handleBackspace = () => {
    if (currentWord.length > 0) {
      setCurrentWord((prev: string) => prev.slice(0, -1));
      const newGameWords = [...gameWords];
      newGameWords[currentAttempt] = currentWord.slice(0, -1);
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
      newGameWords[currentAttempt] = newWord;
      setGameWords(newGameWords);
    }
  };

  const nextAttempt = () => {
    setCanCheck(prev => {
      const newChecks = [...prev];
      newChecks[currentAttempt] = true;
      return newChecks;
    });
    const isWin = verifyWin();
    if (currentAttempt === maxAttempts - 1 && !isWin) {
      setDefeat(true);
    }
    setCurrentAttempt((prev: number) => prev + 1);
    if (!win) setCurrentWord('');
  }

  const verifyWin = () => {
    const validation = currentWord.toLowerCase() === correctWord?.word;
    if (validation) {
      setWin(true);
      return true;
    }
    return false;
  }

  const resetTurn = () => {
    setCurrentAttempt(0);
    setGameWords(fillGrid);
    setCurrentWord('');
    setDefeat(false);
    setWin(false);
    setCanCheck(initialChecks);
    chooseNewWord()
  };

  if (loading || !correctWord) return <Loading />

  return (
    <div className="p-4 flex flex-col items-center justify-between">
      <div className="flex flex-col gap-8 h-dvh justify-between md:justify-start pb-8">
        <header className="flex flex-col gap-1 items-center">
          <h1 className="text-4xl font-bold text-center text-foreground">Guess the word</h1>
          <p className="text-center text-foreground/80 text-xl">
            You have {' '}
            <code
              className="py-1 px-2 aspect-square text-foreground dark:text-white bg-gray-300 dark:bg-gray-800 rounded-md font-semibold"
            >
              {maxAttempts - currentAttempt}
            </code>
            {' '} attempts left
          </p>
          <p className="flex flex-row gap-1 text-foreground/80"><dt className="font-bold">Tip:</dt> <dd>{correctWord.tip ?? ''}</dd></p>

        </header>
        <WinDialog
          open={win}
          data={{ attempts: maxAttempts - currentAttempt }}
          onNextRound={resetTurn}
        />

        <DefeatDialog
          open={defeat}
          onTryAgain={resetTurn}
        />

        <main className="max-w-2xl min-h-fit flex flex-col w-full space-y-4">
          {gameWords.map((word: string, index: number) => (
            <Row
              focused={index === currentAttempt && !win}
              key={`row-${index}`}
              word={index === currentAttempt ? currentWord : word}
              size={wordSize}
              correctWord={correctWord.word}
              checkWord={canCheck[index]}
            />
          ))}
        </main>
        <Keyboard
          disabled={defeat || win}
          onKeyPress={handleWordChange}
          onBackspace={handleBackspace}
          wordSize={wordSize} onConfirm={handleConfirm}
        />
      </div>
      <Footer />
    </div>
  );
}