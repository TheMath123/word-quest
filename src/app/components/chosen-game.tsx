import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ChosenGameForm } from "./chosen-game-form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Wrench } from "@mynaui/icons-react";
import { DialogDescription } from "@radix-ui/react-dialog";

export function ChosenGame() {
  const [open, setOpen] = useState(false)

  return (<Dialog open={open} onOpenChange={setOpen} >
    <DialogTrigger asChild>
      <Button
        variant='outline'
        className="absolute right-4 top-4 aspect-square p-0 h-10"
      >
        <Wrench className="h-5 w-5" />
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogTitle>
        Choose the puzzle
      </DialogTitle>
      <DialogDescription>
        Enter the ID of the puzzle you want to play.
      </DialogDescription>
      <ChosenGameForm onClose={(() => setOpen(false))} />
    </DialogContent>
  </Dialog>)
}