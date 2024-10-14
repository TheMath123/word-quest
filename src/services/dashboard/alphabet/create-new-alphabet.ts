"use server";

import { Role } from "@/@types/role";
import { AlphabetDTO } from "@/dtos";
import { auth } from "@/lib/auth";
import { getAlphabet, createAlphabet } from "@/model/alphabet";

interface AlphabetResponse {
  description?: string;
  error?: string;
}

export default async function createNewAlphabet(
  data: AlphabetDTO
): Promise<AlphabetResponse> {
  try {
    const session = await auth();

    if (!session) {
      return { error: "You are not authenticated, please log in." };
    }

    if (session?.user.role !== Role.ADMIN) {
      return { error: "👮 Unauthorized user" };
    }

    const alphabetExists = await getAlphabet(data.name);
    if (alphabetExists) {
      return { error: "Alphabet already exists" };
    }

    const alphabet = await createAlphabet(data.name, data.characters);
    console.log("alphabet", alphabet);

    return { description: "Alphabet created" };
  } catch (error) {
    console.error("error", error);
    return { error: "Name and characters are required" };
  }
}
