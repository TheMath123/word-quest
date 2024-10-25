import Link from "next/link";
import { TypeText, Puzzle } from "@mynaui/icons-react"

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4 p-4 items-center grow">
      <nav className="flex gap-4">
        <Link
          href="/dashboard/puzzle"
          className="aspect-square w-[100px] bg-blue-500 hover:bg-blue-700 flex items-center justify-center text-xl font-medium rounded-md"
          aria-label="Puzzle"
          title="Puzzle"
        >
          <Puzzle className="h-8 w-8" />
        </Link>
        <Link
          href="/dashboard/alphabet"
          className="aspect-square w-[100px] bg-blue-500 hover:bg-blue-700 flex items-center justify-center text-xl font-medium rounded-md"
          aria-label="Alphabet"
          title="Alphabet"
        >
          <TypeText className="h-8 w-8" />
        </Link>
      </nav>
    </div >
  );
}