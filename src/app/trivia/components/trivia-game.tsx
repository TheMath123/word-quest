import { Trivia } from "@/@types/trivia";

interface TriviaGameProps {
  trivia: Trivia;
}

export function TriviaGame({ trivia }: TriviaGameProps) {

  return <div>
    <h1>Trivia Game</h1>
    <pre>
      <code>{JSON.stringify(trivia, null, 2)}</code>
    </pre>
  </div>
}