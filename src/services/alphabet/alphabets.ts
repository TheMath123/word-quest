import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { fetchAlphabets } from "./fetch";
import { searchAlphabet } from "./search";

//Alphabets
export const alphabetsOptions = queryOptions({
  queryKey: ["alphabets"],
  queryFn: async () => {
    return await fetchAlphabets();
  },
});

export const useAlphabetsQuery = () => useSuspenseQuery(alphabetsOptions);

// Alphabet
export const alphabetOptions = (id?: string, name?: string) =>
  queryOptions({
    queryKey: ["alphabets", id],
    queryFn: async () => {
      return await searchAlphabet({ id, name });
    },
  });

export const useAlphabetQuery = () => useSuspenseQuery(alphabetsOptions);
