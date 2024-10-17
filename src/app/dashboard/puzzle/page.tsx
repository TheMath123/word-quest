import { fetchPuzzles } from "@/services/dashboard/puzzle";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { PuzzlePage } from "./components/puzzle-page";

export default async function Puzzle() {
  const data = await fetchPuzzles()
  return <main>
    {data ? <div className="container mx-auto py-10 p-4">
      <DataTable columns={columns} data={data} />
    </div> : null}
    <PuzzlePage />
  </main>
}