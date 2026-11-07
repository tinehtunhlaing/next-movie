import { MovieType, PersonType } from "@/types/global";
import Link from "next/link";

async function fetchMovie(id: string): Promise<MovieType> {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  });

  return await res.json();
}

async function fetchCasts(id: string): Promise<PersonType[]> {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  });

  const data = await res.json();
  return data.cast;
}

const backdrop = "http://image.tmdb.org/t/p/w1280";
const profile = "http://image.tmdb.org/t/p/w185";

export default async function ShowMovie({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = await fetchMovie(id);
  const casts = await fetchCasts(id);

  return (
    <div>
      <h2 className="text-lg mt-8 pb-4 mb-4 border-b font-bold">
        {movie.title} ({movie.release_date.split("-")[0]})
      </h2>
      <img src={backdrop + movie.backdrop_path} />
      <p className="mt-4">{movie.overview}</p>

      <h2 className="text-lg mt-8 pb-4 mb-4 border-b font-bold">Cast</h2>
      <div className="flex flex-wrap gap-2">
        {casts?.map((person) => {
          return (
            <div key={person.id} className="w-45 mb-4 text-center">
              {person.profile_path ? (
                <Link href={`/person/${person.id}`}>
                  <img src={profile + person.profile_path} />
                </Link>
              ) : (
                <div className="bg-gray-300 h-68"></div>
              )}
              <b>{person.name}</b>
              <div className="text-gray-500">{person.character}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
