import SearchForm from "@/components/client/search-form";
import { Suspense } from "react";
import Loading from "@/components/client/loading";
import PaginatedMoviesList from "@/components/server/paginated-movies-list";
export default async function Page(props: { searchParams?: Promise<Record<string, any>> }) {
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
