import React from "react";
import Link from "next/link";
import DeleteButton from "@/components/client/delete-button";
import { searchMovies } from "@/lib/movies";
import Button from "@/components/client/button";

const MovieList = async ({ searchParams }: any) => {
  const urlSearchParams = new URLSearchParams();

  // Convert searchParams to URLSearchParams
  for (const key in searchParams) {
    const value = searchParams[key];
    if (Array.isArray(value)) {
      value.forEach((v) => urlSearchParams.append(key, v));
    } else if (value !== undefined) {
      urlSearchParams.set(key, value);
    }
  }

  const searchResults = await searchMovies(urlSearchParams);

  if ("error" in searchResults) return <div>{searchResults.error}</div>;

  return (
    <div className="mt-[5px] p-4 shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Movies</h2>

      {searchResults.data.length === 0 ? (
        <p className="text-center text-gray-500">No movies found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600 text-sm uppercase tracking-wider">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Release Year</th>
                <th className="px-4 py-2">Actors</th>
                <th className="px-4 py-2">Genres</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.data.map((movie: any) => (
                <tr key={movie.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium text-gray-800">{movie.name}</td>
                  <td className="px-4 py-2 text-gray-700">{movie.release_year}</td>
                  <td className="px-4 py-2 text-gray-700">{movie.actors}</td>
                  <td className="px-4 py-2 text-gray-700">{movie?.genres?.join(", ")}</td>
                  <td className="px-4 py-2 text-gray-700">{movie.description}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <Link className="px-4 py-1 rounded border border-gray-200" href={`/edit-movie/${movie.id}`}>
                        Edit
                      </Link>
                      <DeleteButton movieId={movie.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MovieList;
