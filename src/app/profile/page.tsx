
import getProfile from "@/services/auth/profile"
import Image from 'next/image'
import Link from "next/link"


export default async function Profile() {
  const user = await getProfile()


  if ('error' in user) {
    return <main className="bg-background-gradient h-dvh grid place-content-center space-y-6">
      <h1>{user.error}</h1>
      <Link href='/' className="text-xl">Back</Link>
    </main>
  }

  return <main className="bg-background-gradient h-dvh grid place-content-center">
    <header className="flex flex-row gap-4">
      {user.image ? <Image src={user.image} alt={user.name + 'photo'} width={100} height={100} /> : null}
      <div>
        <h1 className="text-2xl font-medium">Welcome, <span className="font-semibold">{user.name}</span></h1>
        <h2 className="text-base font-light">{user.email}</h2>
      </div>
    </header>
    <nav className="flex gap-4 p-4">
      <ul className="flex space-x-4">
        <li><Link href="/dashboard/alphabet">Alphabet</Link></li>
      </ul>
    </nav>
    <section className="py-8">
      <span className="text-2xl font-semibold text-yellow-600">Profile in construction...</span>
    </section>
    {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
    <Link href='/' className="text-xl">Back</Link>
  </main>
}