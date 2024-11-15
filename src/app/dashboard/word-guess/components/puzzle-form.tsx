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
import { useState } from "react"
import { puzzleSchema, PuzzleSchemaType } from "./puzzle-schema"
import { NumberField } from "@/components/form/number-field"
import { updateWordGuess, createWordGuess, useWordGuessListQuery } from "@/services/word-guess"
import { DWordGuess } from "@/db/schema"

interface PuzzleFormProps {
  initialData?: DWordGuess | null;
  onClose?: () => void;
}

export function PuzzleForm({ initialData, onClose }: PuzzleFormProps) {
  const { refetch } = useWordGuessListQuery()
  const [loading, setLoading] = useState(false)
  const form = useForm<PuzzleSchemaType>({
    resolver: zodResolver(puzzleSchema),
    defaultValues: initialData ?? {
      word: "",
      tip: '',
      alphabetName: '',
      maxAttempts: 5,
    },
  })
  async function onSubmit(values: PuzzleSchemaType) {
    setLoading(true)
    const res = initialData?.id ?
      await updateWordGuess({ ...values, id: initialData.id }) :
      await createWordGuess({ ...values });

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
    refetch()
    onClose?.()
  }


  return <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <NameField name="word" label="Word" placeholder="Write the word to be discovered" />
      <NameField name="tip" label="Tip" placeholder="Write a short tip" />
      <NumberField name="maxAttempts" label="Max. Attempts" placeholder="Write a maximum attempts" />
      <AlphabetField />
      <Button type="submit" disabled={loading}>Save</Button>
    </form>
  </Form>

}