"use server";

import { ServiceResponse } from "@/@types/response";
import { PuzzleUpdateDTO } from "@/dtos";
import { updatePuzzle as updatePuzzleDB } from "@/model/puzzle";

export async function updatePuzzle(
  data: PuzzleUpdateDTO
): Promise<ServiceResponse> {
  try {
    await updatePuzzleDB(data);

    return { description: "Alphabet updated" };
  } catch (error) {
    console.error("error", error);
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "An unknown error occurred" };
    }
  }
}
