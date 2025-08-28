import MovieList from "@/components/movies-list";
import Pagination from "@/components/client/pagination";
import { searchMovies } from "@/lib/movies";
import { searchParamsToURLSearchParams } from "@/utils";

export default async function Page({ searchParams }: any) {
  // Search movies based on the searchParams from URL.
  const searchResults = await searchMovies(searchParamsToURLSearchParams(searchParams));

  if ("error" in searchResults) return <div>{searchResults.error}</div>;

  return (
    <div>
      <MovieList searchResults={searchResults} />
      <Pagination total={searchResults.total} />
    </div>
  );
}
