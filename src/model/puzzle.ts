import { PuzzleDTO, PuzzleUpdateDTO } from "@/dtos";
import { prisma } from "@/lib/db/prisma";
import { Puzzle } from "@prisma/client";

const getPuzzles = async (): Promise<Puzzle[] | null> => {
  const data = await prisma.puzzle.findMany();
  return data;
};

const getPuzzleById = async (id: string): Promise<Puzzle | null> => {
  const data = await prisma.puzzle.findUnique({
    where: {
      id,
    },
  });
  return data;
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
  const puzzle = await prisma.puzzle.create({
    data: {
      word: data.word,
      tip: data.tip,
      alphabetName: data.alphabetName,
    },
  });
  return puzzle;
};

const updatePuzzle = async (data: PuzzleUpdateDTO): Promise<Puzzle> => {
  const puzzle = await prisma.puzzle.update({
    data: {
      word: data.word,
      tip: data.tip,
      alphabetName: data.alphabetName,
    },
    where: {
      id: data.id,
    },
  });
  return puzzle;
};

const deletePuzzle = async (id: string): Promise<Puzzle> => {
  const puzzle = await prisma.puzzle.delete({
    where: {
      id,
    },
  });
  return puzzle;
};

export {
  getPuzzles,
  getPuzzleById,
  getRandomPuzzle,
  createPuzzle,
  updatePuzzle,
  deletePuzzle,
};
