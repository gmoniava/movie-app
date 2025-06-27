import SearchForm from "@/components/client/search-form";
import MovieList from "@/components/server/movies-list";
import { Suspense } from "react";
import Pagination from "@/components/client/pagination";
import Loading from "@/components/client/loading";
import PaginatedMoviesList from "@/components/server/paginated-movies-list";
export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  return (
    <div className="h-full overflow-auto">
      <SearchForm />
      <Suspense key={JSON.stringify(searchParams)} fallback={<Loading />}>
        <PaginatedMoviesList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
