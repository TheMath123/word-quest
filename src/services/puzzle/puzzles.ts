import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { fetchPuzzles } from "./fetch";
import { searchPuzzle } from "./search";

// Puzzles
export const puzzlesOptions = queryOptions({
  queryKey: ["puzzles"],
  queryFn: async () => {
    return await fetchPuzzles();
  },
});

export const usePuzzlesQuery = () => useSuspenseQuery(puzzlesOptions);

// Puzzle
export const puzzleOptions = (id: string) =>
  queryOptions({
    queryKey: ["puzzles", id],
    queryFn: async () => {
      return await searchPuzzle(id);
    },
  });

export const usePuzzleQuery = (id: string) =>
  useSuspenseQuery(puzzleOptions(id));

// // Update puzzle
// export const useUpdatePuzzleMutation = () =>
//   useMutation({
//     mutationFn: updatePuzzle,
//     onSuccess(variables) {
//       queryClient.cancelQueries(puzzlesOptions);

//       const puzzleCached = queryClient.getQueryData(puzzlesOptions.queryKey);

//       if (puzzleCached) {
//         queryClient.setQueryData(
//           puzzlesOptions.queryKey,
//           puzzleCached.map((item) => {
//             if (item && item.id === variables.id) {
//               return variables;
//             }
//             return item;
//           }) as DPuzzle[]
//         );
//       }
//     },
//     onError(error) {
//       console.error(error);
//     },
//   });

// // Create puzzle
// export const useCreatePuzzleMutation = () =>
//   useMutation({
//     mutationFn: createPuzzle,
//     onSuccess(variables) {
//       queryClient.cancelQueries(puzzlesOptions);

//       const puzzleCached = queryClient.getQueryData(puzzlesOptions.queryKey);

//       if (puzzleCached) {
//         queryClient.setQueryData(
//           puzzlesOptions.queryKey,
//           puzzleCached.map((item) => {
//             if (item && item.id === id) {
//               return variables;
//             }
//             return item;
//           }) as DPuzzle[]
//         );
//       }
//     },
//     onError(error) {
//       console.error(error);
//     },
//   });
