"use server";

import { ServiceResponse } from "@/@types/response";
import { UpdateGameDataDTO } from "@/dtos/game-data-dto";
import { updateGameData as updateGameDataDB } from "@/model/game-data";

export async function updateGameData(
  params: UpdateGameDataDTO
): Promise<ServiceResponse> {
  try {
    await updateGameDataDB(params);

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
