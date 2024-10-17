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
import { Puzzle } from "@prisma/client";

interface ActionsProps {
  data: Puzzle;
}

export function Actions({ data }: ActionsProps) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menu de ações</span>
          <Dots className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(data.id)}
        >
          Copiar ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem className="text-destructive">
          Arquivar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
