'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form
} from "@/components/ui/form"
import { NameField } from "@/components/form"
import { toast } from "@/hooks/use-toast"
import { createNewAlphabet } from "@/services/dashboard/alphabet"
import { AlphabetSchemaType, alphabetSchema } from "./alphabet-schema"
import { useState } from "react"

export function AlphabetPage() {
  const [loading, setLoading] = useState(false)
  const form = useForm<AlphabetSchemaType>({
    resolver: zodResolver(alphabetSchema),
    defaultValues: {
      name: "",
      characters: ''
    },
  })

  async function onSubmit(values: AlphabetSchemaType) {
    setLoading(true)
    const res = await createNewAlphabet({ ...values })
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
    <h1 className="text-xl font-bold">Create New Alphabet</h1>

    <div className="w-full max-w-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <NameField name="name" placeholder="Write Alphabet name" />
          <NameField name="characters" label="Characters" placeholder="a;b;c;e;d;f;..." />
          <Button type="submit" disabled={loading}>Submit</Button>
        </form>
      </Form>
    </div>
  </main>
}