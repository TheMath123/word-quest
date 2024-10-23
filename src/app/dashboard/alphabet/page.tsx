import { getQueryClient } from "@/lib/react-query/query-client"
import { alphabetOptions } from "@/services/alphabet"
import { HydrationBoundary, dehydrate } from "@tanstack/react-query"
import { AlphabetPage } from "./alphabet-page"

export default function Alphabet() {
  const queryClient = getQueryClient()

  void queryClient.prefetchQuery(alphabetOptions)

  return <HydrationBoundary state={dehydrate(queryClient)}>
    <AlphabetPage />
  </HydrationBoundary>
}