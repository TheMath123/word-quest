import getUser from "@/actions/auth/profile";

export default async function Profile() {
  const user = await getUser();
  return <main className="bg-background-gradient h-dvh grid place-content-center">
    <pre>{JSON.stringify(user, null, 2)}</pre>
  </main>
}