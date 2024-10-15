import Link from "next/link";

export function NavBar() {
  return <nav className="flex items-center justify-between p-4  shadow-sm w-full">
    <div className="self-start">
      <h1 className="text-lg font-bold">Dashboard</h1>
    </div>
    <ul className="flex flex-row gap-4 w-full justify-center">
      <li>
        <Link href='/profile'>Profile</Link>
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