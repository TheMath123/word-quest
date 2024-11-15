
import { Role } from "@/@types/role"
import { ProfilePhoto } from "@/components/profile/profile-photo"
import { getProfile } from "@/services/auth"
import Link from "next/link"
import { CheckCircle } from '@mynaui/icons-react';
import { searchGameData } from "@/services/game-data";
import { NavMenuProfile } from "./nav-menu-profile";


export async function ProfilePage() {
  const data = await getProfile()
  const { user } = data

  if (!user && data.error) {
    return <main className="bg-background-gradient h-dvh grid place-content-center space-y-6">
      <h1>{data.error}</h1>
      <Link href='/' className="text-xl">Back</Link>
    </main>

  }

  const gameData = user?.id ? await searchGameData(user.id) : null


  return <main className="bg-background-gradient h-dvh">
    <header className="flex flex-row md:justify-between p-4 flex-wrap ">
      <aside className="flex flex-row gap-4 items-center">
        {user && user.image ?
          <ProfilePhoto
            name={user.name ?? "^_^"}
            image={user.image ?? ""}
            className="w-16 h-16"
          />
          : null}
        <div>
          <h1 className="text-base md:text-2xl font-medium">Welcome, <span className="font-semibold whitespace-nowrap">{user!.name}</span></h1>
          <h2 className="text-sm md:text-base font-light">{user!.email}</h2>
        </div>
      </aside>
      <NavMenuProfile role={user?.role ?? Role.USER} />
    </header>
    <section className="py-8 grid px-4 md:px-24 gap-4">
      {gameData?.totalCompleted ? <div className="border border-gray-900 dark:border-gray-100 rounded-md p-4 flex flex-col gap-2 items-center w-fit">
        <h1 className="font-medium text-xl">
          Total Puzzles Completed
        </h1>
        <div className="flex gap-2 items-center">
          <CheckCircle className="w-5 h-5 stroke-green-500" />
          <span className="font-semibold text-2xl">{gameData!.totalCompleted}</span>
        </div>
      </div> : null}

      {/* <pre>{JSON.stringify(gameData, null, 2)}</pre> */}
    </section>
  </main>
}