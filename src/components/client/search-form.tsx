"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import React, { useTransition } from "react";
import Button from "@/components/client/button";
import Select from "react-select";
import { useOptions } from "@/hooks/useOptions";

type SelectOption = {
  label: string;
  value: number;
};

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();
  const { options } = useOptions("genres");
  const [isPending, startTransition] = useTransition();

  const [formState, setFormState] = React.useState<Record<string, any>>({
    name: "",
    releaseYearFrom: "",
    releaseYearTo: "",
    actor: "",
    description: "",
    genres: [],
  });

  // Sync URL with react state
  React.useEffect(() => {
    const getParam = (key: string): string => searchParams.get(key) ?? "";

    // Extract genre IDs from the URL as integers
    const genreIds = searchParams.getAll("genres").map((g) => parseInt(g, 10));

    // react-select requires value type to match one of the option objects, so we must map genre IDs from URL to full option objects.
    const selectedGenreOptions = options.filter((opt) => genreIds.includes(opt.value));

    setFormState({
      name: getParam("name"),
      releaseYearFrom: getParam("releaseYearFrom"),
      releaseYearTo: getParam("releaseYearTo"),
      actor: getParam("actor"),
      description: getParam("description"),
      genres: selectedGenreOptions,
    });
  }, [options, searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleGenresChange = (selected: readonly SelectOption[] | null) => {
    setFormState((prev: any) => ({ ...prev, genres: selected || [] }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Convert formState into URL query parameters
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(formState)) {
      // genres handled separately, see below
      if (key === "genres") continue;

      if (value.trim() !== "") {
        params.set(key, value);
      }
    }

    // Append all selected genres to the params
    formState.genres.forEach((genre: any) => {
      params.append("genres", genre.value);
    });

    startTransition(() => {
      // Push the updated URL with query parameters, which triggers a new server fetch
      push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="w-2/5 space-y-6 rounded-2xl shadow-md p-8 border border-gray-200">
        <div className="text-xl font-semibold mb-5">Search movies</div>

        <div>
          <label className="block">Name:</label>
          <input
            type="text"
            name="name"
            className="w-full input-default"
            value={formState.name}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="block">Actors:</label>
          <input
            type="text"
            name="actor"
            className="w-full input-default"
            value={formState.actor}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="block">Release Year Range:</label>
          <div className="flex gap-2">
            <input
              type="number"
              name="releaseYearFrom"
              className="w-1/2 input-default"
              placeholder="From"
              value={formState.releaseYearFrom}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="releaseYearTo"
              className="w-1/2 input-default"
              placeholder="To"
              value={formState.releaseYearTo}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label className="block">Description:</label>
          <input
            type="text"
            name="description"
            className="w-full input-default"
            value={formState.description}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="block">Genres:</label>
          <Select
            isMulti
            options={options}
            value={formState.genres}
            onChange={handleGenresChange}
            className="w-full"
            classNamePrefix="react-select"
            name="genres"
            styles={{
              control: (base) => ({ ...base, backgroundColor: "inherit" }),
              option: (base) => ({ ...base, color: "black" }),
            }}
          />
        </div>
        <div>
          <Button primary nativeProps={{ type: "submit", disabled: isPending, style: { width: 150 } }}>
            {isPending ? "Searching..." : "Search"}
          </Button>
        </div>
      </form>
    </div>
  );
}
