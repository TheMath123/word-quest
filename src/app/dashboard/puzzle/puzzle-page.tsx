'use client'

import { usePuzzlesQuery } from "@/services/puzzle";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

export function PuzzlePage() {
  const { data } = usePuzzlesQuery();

  return <main className="container mx-auto p-4 space-y-6 grow">
    <DataTable title="Puzzles" columns={columns} data={data} />
  </main>
}