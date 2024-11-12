'use client'

import { useWordGuessListQuery } from "@/services/word-guess";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

export function PuzzlePage() {
  const { data, refetch } = useWordGuessListQuery();

  return <main className="container mx-auto p-4 space-y-6 grow">
    <DataTable title="Word Guess" columns={columns} data={data} refetch={refetch} />
  </main>
}