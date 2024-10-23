import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { fetchPuzzles } from "./fetch";

export const puzzleOptions = queryOptions({
  queryKey: ["puzzle"],
  queryFn: async () => {
    return await fetchPuzzles();
  },
});

export const usePuzzleQuery = () => useSuspenseQuery(puzzleOptions);
