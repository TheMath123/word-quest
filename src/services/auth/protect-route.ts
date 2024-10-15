import { Role } from "@/@types/role";
import { auth } from "@/lib/auth";

// Useless function, as I use authentication middleware, but it's saved

export async function protectRoute() {
  const session = await auth();

  if (!session) {
    return { error: "You are not authenticated, please log in." };
  }

  if (session?.user.role !== Role.ADMIN) {
    return { error: "👮 Unauthorized user" };
  }
}
