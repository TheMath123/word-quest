import { Suspense } from "react";
import { PuzzlePage } from "./components/puzzle-page";
// import { PuzzleLoading } from "./components/puzzle-loading";

export default function Puzzle() {
  return <Suspense>
    <PuzzlePage />
  </Suspense>
}