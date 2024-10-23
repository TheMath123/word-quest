import { AlphabetDTO, AlphabetUpdateDTO } from "@/dtos";
import { prisma } from "@/lib/db/prisma";
import { Alphabet } from "@prisma/client";

const getAlphabets = async (): Promise<Alphabet[] | null> => {
  return prisma.alphabet.findMany({
    cacheStrategy: {
      ttl: 60,
    },
  });
};

interface GetAlphabetParams {
  name?: string;
  id?: string;
}

const getAlphabet = async ({
  name,
  id,
}: GetAlphabetParams): Promise<Alphabet | null> => {
  return prisma.alphabet.findUnique({
    where: {
      name,
      id,
    },
  });
};

const createAlphabet = async (data: AlphabetDTO): Promise<Alphabet> => {
  return prisma.alphabet.create({
    data: {
      name: data.name,
      characters: data.characters,
    },
  });
};

const updateAlphabet = async (data: AlphabetUpdateDTO): Promise<Alphabet> => {
  return prisma.alphabet.update({
    data: {
      name: data.name,
      characters: data.characters,
    },
    where: {
      id: data.id,
    },
  });
};

const deleteAlphabet = async (id: string): Promise<Alphabet> => {
  return prisma.alphabet.delete({
    where: {
      id,
    },
  });
};

export {
  getAlphabets,
  getAlphabet,
  createAlphabet,
  updateAlphabet,
  deleteAlphabet,
};
export type { GetAlphabetParams };
