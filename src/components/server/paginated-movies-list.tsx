import MovieList from "@/components/movies-list";
import Pagination from "@/components/client/pagination";
import { searchMovies } from "@/lib/movies";

export default async function Page({ searchParams }: any) {
  // Converts searchParams object to URLSearchParams
  const searchParamsToURLSearchParams = (sp: Record<string, any>) => {
    const urlSearchParams = new URLSearchParams();
    for (const key in sp) {
      const value = sp[key];
      if (Array.isArray(value)) {
        value.forEach((v) => urlSearchParams.append(key, v));
      } else if (value !== undefined) {
        urlSearchParams.set(key, value);
      }
    }

    return urlSearchParams;
  };

  const searchResults = await searchMovies(searchParamsToURLSearchParams(searchParams));

  if ("error" in searchResults) return <div>{searchResults.error}</div>;

  return (
    <div>
      <MovieList searchResults={searchResults} />
      <Pagination total={searchResults.total} />
    </div>
  );
}
