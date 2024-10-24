"use server";

import { DGameData } from "@/db/schema";
import { createGameData as createGameDataDB } from "@/model/game-data";

export async function createGameData(id: string): Promise<DGameData | null> {
  try {
    const data = await createGameDataDB(id);
    return data;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}
