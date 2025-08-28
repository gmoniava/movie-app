"use client";

import { addMovie, editMovie } from "@/server-functions/movies";
import React, { useState, useTransition } from "react";
import Button from "@/components/client/button";
import Select from "react-select";
import { useOptions } from "@/hooks/useOptions";

const INITIAL_FORM = {
  name: "",
  releaseYear: "",
  actors: "",
  description: "",
  genres: [],
};

export default function Page(props: any) {
  const { options } = useOptions("genres");
  const [form, setForm] = useState<Record<string, any>>(INITIAL_FORM);

  React.useEffect(() => {
    // In edit mode, fill form data with the movie data passed as props.
    // If we got movie, it means we are in edit mode.
    if (props.movie) {
      setForm({
        ...props.movie,
        // react-select expects value to be an option (or array of options),
        // so we must map genre IDs from URL to full option objects.
        genres: options.filter((opt) => props.movie.genres?.includes(opt.value)),
      });
    }
  }, [options, props.movie]);

  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState<string | undefined>("");

  // Handle adding or editing a movie.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errorMsg before submitting
    setErrorMsg("");

    // Convert react state to form data because backend expects form data.
    const data = new FormData();
    data.append("name", form.name);
    data.append("releaseYear", form.releaseYear);
    data.append("actors", form.actors);
    data.append("description", form.description);
    if (Array.isArray(form.genres)) {
      form.genres.forEach((genre: any) => {
        data.append("genres", genre.value.toString());
      });
    }
    startTransition(async () => {
      // Are we in edit mode or add mode?
      if (props.movie) {
        // We are in edit mode, so we need to include the movie ID.
        data.append("id", form.id);
        const result = await editMovie(data);
        setErrorMsg(result.error ? result.error : result.data);
      } else {
        // We are creating a new movie.
        const result = await addMovie(data);
        setErrorMsg(result.error ? result.error : result.data);

        // If there was no error, reset the form to empty state.
        if (!result.error) {
          setForm(INITIAL_FORM);
        }
      }
    });
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="h-full p-4">
      <form onSubmit={handleSubmit} className="w-2/5 space-y-6 rounded-2xl shadow-md p-8 border border-gray-200">
        <div className="text-xl font-semibold">{props.movie ? "Edit movie" : "Add new movie"}</div>

        <div>
          <label className="block">Name:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="input-default w-full"
            required
            disabled={isPending}
          />
        </div>
        <div>
          <label className="block">Release Year:</label>
          <input
            type="number"
            name="releaseYear"
            value={form.releaseYear}
            onChange={handleChange}
            className="input-default w-full"
            required
            disabled={isPending}
          />
        </div>
        <div>
          <label className="block">Actors (comma-separated):</label>
          <input
            type="text"
            name="actors"
            value={form.actors}
            onChange={handleChange}
            className="input-default w-full"
            required
            disabled={isPending}
          />
        </div>
        <div>
          <label className="block">Description:</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="input-default w-full"
            required
            disabled={isPending}
          />
        </div>
        <div>
          <label className="block">Genres:</label>
          <Select
            isMulti
            styles={{
              control: (base) => ({ ...base, backgroundColor: "inherit" }),
              option: (base) => ({ ...base, color: "black" }),
            }}
            options={options}
            value={form.genres}
            onChange={(selected) => setForm({ ...form, genres: selected })}
            className="w-full"
            classNamePrefix="react-select"
            placeholder=""
            name="genres"
          />
        </div>
        <Button primary nativeProps={{ type: "submit", disabled: isPending, style: { width: 150 } }}>
          {isPending ? (props.movie ? "Editing..." : "Adding") : props.movie ? "Edit Movie" : "Add Movie"}
        </Button>
      </form>

      {errorMsg && <p className="mt-4 text-center text-lg">{errorMsg}</p>}
    </div>
  );
}
