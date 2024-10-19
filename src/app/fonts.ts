import localFont from "next/font/local";

const davek = localFont({
  src: [
    {
      path: "../assets/fonts/davek/davek.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/davek/davek-italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../assets/fonts/davek/davek-bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/davek/davek-bold-italic.otf",
      weight: "700",
      style: "BoldItalic",
    },
  ],
  variable: "--font-davek",
});

export { davek };
