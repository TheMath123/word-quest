import { PuzzleCompletedDTO } from "@/dtos/puzzle-completed-dto";
import { db } from "@/lib/db/drizzle";
import {
  puzzlesCompleted,
  DPuzzlesCompleted,
  DGameData,
  DPuzzle,
  gameData,
  puzzles,
} from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export type CompletedPuzzleWithDetails = {
  completedAt: Date | null;
  gameDataId: string;
  puzzleId: string;
  puzzle: DPuzzle;
  gameData: DGameData;
};

const listCompletedPuzzlesWithDetails = async (userId: string) => {
  // Query base para selecionar todos os puzzles completados
  const query = db
    .select({
      completed: puzzlesCompleted,
      puzzle: puzzles,
      userData: gameData,
    })
    .from(puzzlesCompleted)
    .innerJoin(puzzles, eq(puzzlesCompleted.puzzleId, puzzles.id))
    .innerJoin(gameData, eq(puzzlesCompleted.gameDataId, gameData.id))
    .where(eq(gameData.userId, userId))
    .orderBy(desc(puzzlesCompleted.completedAt));

  const results = await query;

  // Mapeia os resultados para o formato desejado
  return results.map(
    (result): CompletedPuzzleWithDetails => ({
      completedAt: result.completed.completedAt,
      gameDataId: result.completed.gameDataId,
      puzzleId: result.completed.puzzleId,
      puzzle: result.puzzle,
      gameData: result.userData,
    })
  );
};

// Função para obter estatísticas dos puzzles completados
const getCompletedPuzzlesStats = async (userId: string) => {
  const completedPuzzles = await listCompletedPuzzlesWithDetails(userId);

  return {
    totalCompleted: completedPuzzles.length,
    completedByDifficulty: completedPuzzles.reduce((acc, curr) => {
      const difficulty = curr.puzzle.word.length || "unknown";
      acc[difficulty] = (acc[difficulty] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    // Adicione mais estatísticas conforme necessário
    lastCompletedAt:
      completedPuzzles.length > 0
        ? Math.max(
            ...completedPuzzles.map((p) =>
              p.completedAt ? p.completedAt.getTime() : 0
            )
          )
        : null,
  };
};

const addPuzzleCompleted = async ({
  gameDataId,
  puzzleId,
}: PuzzleCompletedDTO): Promise<DPuzzlesCompleted> => {
  const result = await db
    .insert(puzzlesCompleted)
    .values({
      gameDataId,
      puzzleId,
    })
    .returning();

  return result[0];
};

export {
  addPuzzleCompleted,
  getCompletedPuzzlesStats,
  listCompletedPuzzlesWithDetails,
};
