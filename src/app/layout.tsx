import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import { TopBar, LeftSideBar, BottomBar } from "@/components/organisms";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "Beer Collection",
  description: "Beer Collection Home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <TopBar />
          <main className="flex flex-row">
            <LeftSideBar />
            <section className="flex min-h-screen flex-1 flex-col items-center px-6 pb-10 pt-28 max-md:pb-32 sm:px-10">
              <div className="w-full max-4xl">{children}</div>
            </section>
            <BottomBar />
            <Toaster position="bottom-right" />
          </main>
        </div>
      </body>
    </html>
  );
}
