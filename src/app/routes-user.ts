import { Grid, Home, Icon, Logout } from "@mynaui/icons-react";

interface Route {
  path: string;
  name: string;
  icon: Icon;
  roles?: string[];
}
export const routes: Route[] = [
  {
    path: "/",
    name: "Home",
    icon: Home,
    roles: ["USER", "ADMIN"],
  },
  {
    path: "/dashboard/",
    name: "Dashboard",
    icon: Grid,
    roles: ["ADMIN"],
  },
  {
    path: "/logout",
    name: "Logout",
    icon: Logout,
    roles: ["USER", "ADMIN"],
  },
];
