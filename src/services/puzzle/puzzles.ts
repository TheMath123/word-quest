import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { fetchPuzzles } from "./fetch";

export const puzzlesOptions = queryOptions({
  queryKey: ["puzzles"],
  queryFn: async () => {
    return await fetchPuzzles();
  },
});

export const usePuzzlesQuery = () => useSuspenseQuery(puzzlesOptions);
