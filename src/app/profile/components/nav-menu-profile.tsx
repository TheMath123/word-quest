import { routes } from "@/app/routes-user";
import { cn } from "@/lib/cn";
import { slug } from "@/utils/slug";
import Link from "next/link";

interface NavMenuProfileProps {
  role: string;
}

export function NavMenuProfile({ role }: NavMenuProfileProps) {
  return <nav className="flex gap-4 p-4">
    <ul className="flex space-x-4">
      {routes.map((route) => route.roles && route.roles?.includes(role) ? (
        <li key={slug(route.name)}>
          <Link
            href={route.path}
            className={cn('flex justify-center items-center gap-1 p-2',
              'hover:bg-blue-500/30 rounded-md active:scale-90',
              'transition-all duration-300 ease-in-out',
            )}
          >
            <route.icon />
            {route.name}
          </Link>
        </li>
      ) : null)}
    </ul>
  </nav>
}