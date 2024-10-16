
import { Role } from "@/@types/role"
import { ProfilePhoto } from "@/components/profile/profile-photo"
import { getProfile } from "@/services/auth"
import Link from "next/link"


export async function ProfilePage() {
  const data = await getProfile()
  const { user } = data

  if (!user && data.error) {
    return <main className="bg-background-gradient h-dvh grid place-content-center space-y-6">
      <h1>{data.error}</h1>
      <Link href='/' className="text-xl">Back</Link>
    </main>
  }

  return <main className="bg-background-gradient h-dvh p-4">
    <header className="flex flex-row justify-between">
      <aside className="flex flex-row gap-4 items-center">
        {user && user.image ?
          <ProfilePhoto
            name={user.name ?? "^_^"}
            image={user.image ?? ""}
            className="w-16 h-16"
          />
          : null}
        <div>
          <h1 className="text-2xl font-medium">Welcome, <span className="font-semibold">{user!.name}</span></h1>
          <h2 className="text-base font-light">{user!.email}</h2>
        </div>
      </aside>
      <nav className="flex gap-4 p-4">
        <ul className="flex space-x-4">
          <li><Link href="/">Home</Link></li>
          {user!.role === Role.ADMIN ? <li><Link href="/dashboard">Dashboard</Link></li> : null}
        </ul>
      </nav>
    </header>
    <section className="py-8">
      <span className="text-2xl font-semibold text-yellow-600">Profile in construction...</span>
    </section>
    {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
    <Link href='/' className="text-xl">Back</Link>
  </main>
}