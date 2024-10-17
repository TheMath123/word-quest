'use client';

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PuzzleForm } from "./puzzle-form";
import { Button } from "@/components/ui/button";
import { searchPuzzle } from "@/services/dashboard/puzzle";
import { Puzzle } from "@prisma/client";
import { useEffect, useState } from "react";

interface EditPuzzleProps {
  id?: string;
  children?: React.ReactNode;
}

export function EditPuzzle({ id, children }: EditPuzzleProps) {
  const message = id ? "Edit Puzzle" : "Create New Puzzle";
  const [data, setData] = useState<Puzzle | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      const data = await searchPuzzle(id);
      setData(data);
    }

    fetchData()
  }, []);

  return <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      {id && children ?
        children :
        <Button>Add puzzle</Button>
      }
    </DialogTrigger>
    <DialogContent>
      <DialogTitle>
        {message}
      </DialogTitle>
      <PuzzleForm initialData={data} onClose={(() => setOpen(false))} />
    </DialogContent>
  </Dialog>
}