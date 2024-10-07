import { auth } from "@/lib/auth";
import { createAlphabet, getAlphabet, getAlphabets } from "@/model/alphabet";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const alphabetName = searchParams.get("name");
  let alphabet = null;

  if (alphabetName) {
    alphabet = await getAlphabet(alphabetName);
  } else {
    alphabet = await getAlphabets();
  }

  return NextResponse.json(alphabet);
});

export const POST = auth(async function POST(req) {
  if (!req.auth || !req.auth.user) {
    return NextResponse.json(
      { error: "Authentication error" },
      { status: 401 }
    );
  }

  const { name, characters } = await req.json();

  const alphabet = await createAlphabet(name, characters);

  return NextResponse.json(alphabet);
});
