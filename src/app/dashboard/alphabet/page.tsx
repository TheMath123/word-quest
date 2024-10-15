import { Suspense } from "react";
// import { AlphabetLoading } from "./components/alphabet-loading";
import { AlphabetPage } from "./components/alphabet-page";

export default function Alphabet() {
  return <Suspense>
    <AlphabetPage />
  </Suspense>
}