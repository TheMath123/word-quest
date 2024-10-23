import type { Metadata } from "next";
import { Jost } from "next/font/google";
import { Toaster } from "@/components/ui/toaster"
import Providers from "@/lib/react-query/query-provider";
// import { Analytics } from "@vercel/analytics/react"

import "./globals.css";
import { davek } from "./fonts";

const font = Jost({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})


export const metadata: Metadata = {
  title: "Word Quest",
  description: "Challenge your knowledge in solving riddles, and discover the correct word.",
  icons: ['/images/favicon.png'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${font.className} ${davek.variable} antialiased relative`}
      >
        <Providers>
          {children}
        </Providers>
        <Toaster />
        {/* <Analytics /> */}
      </body>
    </html >
  );
}
