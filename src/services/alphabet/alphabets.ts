import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { fetchAlphabets } from "./fetch";

export const alphabetsOptions = queryOptions({
  queryKey: ["alphabets"],
  queryFn: async () => {
    return await fetchAlphabets();
  },
});

export const useAlphabetsQuery = () => useSuspenseQuery(alphabetsOptions);
