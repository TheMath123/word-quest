"use server";

import { DGameData } from "@/db/schema";
import { getUserGameData } from "@/model/game-data";

export async function searchGameData(
  userId: string
): Promise<DGameData | null> {
  try {
    const puzzle = await getUserGameData(userId);
    return puzzle;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}
