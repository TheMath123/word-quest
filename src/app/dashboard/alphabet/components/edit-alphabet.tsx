'use client';

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alphabet, } from "@prisma/client";
import { useEffect, useState } from "react";
import { AlphabetForm } from "./alphabet-form";
import { searchAlphabet } from "@/services/alphabet";
import { EditLoading } from "./edit-loading";

interface EditAlphabetProps {
  id?: string;
  children?: React.ReactNode;
}

export function EditAlphabet({ id, children }: EditAlphabetProps) {
  const message = id ? "Edit Alphabet" : "Create New Alphabet";
  const [data, setData] = useState<Alphabet | null>(null)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const data = await searchAlphabet({ id });
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
        <Button variant='outline'>Add alphabet</Button>
      }
    </DialogTrigger>
    <DialogContent>
      <DialogTitle>
        {message}
      </DialogTitle>
      {loading ? <EditLoading /> : <AlphabetForm initialData={data} onClose={(() => setOpen(false))} />}
    </DialogContent>
  </Dialog>
}