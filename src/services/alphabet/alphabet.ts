import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { fetchAlphabets } from "./fetch";

export const alphabetOptions = queryOptions({
  queryKey: ["alphabet"],
  queryFn: async () => {
    return await fetchAlphabets();
  },
});

export const useAlphabetQuery = () => useSuspenseQuery(alphabetOptions);
