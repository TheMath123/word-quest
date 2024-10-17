'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form
} from "@/components/ui/form"
import { NameField } from "@/components/form"
import { toast } from "@/hooks/use-toast"
import { AlphabetField } from "@/components/form/alphabet-field.tsx"
import { createPuzzle } from "@/services/dashboard/puzzle/create"
import { useState } from "react"
import { PuzzleSchemaType, puzzleSchema } from "./puzzle-schema"
import { Puzzle } from "@prisma/client"
import { updatePuzzle } from "@/services/dashboard/puzzle"

interface PuzzleFormProps {
  initialData?: Puzzle | null;
  onClose?: () => void;
}

export function PuzzleForm({ initialData, onClose }: PuzzleFormProps) {
  const [loading, setLoading] = useState(false)
  const form = useForm<PuzzleSchemaType>({
    resolver: zodResolver(puzzleSchema),
    defaultValues: initialData ?? {
      word: "",
      tip: '',
      alphabetName: '',
    },
  })

  async function onSubmit(values: PuzzleSchemaType) {
    setLoading(true)
    const res = initialData?.id ?
      await updatePuzzle({ ...values, id: initialData.id }) :
      await createPuzzle({ ...values });

    if (res?.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: res.error,
      });
      setLoading(false)
      return;
    } else {
      toast({
        variant: "default",
        title: "Uh oh! Success!",
        description: res?.description,
      });
    }
    form.reset()
    onClose?.()
  }

  return <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <NameField name="word" label="Word" placeholder="Write the word to be discovered" />
      <NameField name="tip" label="Tip" placeholder="Write a short tip" />
      <AlphabetField />
      <Button type="submit" disabled={loading}>Save</Button>
    </form>
  </Form>

}