"use server";

import { ServiceResponse } from "@/@types/response";
import { deleteAlphabet as deleteAlphabetDB } from "@/model/alphabet";

export async function deleteAlphabet(id: string): Promise<ServiceResponse> {
  try {
    if (id === "cm2aki5kr0000dr8bmqumux98") {
      return { error: "It is not possible to delete the default alphabet." };
    }

    const alphabet = await deleteAlphabetDB(id);
    if (!alphabet) {
      return { error: "Alphabet not found" };
    }

    return { description: `Alphabet ${alphabet.name} deleted` };
  } catch (error) {
    console.error("error", error);
    return { error: "Problems deleting alphabet" };
  }
}
