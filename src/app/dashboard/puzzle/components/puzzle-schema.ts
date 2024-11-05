import { z } from "zod";

export const puzzleSchema = z.object({
  word: z.string().min(3, {
    message: "Word must be at least 3 characters.",
  }),
  tip: z.string().min(10, {
    message: "Tip must be at least 10 characters.",
  }),
  alphabetName: z.string().min(2, {
    message: "Select alphabet.",
  }),
  maxAttempts: z
    .string()
    .transform((data: string) => Number(data))
    .pipe(
      z
        .number()
        .min(1, {
          message: "Max attempts must be at least 1.",
        })
        .max(10, {
          message: "Max attempts must be at most 10.",
        })
    ),
});

export type PuzzleSchemaType = z.infer<typeof puzzleSchema>;
