import { AlphabetDTO } from "@/dtos";
import { prisma } from "@/lib/db/prisma";
import { Alphabet } from "@prisma/client";

const getAlphabets = async (): Promise<Alphabet[] | null> => {
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

const createAlphabet = async (data: AlphabetDTO): Promise<Alphabet> => {
  const alphabet = await prisma.alphabet.create({
    data: {
      name: data.name,
      characters: data.characters,
    },
  });
  return alphabet;
};

export { getAlphabets, getAlphabet, createAlphabet };
