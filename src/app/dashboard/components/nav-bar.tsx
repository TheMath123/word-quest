import { ProfileAvatar } from "@/components/profile/profile-avatar";
import Link from "next/link";

export function NavBar() {
  return <nav className="flex items-center justify-between p-4 shadow-sm w-full">
    <ProfileAvatar />
    <ul className="flex flex-row gap-4 w-full justify-center">
      <li>
        <Link href='/'>Home</Link>
      </li>
      <li>
        <Link href='/dashboard/'>Dashboard</Link>
      </li>
      <li>
        <Link href='/dashboard/alphabet'>Alphabet</Link>
      </li>
      <li>
        <Link href='/dashboard/puzzle'>Puzzle</Link>
      </li>
    </ul>
  </nav>;
}