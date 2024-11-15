import { fetchTrivia } from "@/services/trivia/fetch";
import { TriviaGame } from "./components/trivia-game";
import { ProfileHeader } from "@/components/profile/profile-header";

export async function TriviaPage() {
  const trivia = await fetchTrivia();
  if (!trivia) {
    return <div>Trivia not found!</div>;
  }
  return <main className="relative h-full">
    <ProfileHeader />
    <TriviaGame trivia={trivia} />
  </main>
}