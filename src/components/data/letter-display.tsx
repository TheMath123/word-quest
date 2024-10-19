import { cn } from "@/lib/cn";
import { useState } from "react";

interface LetterDisplayProps {
  character: string;
}
export function LetterDisplay({ character }: LetterDisplayProps) {
  const [isCopied, setIsCopied] = useState(false)
  const handleCopy = () => {
    setIsCopied(true)
    navigator.clipboard.writeText(character)
    setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }
  return <div className="relative">
    <div className={cn(
      isCopied ? 'opacity-100 block' : 'opacity-0 hidden',
      "absolute left-6 top-6 bg-gray-950 border p-2 whitespace-nowrap rounded z-10 transition-opacity duration-300 pointer-events-none")}
    >
      Copied {character}!
    </div>
    <div
      onClick={handleCopy}
      className="flex items-center justify-center w-8 h-8 rounded aspect-square text-sm bg-gray-200 dark:bg-gray-800"
    >
      {character}
    </div>
  </div>
}