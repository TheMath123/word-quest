import { PuzzleDTO, PuzzleUpdateDTO } from "@/dtos";
import { prisma } from "@/lib/db/prisma";
import { Puzzle } from "@prisma/client";

const getPuzzles = async (): Promise<Puzzle[] | null> => {
  const data = await prisma.puzzle.findMany();
  return data;
};

const getPuzzle = async (id: string): Promise<Puzzle | null> => {
  const data = await prisma.puzzle.findUnique({
    where: {
      id,
    },
  });
  return data;
};

const createPuzzle = async (data: PuzzleDTO): Promise<Puzzle> => {
  const alphabet = await prisma.puzzle.create({
    data: {
      word: data.word,
      tip: data.tip,
      alphabetName: data.alphabetName,
    },
  });
  return alphabet;
};

const updatePuzzle = async (data: PuzzleUpdateDTO): Promise<Puzzle> => {
  const alphabet = await prisma.puzzle.update({
    data: {
      word: data.word,
      tip: data.tip,
      alphabetName: data.alphabetName,
    },
    where: {
      id: data.id,
    },
  });
  return alphabet;
};

export { getPuzzles, getPuzzle, createPuzzle, updatePuzzle };
