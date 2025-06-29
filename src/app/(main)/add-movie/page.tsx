"use client";

import { addMovie, editMovie } from "@/actions/movies";
import React, { useState, useTransition } from "react";
import Button from "@/components/client/button";
import Select from "react-select";

const emptyForm = { name: "", releaseYear: "", actors: "", description: "", genres: [] };
const genreOptions = [
  { value: "1", label: "Action" },
  { value: "2", label: "Comedy" },
  { value: "3", label: "Drama" },
  { value: "4", label: "Thriller" },
  { value: "5", label: "Sci-Fi" },
];

export default function Page(props: any) {
  const [form, setForm] = useState(
    // In edit mode, pre-fill the form with movie data that is passed as props.
    props.movie
      ? {
          ...props.movie,
          genres: genreOptions.filter((opt) => props.movie.genres?.map((t: any) => t.toString()).includes(opt.value)),
        }
      : emptyForm
  );

  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Reset message before submitting
    setMessage("");

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
      try {
        // Are we in edit mode or add mode?
        if (props.movie) {
          // We are in edit mode, so we need to include the movie ID.
          data.append("id", form.id);
          await editMovie(data);
          setMessage("Movie edited successfully!");
        } else {
          // We are creating a new movie.
          await addMovie(data);
          setMessage("Movie added successfully!");
          setForm(emptyForm);
        }
      } catch (error) {
        console.error(error);
        setMessage("Failed. Please try again.");
      }
    });
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="h-full p-5">
      <form onSubmit={handleSubmit} className="w-1/2 space-y-4 ">
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
              control: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: "default-bg",
              }),
              option: (baseStyles, state) => ({
                ...baseStyles,
                color: "black",
              }),
            }}
            options={genreOptions}
            value={form.genres}
            onChange={(selected) => setForm({ ...form, genres: selected })}
            className="w-full"
            classNamePrefix="react-select"
            placeholder="Select genres"
            name="genres"
          />
        </div>
        <Button primary nativeProps={{ type: "submit", disabled: isPending, style: { width: 150 } }}>
          {isPending ? (props.movie ? "Editing..." : "Adding") : props.movie ? "Edit Movie" : "Add Movie"}
        </Button>
      </form>

      {message && <p className="mt-4 text-center text-lg">{message}</p>}
    </div>
  );
}
