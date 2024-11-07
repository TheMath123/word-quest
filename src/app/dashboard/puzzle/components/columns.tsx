"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Actions } from "./actions"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "@mynaui/icons-react"
import { Checkbox } from "@/components/ui/checkbox"
import { DPuzzle } from "@/db/schema"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<DPuzzle>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: 'ID'
  },
  {
    accessorKey: "word",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Word
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "tip",
    header: "Tip",
  },
  {
    accessorKey: "alphabetName",
    header: "Alphabet",
  },
  {
    accessorKey: "maxAttempts",
    header: "Max Attempts",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: (row) => {
      const data = row.getValue() as string
      return new Date(data).toLocaleString('pt-br')
    }
  },
  {
    accessorKey: "createdAt",
    header: "Create At",
    cell: (row) => {
      const data = row.getValue() as string
      return new Date(data).toLocaleString('pt-br')
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;

      return <Actions data={data} />;
    },
  },
]
