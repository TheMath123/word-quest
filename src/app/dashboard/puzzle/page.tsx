'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form
} from "@/components/ui/form"
import { NameField } from "@/components/form"
import { toast } from "@/hooks/use-toast"
import { PuzzleSchemaType, puzzleSchema } from "./puzzle-schema"
import { AlphabetField } from "@/components/form/alphabet-field.tsx"
import { createNewPuzzle } from "@/services/dashboard/puzzle/create-new-puzzle"
import { useState } from "react"

export default function Puzzle() {
  const [loading, setLoading] = useState(false)
  const form = useForm<PuzzleSchemaType>({
    resolver: zodResolver(puzzleSchema),
    defaultValues: {
      word: "",
      tip: '',
      alphabetName: '',
    },
  })

  async function onSubmit(values: PuzzleSchemaType) {
    setLoading(true)
    const res = await createNewPuzzle({ ...values })
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
  }

  return <main className="p-4 flex flex-col gap-4 items-center justify-start">
    <h1 className="text-xl font-bold">Create New Puzzle</h1>

    <div className="w-full max-w-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <NameField name="word" label="Word" placeholder="Write the word to be discovered" />
          <NameField name="tip" label="Tip" placeholder="Write a short tip" />
          <AlphabetField />
          <Button type="submit" disabled={loading}>Submit</Button>
        </form>
      </Form>
    </div>
  </main>
}