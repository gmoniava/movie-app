import { getMovieById } from "@/lib/movies";
import AddMovie from "@/app/(main)/add-movie/page";

export default async function Page(props: any) {
  const params = await props.params;
  const id = params.id;

  // On this route, we get the we want to edit
  const movie = await getMovieById(id);

  // If we got error, just show the error message.
  if ("error" in movie) {
    return <div>{movie.error}</div>;
  }

  return (
    <div>
      {/* Render AddMovie component but pass movie as prop to indicate we are in edit mode. */}
      <AddMovie movie={movie} />
    </div>
  );
}
