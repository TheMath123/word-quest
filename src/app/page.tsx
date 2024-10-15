import { UserHeader } from "./user-header"
// import { GamePage } from "./game-page"
import { Footer } from "@/components"

export default function Home() {
  return (
    <div className="grid h-dvh">
      <UserHeader />
      {/* <GamePage /> */}
      <Footer />
    </div>
  )
}
