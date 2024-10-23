'use client'

import { useAlphabetsQuery } from "@/services/alphabet";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { Textarea } from "@/components/ui/textarea";

export function AlphabetPage() {
  const { data } = useAlphabetsQuery();

  return <main className="container mx-auto p-4 space-y-6">
    <DataTable title='Alphabets' columns={columns} data={data} />
    <h1 className="text-xl font-semibold">Notes</h1>
    <Textarea
      rows={10}
    />
  </main >
}