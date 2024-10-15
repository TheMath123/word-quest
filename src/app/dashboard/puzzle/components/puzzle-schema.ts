import { z } from "zod";
/*
  id               String           @id @default(cuid())
  word             String
  tip              String
  alphabetName       String
  createdAt        DateTime         @default(now())
  updatedAt        DateTime         @updatedAt
  PuzzleCompleted  PuzzleCompleted?
*/

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
});

export type PuzzleSchemaType = z.infer<typeof puzzleSchema>;
