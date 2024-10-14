'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form
} from "@/components/ui/form"
import { NameField } from "@/components/form"
import { toast } from "@/hooks/use-toast"
import createNewAlphabet from "@/services/dashboard/alphabet/create-new-alphabet"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  characters: z
    .string().min(19, 'Write at least 10 characters, split to semicolon ";"')
    .superRefine(
      (value, context) => {
        const listValues = value.trim().split(';')
        console.log('listValues', listValues);
        if (listValues.length <= 8) {
          context.addIssue({
            code: z.ZodIssueCode.custom,
            message: "There must be at least 8 characters",
          })
        }
      })
})

export default function Alphabet() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      characters: ''
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {

    const res = await createNewAlphabet({ ...values })
    console.log('res', res);
    if (res?.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: res.error,
      });
      return
    }
    toast({
      variant: "default",
      title: "Uh oh! Success!",
      description: res?.description,
    });
  }

  return <main className="p-4 flex flex-col gap-4 items-center justify-start">
    <h1 className="text-xl font-bold">Alphabet</h1>

    <div className="w-full max-w-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <NameField name="name" placeholder="Write Alphabet name" />
          <NameField name="characters" label="Characters" placeholder="a;b;c;e;d;f;..." />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  </main>
}