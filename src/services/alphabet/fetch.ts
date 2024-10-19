"use server";

import { getAlphabets } from "@/model/alphabet";
import { Alphabet } from "@prisma/client";

export async function fetchAlphabets(): Promise<Alphabet[]> {
  try {
    const alphabets = await getAlphabets();
    if (!alphabets) {
      return [];
    }

    return alphabets;
  } catch (error) {
    console.error("error", error);
    return [];
  }
}
