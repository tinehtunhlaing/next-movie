import MovieCard from "@/components/movie-card";
import { MovieType } from "@/types/global";
//return type
async function fetchGenre(id: string): Promise<MovieType[]> {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?with_genres=${id}`,
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
  params,
}: {
  params: Promise<{ name: string; id: string }>;
}) {
  const { name, id } = await params;
  const movies = await fetchGenre(id);

  return (
    <div>
      <h2 className="text-lg pb-4 mb-4 border-b font-bold">Genre: {name}</h2>
      <div className="flex gap-2 flex-wrap">
        {movies?.map((movie) => {
          return <MovieCard key={movie.id} movie={movie} />;
        })}
      </div>
    </div>
  );
}
