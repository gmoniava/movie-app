"use server";
import postgres from "postgres";
import { NextResponse } from "next/server"; // To send a response
import { z } from "zod";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

const sql = postgres(process.env.DATABASE_URL!, { ssl: "require" });

const AddFormSchema = z.object({
  name: z.string(),
  releaseYear: z.coerce.number(),
  actors: z.string(),
  description: z.string(),
  genres: z.array(z.coerce.number()),
});
const EditFormSchema = z.object({
  name: z.string(),
  releaseYear: z.coerce.number(),
  actors: z.string(),
  description: z.string(),
  genres: z.array(z.coerce.number()),
  movieId: z.string(),
});

const DeleteSchema = z.object({
  id: z.string(),
});

export async function deleteMovie(movieId: string) {
  const session = await getSession();
  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  try {
    const { id } = DeleteSchema.parse({
      id: movieId || "",
    });

    await sql`DELETE FROM movies WHERE id = ${id}`;

    revalidatePath("/search");
  } catch (err: any) {
    console.error("deleteMovie failed:", err);
    return {
      error: "Something went wrong. Please try again.",
    };
  }
}

export async function addMovie(formData: FormData) {
  const session = await getSession();
  if (!session) {
    return { error: "Unauthorized" };
  }

  try {
    const { name, releaseYear, actors, description, genres } = AddFormSchema.parse({
      name: formData.get("name"),
      releaseYear: formData.get("releaseYear"),
      actors: formData.get("actors"),
      description: formData.get("description"),
      genres: formData.getAll("genres"),
    });
    // Start a safe transaction
    await sql.begin(async (tx) => {
      // Insert movie into movies table
      const result = await tx`
        INSERT INTO movies (name, release_year, actors, description) 
        VALUES (${name}, ${releaseYear}, ${actors}, ${description})
        RETURNING id;
      `;

      // Get the inserted movie ID
      const movieId = result[0].id;

      // Insert movie-genre relationships
      await Promise.all(
        genres.map(
          (genreId) =>
            tx`
            INSERT INTO movie_genres (movie_id, genre_id) 
            VALUES (${movieId}, ${genreId});
          `
        )
      );
    });

    return { data: "Movie added successfully!" };
  } catch (err: any) {
    console.error("addMovie failed:", err);
    return {
      error: "Something went wrong. Please try again.",
    };
  }
}

export async function editMovie(formData: FormData) {
  const session = await getSession();
  if (!session) {
    return { error: "Unauthorized" };
  }
  try {
    const { name, releaseYear, actors, description, genres, movieId } = EditFormSchema.parse({
      name: formData.get("name"),
      releaseYear: formData.get("releaseYear"),
      actors: formData.get("actors"),
      description: formData.get("description"),
      genres: formData.getAll("genres"),
      movieId: formData.get("id"),
    });

    // Start a safe transaction
    await sql.begin(async (tx) => {
      // Update movie in the movies table
      await tx`
        UPDATE movies
        SET name = ${name}, release_year = ${releaseYear}, actors = ${actors}, description = ${description}
        WHERE id = ${movieId};
      `;

      // Remove existing movie-genre relationships
      await tx`
        DELETE FROM movie_genres
        WHERE movie_id = ${movieId};
      `;

      // Insert the new movie-genre relationships
      await Promise.all(
        genres.map(
          (genreId) =>
            tx`
            INSERT INTO movie_genres (movie_id, genre_id) 
            VALUES (${movieId}, ${genreId});
          `
        )
      );
    });

    return { data: "Movie edited successfully!" };
  } catch (err: any) {
    console.error("editMovie failed:", err);
    return {
      error: "Something went wrong. Please try again.",
    };
  }
}
