import { eq } from "drizzle-orm";
import { db } from "@/lib/db/drizzle";
import { puzzles, DPuzzle, puzzlesCompleted } from "@/db/schema";
import { PuzzleDTO, PuzzleUpdateDTO } from "@/dtos";

const getPuzzles = async (): Promise<DPuzzle[] | null> => {
  const results = await db.select().from(puzzles);
  return results;
};

const getPuzzleById = async (id: string): Promise<DPuzzle | null> => {
  const result = await db
    .select()
    .from(puzzles)
    .where(eq(puzzles.id, id))
    .limit(1);

  return result[0] || null;
};

const getRandomPuzzle = async (
  alphabetName?: string
): Promise<DPuzzle | null> => {
  const query = alphabetName
    ? db.select().from(puzzles).where(eq(puzzles.alphabetName, alphabetName))
    : db.select().from(puzzles);

  const allPuzzles = await query;

  if (allPuzzles.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * allPuzzles.length);
  return allPuzzles[randomIndex];
};

const createPuzzle = async (data: PuzzleDTO): Promise<DPuzzle> => {
  const result = await db
    .insert(puzzles)
    .values({
      word: data.word,
      tip: data.tip,
      alphabetName: data.alphabetName,
    })
    .returning();

  return result[0];
};

const updatePuzzle = async (data: PuzzleUpdateDTO): Promise<DPuzzle> => {
  const result = await db
    .update(puzzles)
    .set({
      word: data.word,
      tip: data.tip,
      alphabetName: data.alphabetName,
    })
    .where(eq(puzzles.id, data.id))
    .returning();

  return result[0];
};

const deletePuzzle = async (id: string): Promise<DPuzzle> => {
  // Primeiro deleta todos os registros de puzzles completados relacionados
  await db.delete(puzzlesCompleted).where(eq(puzzlesCompleted.puzzleId, id));

  // Depois deleta o puzzle
  const result = await db.delete(puzzles).where(eq(puzzles.id, id)).returning();
  return result[0];
};
export {
  getPuzzles,
  getPuzzleById,
  getRandomPuzzle,
  createPuzzle,
  updatePuzzle,
  deletePuzzle,
};
