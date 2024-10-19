import { Table } from "@tanstack/react-table";
import { Input } from "../ui/input";

interface DataTableSearchProps<TData> {
  table: Table<TData>
  placeholder?: string;
  columnKey: string;
}

export function DataTableSearch<TData>({ table, columnKey, placeholder }: DataTableSearchProps<TData>) {
  return <div className="flex items-center py-4">
    <Input
      placeholder={placeholder ?? `Filter ${columnKey}...`}
      value={(table.getColumn(columnKey)?.getFilterValue() as string) ?? ""}
      onChange={(event) =>
        table.getColumn(columnKey)?.setFilterValue(event.target.value)
      }
      className="max-w-sm"
    />
  </div>
}