'use client';

import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { PuzzleForm } from "./puzzle-form";
import { Button } from "@/components/ui/button";
import { searchWordGuess } from "@/services/word-guess";
import { useEffect, useState } from "react";
import { EditLoading } from "./edit-loading";
import { DWordGuess } from "@/db/schema";

interface EditPuzzleProps {
  id?: string;
  children?: React.ReactNode;
}

export function EditPuzzle({ id, children }: EditPuzzleProps) {
  const message = id ? "Edit Puzzle" : "Create New Puzzle";
  const [data, setData] = useState<DWordGuess | null>(null)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const data = await searchWordGuess(id);
        setData(data);
      }
      setLoading(false)
    }

    fetchData()
  }, []);

  return <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      {id && children ?
        children :
        <Button variant='outline'>Add puzzle</Button>
      }
    </DialogTrigger>
    <DialogContent>
      <DialogTitle>
        {message}
      </DialogTitle>
      {loading ? <EditLoading /> : <PuzzleForm initialData={data} onClose={(() => setOpen(false))} />}
      <DialogDescription />
    </DialogContent>
  </Dialog>
}