import { Grid, Home, Icon, LetterWSquare, TypeText } from "@mynaui/icons-react";

interface Route {
  path: string;
  name: string;
  icon: Icon;
}
export const routes: Route[] = [
  {
    path: "/",
    name: "Home",
    icon: Home,
  },
  {
    path: "/dashboard/",
    name: "Dashboard",
    icon: Grid,
  },
  {
    path: "/dashboard/word-guess",
    name: "Word Guess",
    icon: LetterWSquare,
  },
  {
    path: "/dashboard/alphabet",
    name: "Alphabet",
    icon: TypeText,
  },
];
