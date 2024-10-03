import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

export default auth(async function middleware(req: NextRequest) {
  console.log("req", req);
  // Your custom middleware logic goes here
});
