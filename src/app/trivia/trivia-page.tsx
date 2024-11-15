import { fetchTrivia } from "@/services/trivia/fetch";
import { TriviaGame } from "./components/trivia-game";

export async function TriviaPage() {
  const trivia = await fetchTrivia();
  if (!trivia) {
    return <div>Trivia not found!</div>;
  }
  return <TriviaGame trivia={trivia} />
}