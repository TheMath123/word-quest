import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { fetchWordGuess } from "./fetch";
import { searchWordGuess } from "./search";

// Puzzles
export const wordGuessListOptions = queryOptions({
  queryKey: ["word-guess"],
  queryFn: async () => {
    return await fetchWordGuess();
  },
});

export const useWordGuessListQuery = () =>
  useSuspenseQuery(wordGuessListOptions);

// Puzzle
export const wordGuessOptions = (id: string) =>
  queryOptions({
    queryKey: ["word-guess", id],
    queryFn: async () => {
      return await searchWordGuess(id);
    },
  });

export const useWordGuessQuery = (id: string) =>
  useSuspenseQuery(wordGuessOptions(id));
