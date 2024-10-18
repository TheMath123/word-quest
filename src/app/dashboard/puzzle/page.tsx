import { fetchPuzzles } from "@/services/puzzle";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

export default async function Puzzle() {
  const data = await fetchPuzzles()
  return <main className="container mx-auto p-4 space-y-6">
    <DataTable title="Puzzles" columns={columns} data={data} />
  </main>
}