export type TriviaType = "boolean" | "multiple";

export type TriviaDifficulty = "easy" | "medium" | "hard";

export interface Trivia {
  type: TriviaType;
  category: string;
  difficulty: TriviaDifficulty;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}
