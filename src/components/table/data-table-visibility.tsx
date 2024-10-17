import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Table } from "@tanstack/react-table"

interface DataTableVisibilityProps<TData> {
  table: Table<TData>
}

export function DataTableVisibility<TData>({
  table,
}: DataTableVisibilityProps<TData>) {
  const excludeColumns = ["select", "actions", "created_at", "updated_at"];

  return <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" className="ml-auto">
        Columns
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      {table
        .getAllColumns()
        .filter(
          (column) => column.getCanHide()
        )
        .map((column) => {
          if (excludeColumns.includes(column.id)) {
            return null;
          }
          return (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={column.getIsVisible()}
              onCheckedChange={(value) =>
                column.toggleVisibility(!!value)
              }
            >
              {column.id}
            </DropdownMenuCheckboxItem>
          )
        })}
    </DropdownMenuContent>
  </DropdownMenu>
}