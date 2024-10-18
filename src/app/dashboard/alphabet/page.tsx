
import { fetchAlphabets } from "@/services/alphabet";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";

export default async function Puzzle() {
  const data = await fetchAlphabets()
  return <main className="container mx-auto p-4 space-y-6">
    <DataTable title='Alphabets' columns={columns} data={data} />
  </main>
}