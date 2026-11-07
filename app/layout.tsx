import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import { Clapperboard, Search, Play } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GenreType } from "@/types/global";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next Movie App",
  description: "Powered by TMDB API",
};

async function fetchGenres(): Promise<GenreType[]> {
  const res = await fetch("https://api.themoviedb.org/3/genre/movie/list", {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  });
  const data = await res.json();

  return data.genres;
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const genres = await fetchGenres();
              //Don't reload
  async function search(formData: FormData) {
      "use server"
      const q = formData.get("q");
      redirect(`/search?q=${q}`);
  }

  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <header className="p-8 border-b flex items-center justify-between">
          <h1 className="font-bold text-xl flex gap-4 items-center">
            <Clapperboard />
            Next Movie
          </h1>

          <form action={search} className="flex gap-1 items-center">
            <Input name="q" placeholder="Search" />
            <Button type="submit">
              <Search />
            </Button>
          </form>
        </header>

        <main className="flex">
          {/* aside Genre */}
          <aside className="p-4 border-r flex flex-col gap-1 min-w-56">
            <Button variant="outline" className="justify-start py-4">
              <Link href="/" className="flex gap-2 items-center justify-center">
                <Play />
                All Genre
              </Link>
            </Button>

            {genres?.map((genre) => {
              return (
                <Button variant="outline" className="justify-start py-4">
                  <Link
                    href={`/genre/${genre.name}/${genre.id}`}
                    className="flex gap-2 items-center justify-center"
                  >
                    <Play />
                    {genre.name}
                  </Link>
                </Button>
              );
            })}
          </aside>
          <div className="p-4">{children}</div>
        </main>
      </body>
    </html>
  );
}
