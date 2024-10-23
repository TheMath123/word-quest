import { getQueryClient } from "@/lib/react-query/query-client"
import { puzzleOptions } from "@/services/puzzle"
import { HydrationBoundary, dehydrate } from "@tanstack/react-query"
import { PuzzlePage } from "./puzzle-page"

export default async function Puzzle() {
  const queryClient = getQueryClient()

  void queryClient.prefetchQuery(puzzleOptions)

  return <HydrationBoundary state={dehydrate(queryClient)}>
    <PuzzlePage />
  </HydrationBoundary>
}