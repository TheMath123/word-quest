'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form
} from "@/components/ui/form"
import { NameField } from "@/components/form"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  characters: z
    .string()
    .min(1, "Characters must have at least 1 character")
    .refine(
      (value) => value !== ";",
      "The string cannot be just ';'"
    )
    .refine(
      (value) => !value.split(";").some((part) => part === ""),
      "All characters must be separated by ';'"
    )
})

export default function Alphabet() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      characters: ""
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return <main>
    <h1>Alphabet</h1>

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <NameField />
        <NameField name="characters" label="Characters" placeholder="a;b;c;e;d;f;..." />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  </main>
}