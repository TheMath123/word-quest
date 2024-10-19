
import { fetchAlphabets } from "@/services/alphabet";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { Textarea } from "@/components/ui/textarea";

export default async function Puzzle() {
  const data = await fetchAlphabets()
  return <main className="container mx-auto p-4 space-y-6">
    <DataTable title='Alphabets' columns={columns} data={data} />
    <div className="space-y-2">
      <h1 className="text-xl font-semibold">Notes</h1>
      <Textarea
        rows={10}
      />
    </div>
  </main>
}