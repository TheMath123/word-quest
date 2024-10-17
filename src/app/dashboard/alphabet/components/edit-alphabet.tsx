'use client';

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alphabet, } from "@prisma/client";
import { useEffect, useState } from "react";
import { AlphabetForm } from "./alphabet-form";
import { searchAlphabet } from "@/services/dashboard/alphabet";

interface EditAlphabetProps {
  id?: string;
  children?: React.ReactNode;
}

export function EditAlphabet({ id, children }: EditAlphabetProps) {
  const message = id ? "Edit Alphabet" : "Create New Alphabet";
  const [data, setData] = useState<Alphabet | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      const data = await searchAlphabet({ id });
      console.log('data', data);
      setData(data);
    }

    fetchData()
  }, []);

  return <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      {id && children ?
        children :
        <Button variant='outline'>Add alphabet</Button>
      }
    </DialogTrigger>
    <DialogContent>
      <DialogTitle>
        {message}
      </DialogTitle>
      <AlphabetForm initialData={data} onClose={(() => setOpen(false))} />
    </DialogContent>
  </Dialog>
}