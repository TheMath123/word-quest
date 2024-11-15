"use server";

import { Trivia } from "@/@types/trivia";
import { env } from "@/env";

export async function fetchTrivia(): Promise<Trivia | null> {
  try {
    const response = await fetch(env.OPEN_TRIVIA_DB_API_URL + "?amount=1");
    const data = await response.json();

    if (data.response_code > 0) {
      return null;
    }

    if (data.results.length === 0) {
      return null;
    }

    if (!data.results[0].question) {
      return null;
    }

    return data.results[0];
  } catch (error) {
    console.error("error", error);
    return null;
  }
}
