import logout from "@/actions/logout";
import { Footer } from "@/components";

export default async function Logout() {
  const rest = await logout()

  return (
    <div className="flex flex-col h-dvh">
      <main className="grid place-content-center h-full">
        <h1 className="text-2xl font-bold">Good bye! =)</h1>
      </main>
      <Footer />
    </div>
  );
}