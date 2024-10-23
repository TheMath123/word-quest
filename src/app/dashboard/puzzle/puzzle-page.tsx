'use client'

import { usePuzzleQuery } from "@/services/puzzle";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

export function PuzzlePage() {
  const { data } = usePuzzleQuery();

  return <main className="container mx-auto p-4 space-y-6">
    <DataTable title="Puzzles" columns={columns} data={data} />
  </main>
}