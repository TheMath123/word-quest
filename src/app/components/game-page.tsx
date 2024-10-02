import { useGame } from "@/context/game-context";
import Loading from "@/app/loading";
import { DefeatDialog, Footer, HowToPlay, Keyboard, Row, WinDialog } from "@/components";

export function GamePage() {
  const {
    maxAttempts,
    correctWord,
    wordSize,
    defeat,
    win,
    canCheck,
    currentAttempt,
    gameWords,
    currentWord,
    handleBackspace,
    handleConfirm,
    handleWordChange,
    resetTurn,
  } = useGame();

  if (!correctWord) return <Loading />

  return (
    <div className="flex flex-col items-center justify-between p-4 min-h-fit h-full sm:h-dvh">
      <div className="flex flex-1 flex-col gap-8 justify-between md:justify-start pb-8 h-dvh sm:h-full">
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
          <HowToPlay />
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
          className="mb-6"
          disabled={defeat || win}
          onKeyPress={handleWordChange}
          onBackspace={handleBackspace}
          wordSize={wordSize}
          onConfirm={handleConfirm}
        />
      </div>
      <Footer />
    </div>
  );
}