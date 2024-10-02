import type { Metadata } from "next";
import { Jost } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const font = Jost({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})


export const metadata: Metadata = {
  title: "Word Quest",
  description: "Challenge your knowledge in solving riddles, and discover the correct word.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html >
  );
}
