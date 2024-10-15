"use server";

import { getAlphabet } from "@/model/alphabet";
import { Alphabet } from "@prisma/client";

interface ErroResponse {
  error: string;
}
export async function searchAlphabet(
  name: string
): Promise<Alphabet | ErroResponse> {
  try {
    const alphabet = await getAlphabet(name);
    if (!alphabet) {
      return { error: "Alphabet not exists" };
    }

    return alphabet;
  } catch (error) {
    console.error("error", error);
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "An unknown error occurred" };
    }
  }
}
