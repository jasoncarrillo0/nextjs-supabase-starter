import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Header from "./Header";
import { ROOT_DOMAIN } from "@/utils/constants";


export const metadata = {
  metadataBase: new URL(ROOT_DOMAIN),
  title: "NEXTJS STARTER",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <Header/>
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
