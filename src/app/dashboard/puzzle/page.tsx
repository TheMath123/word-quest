import { fetchPuzzles } from "@/services/dashboard/puzzle";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { EditPuzzle } from "./components/edit-puzzle";

export default async function Puzzle() {
  const data = await fetchPuzzles()
  return <main className="container mx-auto p-4 space-y-6">
    <EditPuzzle />
    {data ? <div className="">
      <DataTable columns={columns} data={data} />
    </div> : null}
  </main>
}