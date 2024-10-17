"use server";

import { getAlphabet } from "@/model/alphabet";
import { Alphabet } from "@prisma/client";

export async function searchAlphabet(name: string): Promise<Alphabet | null> {
  try {
    const alphabet = await getAlphabet(name);
    if (!alphabet) {
      return null;
    }

    return alphabet;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}
