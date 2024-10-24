"use server";

import { DAlphabet } from "@/db/schema";
import { getAlphabets } from "@/model/alphabet";

export async function fetchAlphabets(): Promise<DAlphabet[]> {
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
