import { DPuzzle, DAlphabet } from "@/db/schema";
import { searchAlphabet } from "./alphabet";
import { fetchGame } from "./game/fetch";
import { searchPuzzle } from "./puzzle";
export class GameLoaderService {
  private readonly alphabetName = "Latin";

  async loadWord(options: {
    genNewWord?: boolean;
    newId?: string;
    currentWordId?: string | null;
  }): Promise<{
    puzzle: DPuzzle | null;
    alphabet: DAlphabet | null;
    wordSize: number;
    maxAttempts: number;
  }> {
    const { genNewWord = false, newId, currentWordId } = options;
    let dataPuzzle: DPuzzle | null = null;

    if (genNewWord) {
      dataPuzzle = await fetchGame(this.alphabetName);
    } else if (newId) {
      dataPuzzle = await searchPuzzle(newId);
    } else if (currentWordId) {
      dataPuzzle = await searchPuzzle(currentWordId);
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
