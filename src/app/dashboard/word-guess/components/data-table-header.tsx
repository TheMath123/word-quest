import { useEffect, useState } from "react";
import { DataTableFacetedFilter } from "@/components/table/data-table-faceted-filter";
import { DataTableSearch } from "@/components/table/data-table-search";
import { Button } from "@/components/ui/button";
import { X } from "@mynaui/icons-react";
import { EditPuzzle } from "./edit-puzzle";
import { DataTableVisibility } from "@/components/table/data-table-visibility";
import { Table } from "@tanstack/react-table";
import { fetchAlphabets } from "@/services/alphabet";
import { DAlphabet } from "@/db/schema";

interface DataTableHeaderProps<TData> {
  table: Table<TData>;
  title?: string,
  refetch: () => void;
}

export function DataTableHeader<TData>({ table, title, refetch }: DataTableHeaderProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const [alphabets, setAlphabets] = useState<DAlphabet[]>([])


  useEffect(() => {
    const fillList = async () => {
      const alphabets = await fetchAlphabets()
      if (alphabets && alphabets.length > 0) {
        setAlphabets(alphabets)
      }
    }

    fillList()
  }, []);

  return <header className="flex flex-row justify-between items-center gap-2">
    <DataTableSearch table={table} columnKey="word" />
    <h1 className="text-xl font-semibold hidden md:block">{title}</h1>
    <div className="space-x-4 flex items-center">
      {isFiltered && (
        <Button
          variant="ghost"
          onClick={() => table.resetColumnFilters()}
          className="h-8 px-2 lg:px-3"
        >
          Reset
          <X />
        </Button>
      )}
      {table.getColumn("alphabetName") && (
        <DataTableFacetedFilter
          column={table.getColumn("alphabetName")}
          title="Alphabet"
          options={alphabets.map((v) => ({ label: v.name, value: v.name }))}
        />
      )}
      <EditPuzzle />
      <Button variant="outline" onClick={() => refetch()}>Refresh</Button>

      <DataTableVisibility table={table} />
    </div>
  </header>
}