import { prisma } from "@/lib/db/prisma";
import { Alphabet } from "@prisma/client";

const getAlphabets = async () => {
  const data = await prisma.alphabet.findMany();
  return data;
};

const getAlphabet = async (name: string): Promise<Alphabet | null> => {
  const data = await prisma.alphabet.findUnique({
    where: {
      name,
    },
  });
  return data;
};

const createAlphabet = async (
  name: string,
  characters: string
): Promise<Alphabet> => {
  const alphabet = await prisma.alphabet.create({
    data: {
      name,
      characters,
    },
  });
  return alphabet;
};

export { getAlphabets, getAlphabet, createAlphabet };
