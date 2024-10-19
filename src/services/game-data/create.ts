"use server";

import { createGameData as createGameDataDB } from "@/model/game-data";
import { GameData } from "@prisma/client";

export async function createGameData(id: string): Promise<GameData | null> {
  try {
    const data = await createGameDataDB(id);
    return data;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}
