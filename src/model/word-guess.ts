import { eq } from "drizzle-orm";
import { db } from "@/lib/db/drizzle";
import { wordGuess, DWordGuess, puzzlesCompleted } from "@/db/schema";
import { WordGuessDTO, WordGuessUpdateDTO } from "@/dtos";

const getWordGuessList = async (): Promise<DWordGuess[] | null> => {
  const results = await db.select().from(wordGuess);
  return results;
};

const getWordGuessById = async (id: string): Promise<DWordGuess | null> => {
  const result = await db
    .select()
    .from(wordGuess)
    .where(eq(wordGuess.id, id))
    .limit(1);

  return result[0] || null;
};

const getRandomWordGuess = async (
  alphabetName?: string
): Promise<DWordGuess | null> => {
  const query = alphabetName
    ? db
        .select()
        .from(wordGuess)
        .where(eq(wordGuess.alphabetName, alphabetName))
    : db.select().from(wordGuess);

  const allWordGuess = await query;

  if (allWordGuess.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * allWordGuess.length);
  return allWordGuess[randomIndex];
};

const createWordGuess = async (data: WordGuessDTO): Promise<DWordGuess> => {
  const result = await db
    .insert(wordGuess)
    .values({
      word: data.word,
      tip: data.tip,
      alphabetName: data.alphabetName,
      maxAttempts: data.maxAttempts,
    })
    .returning();

  return result[0];
};

const updateWordGuess = async (
  data: WordGuessUpdateDTO
): Promise<DWordGuess> => {
  const result = await db
    .update(wordGuess)
    .set({
      word: data.word,
      tip: data.tip,
      alphabetName: data.alphabetName,
      maxAttempts: data.maxAttempts,
    })
    .where(eq(wordGuess.id, data.id))
    .returning();

  return result[0];
};

const deleteWordGuess = async (id: string): Promise<DWordGuess> => {
  await db.delete(puzzlesCompleted).where(eq(puzzlesCompleted.puzzleId, id));

  const result = await db
    .delete(wordGuess)
    .where(eq(wordGuess.id, id))
    .returning();
  return result[0];
};

export {
  getWordGuessList,
  getWordGuessById,
  getRandomWordGuess,
  createWordGuess,
  updateWordGuess,
  deleteWordGuess,
};
