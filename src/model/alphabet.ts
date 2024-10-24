import { eq, or } from "drizzle-orm";
import { alphabets, DAlphabet } from "@/db/schema";
import { AlphabetDTO, AlphabetUpdateDTO } from "@/dtos";
import { db } from "@/lib/db/drizzle";

const getAlphabets = async (): Promise<DAlphabet[] | null> => {
  const results = await db.select().from(alphabets);
  return results;
};

interface GetAlphabetParams {
  name?: string;
  id?: string;
}

const getAlphabet = async ({
  name,
  id,
}: GetAlphabetParams): Promise<DAlphabet | null> => {
  if (!name && !id) return null;

  const result = await db
    .select()
    .from(alphabets)
    .where(
      or(
        name ? eq(alphabets.name, name) : undefined,
        id ? eq(alphabets.id, id) : undefined
      )
    )
    .limit(1);

  return result[0] || null;
};

const createAlphabet = async (data: AlphabetDTO): Promise<DAlphabet> => {
  const result = await db
    .insert(alphabets)
    .values({
      name: data.name,
      characters: data.characters,
    })
    .returning();

  return result[0];
};

const updateAlphabet = async (data: AlphabetUpdateDTO): Promise<DAlphabet> => {
  const result = await db
    .update(alphabets)
    .set({
      name: data.name,
      characters: data.characters,
    })
    .where(eq(alphabets.id, data.id))
    .returning();

  return result[0];
};

const deleteAlphabet = async (id: string): Promise<DAlphabet> => {
  const result = await db
    .delete(alphabets)
    .where(eq(alphabets.id, id))
    .returning();

  return result[0];
};

export {
  getAlphabets,
  getAlphabet,
  createAlphabet,
  updateAlphabet,
  deleteAlphabet,
};
export type { GetAlphabetParams };
