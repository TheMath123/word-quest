'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form
} from "@/components/ui/form"
import { NameField } from "@/components/form"
import { useState } from "react"
import { ChosenGameSchemaType, chosenGameSchema } from "./chosen-game-schema"
import { searchWordGuess } from "@/services/word-guess"
import { useGame } from "@/context/game-context"
import { toast } from "@/hooks/use-toast"

interface ChosenGameFormProps {
  onClose?: () => void;
}

export function ChosenGameForm({ onClose }: ChosenGameFormProps) {
  const [loading, setLoading] = useState(false)
  const { changePuzzle } = useGame()
  const form = useForm<ChosenGameSchemaType>({
    resolver: zodResolver(chosenGameSchema),
    defaultValues: {
      id: "",
    },
  })

  async function onSubmit(values: ChosenGameSchemaType) {
    setLoading(true)
    const res = await searchWordGuess(values.id)
    if (res) {
      changePuzzle(values.id);
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! =(",
        description: 'Puzzle does not exist, or wrong identification',
      });
      setLoading(false)
      return;
    }
    form.reset()
    onClose?.()
  }

  return <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <NameField name="id" label="ID" placeholder="Enter the puzzle ID" />
      <Button type="submit" disabled={loading}>Play</Button>
    </form>
  </Form>
}