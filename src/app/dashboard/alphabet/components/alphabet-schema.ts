import { z } from "zod";

export const alphabetSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  characters: z
    .string()
    .min(19, 'Write at least 10 characters, split to semicolon ";"')
    .superRefine((value, context) => {
      const listValues = value.trim().split(";");
      if (listValues.length <= 8) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: "There must be at least 8 characters",
        });
      }
    }),
});

export type AlphabetSchemaType = z.infer<typeof alphabetSchema>;
