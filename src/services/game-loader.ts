import { DWordGuess, DAlphabet } from "@/db/schema";
import { searchAlphabet } from "./alphabet";
import { fetchGame } from "./game/fetch";
import { searchWordGuess } from "./word-guess";
export class GameLoaderService {
  private readonly alphabetName = "Latin";

  async loadWord(options: {
    genNewWord?: boolean;
    newId?: string;
    currentWordId?: string | null;
  }): Promise<{
    puzzle: DWordGuess | null;
    alphabet: DAlphabet | null;
    wordSize: number;
    maxAttempts: number;
  }> {
    const { genNewWord = false, newId, currentWordId } = options;
    let dataPuzzle: DWordGuess | null = null;

    if (genNewWord) {
      dataPuzzle = await fetchGame(this.alphabetName);
    } else if (newId) {
      dataPuzzle = await searchWordGuess(newId);
    } else if (currentWordId) {
      dataPuzzle = await searchWordGuess(currentWordId);
    } else {
      dataPuzzle = await fetchGame(this.alphabetName);
    }

    if (!dataPuzzle) {
      return { puzzle: null, alphabet: null, wordSize: 0, maxAttempts: 0 };
    }

    const dataAlphabet = await searchAlphabet({
      name: dataPuzzle.alphabetName,
    });
    const wordSize = dataPuzzle.word?.length ?? 0;
    const maxAttempts = dataPuzzle.maxAttempts ?? 0;

    return {
      puzzle: dataPuzzle,
      alphabet: dataAlphabet,
      wordSize,
      maxAttempts,
    };
  }
}
