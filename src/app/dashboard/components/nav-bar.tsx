import { ProfileAvatar } from "@/components/profile/profile-avatar";
import { slug } from "@/utils/slug";
import Link from "next/link";
import { routes } from "../routes-dash";
import { cn } from "@/lib/cn";


export function NavBar() {
  return <nav className="flex items-center justify-between p-4 shadow-sm dark:shadow-slate-950/30 w-full">
    <ProfileAvatar />
    <ul className="flex flex-row gap-4 w-full justify-center">
      {routes.map((route) => (
        <li key={slug(route.name)}>
          <Link href={route.path}
            className={cn(
              "hover:bg-blue-500/40 rounded-md px-4 py-2",
              'flex gap-1 justify-center items-center',
            )}
          >
            <route.icon className="w-6 h-6" />
            {route.name}
          </Link>
        </li>
      ))}
    </ul>
  </nav>;
}