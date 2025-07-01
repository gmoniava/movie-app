import postgres from "postgres";
import { NextResponse } from "next/server"; // To send a response
import { z } from "zod";
import { getSession } from "./auth";
import { revalidatePath } from "next/cache";
import { PAGE_SIZE } from "@/utils";

const sql = postgres(process.env.DATABASE_URL!, { ssl: "require" });

export type Movie = {
  id: number;
  name: string;
  releaseYear: number;
  actors: string;
  description: string;
  genres: string[];
};

const SearchSchema = z.object({
  name: z.string(),
  page: z.coerce
    .number()
    .nullable()
    .transform((val) => val ?? 1),
  perPage: z.coerce
    .number()
    .nullable()
    .transform((val) => val ?? PAGE_SIZE),
  genres: z.array(z.coerce.number()),
  releaseYearFrom: z.coerce.number().nullable(),
  releaseYearTo: z.coerce.number().nullable(),
  actor: z.string().nullable(),
  description: z.string().nullable(),
});

export async function searchMovies(
  searchParams: URLSearchParams
): Promise<{ data: Movie[]; total: number } | { error: string }> {
  try {
    const raw = {
      name: searchParams.get("name") ?? "",
      page: searchParams.get("page"),
      perPage: searchParams.get("perPage"),
      genres: searchParams.getAll("genres"),
      releaseYearFrom: searchParams.get("releaseYearFrom"),
      releaseYearTo: searchParams.get("releaseYearTo"),
      actor: searchParams.get("actor"),
      description: searchParams.get("description"),
    };

    const { name, page, perPage, genres, releaseYearFrom, releaseYearTo, actor, description } = SearchSchema.parse(raw);

    const nameQuery = name ? sql`AND m.name ILIKE ${"%" + name + "%"}` : sql``;
    const releaseYearFromQuery = releaseYearFrom ? sql`AND m.release_year >= ${releaseYearFrom}` : sql``;
    const releaseYearToQuery = releaseYearTo ? sql`AND m.release_year <= ${releaseYearTo}` : sql``;
    const actorQuery = actor ? sql`AND m.actors ILIKE ${"%" + actor + "%"}` : sql``;
    const descriptionQuery = description ? sql`AND m.description ILIKE ${"%" + description + "%"}` : sql``;

    // We need a movie who has at least one matching genre
    const genreQuery =
      genres.length > 0
        ? sql`
        AND EXISTS (
          SELECT 1
            FROM movie_genres mg2
           WHERE mg2.movie_id = m.id
             AND mg2.genre_id = ANY (${genres})
        )
      `
        : sql``;

    // Get total count
    const [{ count }] = await sql`
    SELECT COUNT(DISTINCT m.id)::int
    FROM movies m
    WHERE true
    ${nameQuery}  
    ${releaseYearFromQuery}
    ${releaseYearToQuery}
    ${actorQuery}
    ${descriptionQuery}
    ${genreQuery}
  `;

    // Get paginated data
    const offset = (page - 1) * perPage;
    const data: Movie[] = await sql`
    SELECT m.id, m.name, m.release_year AS "releaseYear", m.actors, m.description,
           ARRAY_AGG(DISTINCT g.name) FILTER (WHERE g.name IS NOT NULL) AS genres
    FROM movies m
    LEFT JOIN movie_genres mg ON m.id = mg.movie_id
    LEFT JOIN genres g ON mg.genre_id = g.id
    WHERE true
    ${nameQuery}
    ${releaseYearFromQuery}
    ${releaseYearToQuery}
    ${actorQuery}
    ${descriptionQuery}
    ${genreQuery}
    GROUP BY m.id
    ORDER BY m.name ASC
    LIMIT ${perPage}
    OFFSET ${offset}
  `;

    return { data, total: count };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function getMovieById(id: string): Promise<Movie | { error: string }> {
  const session = await getSession();
  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  // Get movie details with aggregated genres
  const movies: Movie[] = await sql`
      SELECT m.id, m.name, m.release_year as "releaseYear", m.actors, m.description,
            ARRAY_AGG(mg.genre_id) FILTER (WHERE mg.genre_id IS NOT NULL) AS genres
      FROM movies m
      LEFT JOIN movie_genres mg ON m.id = mg.movie_id
      WHERE m.id = ${id}
      GROUP BY m.id
    `;

  if (!movies[0]) {
    return { error: "Movie not found" };
  }

  return movies[0];
}
