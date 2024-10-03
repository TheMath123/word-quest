import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default auth(async function middleware(req: NextRequest) {
  // console.log("req", req);
  // Your custom middleware logic goes here
});
