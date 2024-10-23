import { PuzzleDTO, PuzzleUpdateDTO } from "@/dtos";
import { prisma } from "@/lib/db/prisma";
import { Puzzle } from "@prisma/client";

const getPuzzles = async (): Promise<Puzzle[] | null> => {
  return prisma.puzzle.findMany({
    cacheStrategy: {
      ttl: 60,
    },
  });
};

const getPuzzleById = async (id: string): Promise<Puzzle | null> => {
  return prisma.puzzle.findUnique({
    where: {
      id,
    },
  });
};

const getRandomPuzzle = async (
  alphabetName?: string
): Promise<Puzzle | null> => {
  const whereClause = alphabetName ? { alphabetName } : {};

  const puzzlesCount = await prisma.puzzle.count({
    where: whereClause,
  });

  if (puzzlesCount === 0) {
    return null;
  }

  const skip = Math.floor(Math.random() * puzzlesCount);

  const randomPuzzle = await prisma.puzzle.findFirst({
    where: whereClause,
    skip: skip,
  });

  return randomPuzzle;
};

const createPuzzle = async (data: PuzzleDTO): Promise<Puzzle> => {
  return prisma.puzzle.create({
    data: {
      word: data.word,
      tip: data.tip,
      alphabetName: data.alphabetName,
    },
  });
};

const updatePuzzle = async (data: PuzzleUpdateDTO): Promise<Puzzle> => {
  return prisma.puzzle.update({
    data: {
      word: data.word,
      tip: data.tip,
      alphabetName: data.alphabetName,
    },
    where: {
      id: data.id,
    },
  });
};

const deletePuzzle = async (id: string): Promise<Puzzle> => {
  return prisma.puzzle.delete({
    where: {
      id,
    },
  });
};

export {
  getPuzzles,
  getPuzzleById,
  getRandomPuzzle,
  createPuzzle,
  updatePuzzle,
  deletePuzzle,
};
