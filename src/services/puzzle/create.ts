"use server";

import { ServiceResponse } from "@/@types/response";
import { PuzzleDTO } from "@/dtos";
import { createPuzzle as createPuzzleDB } from "@/model/puzzle";

export async function createPuzzle(data: PuzzleDTO): Promise<ServiceResponse> {
  try {
    await createPuzzleDB(data);

    return { description: "Alphabet created" };
  } catch (error) {
    console.error("error", error);
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "An unknown error occurred" };
    }
  }
}
