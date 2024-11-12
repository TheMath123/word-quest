import Link from "next/link";
import { routes } from "./routes-dash";
import { slug } from "@/utils/slug";

const excludedRoutes = ["/dashboard/"];

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4 p-4 items-center grow">
      <nav className="flex gap-4">
        {routes.map((route) => excludedRoutes.includes(route.path) ? null : (
          <Link
            key={slug(route.name)}
            href={route.path}
            aria-label={route.name}
            title={route.name}
            className="aspect-square w-[100px] bg-blue-500 hover:bg-blue-700 flex items-center justify-center text-xl font-medium rounded-md"
          >
            {<route.icon
              className="h-8 w-8 text-white"
            />}
          </Link>
        ))}

      </nav>
    </div >
  );
}