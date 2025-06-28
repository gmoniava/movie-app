import React from "react";
import DeleteButton from "@/components/client/delete-button";
import ButtonLink from "../client/button-link";

const MovieList = async ({ searchResults }: any) => {
  return (
    <div className="mt-[5px] p-4 shadow-md">
      <h2 className="text-2xl font-semibold mb-4 ">Movies</h2>

      {searchResults.data?.length === 0 ? (
        <p className="text-center ">No movies found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
            <thead>
              <tr className="text-left text-sm uppercase tracking-wider">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Release Year</th>
                <th className="px-4 py-2">Actors</th>
                <th className="px-4 py-2">Genres</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.data?.map((movie: any) => (
                <tr key={movie.id} className="border-t border-gray-200 ">
                  <td className="px-4 py-2 font-medium ">{movie.name}</td>
                  <td className="px-4 py-2 ">{movie.releaseYear}</td>
                  <td className="px-4 py-2 ">{movie.actors}</td>
                  <td className="px-4 py-2 ">{movie?.genres?.join(", ")}</td>
                  <td className="px-4 py-2 ">{movie.description}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <ButtonLink nativeProps={{ href: `/edit-movie/${movie.id}` }}>Edit</ButtonLink>
                      <DeleteButton movieId={movie.id} total={searchResults.total} />
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
