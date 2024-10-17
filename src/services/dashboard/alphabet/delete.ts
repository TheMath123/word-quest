"use server";

import { ServiceResponse } from "@/@types/response";
import { deleteAlphabet as deleteAlphabetDB } from "@/model/alphabet";

export async function deleteAlphabet(id: string): Promise<ServiceResponse> {
  try {
    const alphabet = await deleteAlphabetDB(id);
    console.log("alphabet", alphabet);
    if (!alphabet) {
      return { error: "Alphabet not found" };
    }

    return { description: `Alphabet ${alphabet.name} deleted` };
  } catch (error) {
    console.error("error", error);
    return { error: "Problems deleting alphabet" };
  }
}
