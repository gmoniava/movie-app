import SearchForm from "@/components/client/search-form";
import MovieList from "@/components/server/movies-list";
import { Suspense } from "react";
import Pagination from "@/components/client/pagination";
import Loading from "@/components/client/loading";
import { searchMovies } from "@/lib/movies";

export default async function Page({ searchParams }: any) {
  const urlSearchParams = new URLSearchParams();

  // Convert searchParams to URLSearchParams
  // because the searchMovies expects URLSearchParams
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
    <div>
      <MovieList searchResults={searchResults} />
      <Pagination total={searchResults.total} />
    </div>
  );
}
