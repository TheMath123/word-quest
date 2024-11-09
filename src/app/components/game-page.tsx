'use client'

import { GameProvider, useGame } from "@/context/game-context";
import Loading from "@/app/loading";
import { DefeatDialog, HowToPlay, Keyboard, Row, WinDialog } from "@/components";
import { ChosenGame } from "./chosen-game";
import { useUser } from "@/hooks/use-profile";

function GameContainer() {
  const {
    state: { alphabet, canCheck, currentAttempt, currentWord, defeat, gameWords, puzzle, win, wordSize },
    maxAttempts,
    handleBackspace,
    handleConfirm,
    handleWordChange,
    nextTurn,
  } = useGame();

  if (!puzzle) return <Loading />

  return (
    <div className="flex flex-col gap-8 justify-start items-center p-4">
      <header className="flex flex-col gap-1 items-center">
        <h1 className="text-2xl font-bold text-center text-foreground">Guess the word</h1>
        <p className="text-center text-foreground/80 text-xl">
          You have {' '}
          <code
            className="py-1 px-2 aspect-square text-foreground dark:text-white bg-gray-300 dark:bg-gray-800 rounded-md font-semibold"
          >
            {maxAttempts - currentAttempt}
          </code>
          {' '} attempts left
        </p>
        <p className="flex flex-row gap-1 text-foreground/80"><dt className="font-bold">Tip:</dt> <dd>{puzzle.tip ?? ''}</dd></p>
        <HowToPlay />
      </header>

      <WinDialog
        open={win}
        data={{ attempts: maxAttempts - currentAttempt }}
        onNextRound={nextTurn}
      />

      <DefeatDialog
        open={defeat}
        onTryAgain={nextTurn}
      />

      <main className="max-w-2xl min-h-fit flex flex-col w-full space-y-4">
        {gameWords.map((word: string, index: number) => (
          <Row
            focused={index === currentAttempt && !win}
            key={`row-${index}`}
            word={index === currentAttempt ? currentWord : word}
            size={wordSize}
            correctWord={puzzle.word}
            checkWord={canCheck[index]}
            alphabet={alphabet}
          />
        ))}
      </main>
      <Keyboard
        alphabet={alphabet}
        className="mb-6"
        disabled={defeat || win}
        onKeyPress={handleWordChange}
        onBackspace={handleBackspace}
        wordSize={wordSize}
        onConfirm={handleConfirm}
      />
    </div>

  );
}
export function GamePage() {
  const user = useUser()
  return <GameProvider>
    {user ? <ChosenGame /> : null}
    <GameContainer />
  </GameProvider>
}