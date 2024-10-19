import { z } from "zod";

export const chosenGameSchema = z.object({
  id: z.string().min(2, {
    message: "ID must be at least 2 characters.",
  }),
});

export type ChosenGameSchemaType = z.infer<typeof chosenGameSchema>;
