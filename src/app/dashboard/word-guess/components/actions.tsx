import { Dots } from "@mynaui/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EditPuzzle } from "./edit-puzzle";
import { dropdownButtonItemCss } from "@/components/table/actions/dropdown-button-item-css";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { deleteWordGuess, useWordGuessListQuery } from "@/services/word-guess";
import { DWordGuess } from "@/db/schema";

interface ActionsProps {
  data: DWordGuess;
}

export function Actions({ data }: ActionsProps) {
  const [loadingDelete, setLoadingDelete] = useState(false)
  const { refetch } = useWordGuessListQuery();

  const handleDelete = async () => {
    setLoadingDelete(true)
    const res = await deleteWordGuess(data.id)
    if (res?.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: res.error,
      });
      return;
    } else {
      toast({
        variant: "default",
        title: "Uh oh! Success!",
        description: res?.description,
      });
    }
    setLoadingDelete(false)
    refetch()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menu de ações</span>
          <Dots className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(data.id)}
        >
          Copy ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <EditPuzzle
            id={data.id}
          >
            <div className={dropdownButtonItemCss}>Edit</div>
          </EditPuzzle>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-500"
          onClick={() => handleDelete()}
          disabled={loadingDelete}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
