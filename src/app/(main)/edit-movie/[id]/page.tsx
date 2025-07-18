import { getMovieById } from "@/lib/movies";
import AddMovie from "@/app/(main)/add-movie/page";

export default async function Page(props: any) {
  const params = await props.params;
  const id = params.id;
  const movie = await getMovieById(id);
  if ("error" in movie) {
    return <div>{movie.error}</div>;
  }
  return (
    <div>
      <AddMovie movie={movie} />
    </div>
  );
}
