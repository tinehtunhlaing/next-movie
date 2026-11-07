import MovieCard from "@/components/movie-card";
import { MovieType } from "@/types/global";

async function fetchSearch(q: string): Promise<MovieType[]> {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${q}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      },
    },
  );

  const data = await res.json();
  return data.results;
}

export default async function Genre({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  const movies = await fetchSearch(q);

  return (
    <div>
      <h2 className="text-lg pb-4 mb-4 border-b font-bold">Search: {q}</h2>
      <div className="flex gap-2 flex-wrap">
        {movies?.map((movie) => {
          return <MovieCard key={movie.id} movie={movie} />;
        })}
      </div>
    </div>
  );
}
