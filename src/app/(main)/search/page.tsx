import SearchForm from "@/components/client/SearchForm";
import MovieList from "@/components/server/MoviesList";
import { Suspense } from "react";
import Pagination from "@/components/client/Pagination";
import Loading from "@/components/client/Loading";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  return (
    <div className=" h-full overflow-auto  ">
      <SearchForm />

      <Suspense key={JSON.stringify(searchParams)} fallback={<Loading />}>
        <MovieList searchParams={searchParams} />
      </Suspense>

      <Pagination />
    </div>
  );
}
