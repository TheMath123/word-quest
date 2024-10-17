import { AlphabetDTO, AlphabetUpdateDTO } from "@/dtos";
import { prisma } from "@/lib/db/prisma";
import { Alphabet } from "@prisma/client";

const getAlphabets = async (): Promise<Alphabet[] | null> => {
  const data = await prisma.alphabet.findMany();
  return data;
};

interface GetAlphabetParams {
  name?: string;
  id?: string;
}

const getAlphabet = async ({
  name,
  id,
}: GetAlphabetParams): Promise<Alphabet | null> => {
  const data = await prisma.alphabet.findUnique({
    where: {
      name,
      id,
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

const updateAlphabet = async (data: AlphabetUpdateDTO): Promise<Alphabet> => {
  const alphabet = await prisma.alphabet.update({
    data: {
      name: data.name,
      characters: data.characters,
    },
    where: {
      id: data.id,
    },
  });
  return alphabet;
};

const deleteAlphabet = async (id: string): Promise<Alphabet> => {
  const alphabet = await prisma.alphabet.delete({
    where: {
      id,
    },
  });
  return alphabet;
};

export {
  getAlphabets,
  getAlphabet,
  createAlphabet,
  updateAlphabet,
  deleteAlphabet,
};
export type { GetAlphabetParams };
