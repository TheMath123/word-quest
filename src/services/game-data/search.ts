"use server";

import { getUserGameData } from "@/model/game-data";
import { GameData } from "@prisma/client";

export async function searchPuzzle(userId: string): Promise<GameData | null> {
  try {
    const puzzle = await getUserGameData(userId);
    return puzzle;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}
