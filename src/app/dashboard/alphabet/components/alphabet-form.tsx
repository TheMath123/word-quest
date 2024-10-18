'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form
} from "@/components/ui/form"
import { NameField } from "@/components/form"
import { toast } from "@/hooks/use-toast"
import { createAlphabet, updateAlphabet } from "@/services/alphabet"
import { AlphabetSchemaType, alphabetSchema } from "./alphabet-schema"
import { useState } from "react"
import { Alphabet } from "@prisma/client"

interface AlphabetFormProps {
  initialData?: Alphabet | null;
  onClose?: () => void;
}

export function AlphabetForm({ initialData, onClose }: AlphabetFormProps) {
  const [loading, setLoading] = useState(false)
  const form = useForm<AlphabetSchemaType>({
    resolver: zodResolver(alphabetSchema),
    defaultValues: initialData ?? {
      name: "",
      characters: ''
    },
  })

  async function onSubmit(values: AlphabetSchemaType) {
    setLoading(true)
    const res = initialData?.id ?
      await updateAlphabet({
        ...values,
        id: initialData?.id
      }) :
      await createAlphabet({ ...values });

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
      <NameField name="name" placeholder="Write Alphabet name" />
      <NameField name="characters" label="Characters" placeholder="a;b;c;e;d;f;..." />
      <Button type="submit" disabled={loading}>Submit</Button>
    </form>
  </Form>
}