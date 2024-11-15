import { getQueryClient } from "@/lib/react-query/query-client"
import { wordGuessListOptions } from "@/services/word-guess"
import { HydrationBoundary, dehydrate } from "@tanstack/react-query"
import { PuzzlePage } from "./puzzle-page"

export default async function Puzzle() {
  const queryClient = getQueryClient()

  void queryClient.prefetchQuery(wordGuessListOptions)

  return <HydrationBoundary state={dehydrate(queryClient)}>
    <PuzzlePage />
  </HydrationBoundary>
}