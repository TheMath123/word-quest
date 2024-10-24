import { getQueryClient } from "@/lib/react-query/query-client"
import { puzzlesOptions } from "@/services/puzzle"
import { HydrationBoundary, dehydrate } from "@tanstack/react-query"
import { PuzzlePage } from "./puzzle-page"

export default async function Puzzle() {
  const queryClient = getQueryClient()

  void queryClient.prefetchQuery(puzzlesOptions)

  return <HydrationBoundary state={dehydrate(queryClient)}>
    <PuzzlePage />
  </HydrationBoundary>
}