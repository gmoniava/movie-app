"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import React from "react";
import Button from "@/components/client/button";
import Select from "react-select";

const genreOptions = [
  { value: "1", label: "Action" },
  { value: "2", label: "Comedy" },
  { value: "3", label: "Drama" },
  { value: "4", label: "Thriller" },
  { value: "5", label: "Sci-Fi" },
];

function updateSearchParamsFromFormData(
  formData: FormData,
  currentSearchParams: URLSearchParams,
  selectedGenres: readonly any[]
): {
  params: URLSearchParams;
  formState: {
    name: string;
    release_year_from: string;
    release_year_to: string;
    actor: string;
    description: string;
    genres: string[];
  };
} {
  const getValueFromFormData = (key: string) => (formData.get(key) as string) || "";

  const setOrDeleteSearchParamsVal = (params: URLSearchParams, key: string, value: string) => {
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
  };

  const params = new URLSearchParams(currentSearchParams);

  const name = getValueFromFormData("name");
  const release_year_from = getValueFromFormData("release_year_from");
  const release_year_to = getValueFromFormData("release_year_to");
  const actor = getValueFromFormData("actor");
  const description = getValueFromFormData("description");
  const genres = selectedGenres.map((g) => g.value);

  setOrDeleteSearchParamsVal(params, "name", name);
  setOrDeleteSearchParamsVal(params, "release_year_from", release_year_from);
  setOrDeleteSearchParamsVal(params, "release_year_to", release_year_to);
  setOrDeleteSearchParamsVal(params, "actor", actor);
  setOrDeleteSearchParamsVal(params, "description", description);

  params.delete("genres");
  genres.forEach((genre) => {
    if (genre) params.append("genres", genre);
  });

  return {
    params,
    formState: {
      name,
      release_year_from,
      release_year_to,
      actor,
      description,
      genres,
    },
  };
}
export default function Search({}: any) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  // The search form supports reading search parameters from URL (although only on mount)
  const getInitialFormStateFromURL = () => {
    const getParam = (key: string) => searchParams.get(key) || "";
    const genres = searchParams.getAll("genres");

    return {
      name: getParam("name"),
      release_year_from: getParam("release_year_from"),
      release_year_to: getParam("release_year_to"),
      actor: getParam("actor"),
      description: getParam("description"),
      genres,
    };
  };

  // For genres component we need to store state separately
  const [selectedGenres, setSelectedGenres] = React.useState<readonly any[]>(
    genreOptions.filter((opt) => getInitialFormStateFromURL().genres.includes(opt.value))
  );

  const handleSearch = (prevState: any, formData: FormData): any => {
    const { params, formState } = updateSearchParamsFromFormData(formData, searchParams, selectedGenres);

    push(`${pathname}?${params.toString()}`);

    return {
      ...formState,
    };
  };

  const [formState, formAction, isPending] = React.useActionState(handleSearch, getInitialFormStateFromURL());

  return (
    <div>
      <div className="h-full p-5">
        <div className="text-xl font-semibold mb-5">Search movies</div>

        <form action={formAction}>
          <div className="flex flex-col gap-4 md:flex-row md:gap-8">
            {/* First column */}
            <div className="flex flex-col gap-4 w-full md:w-1/2">
              <div>
                <label className="block">Name:</label>
                <input
                  type="text"
                  name="name"
                  className="w-full border rounded border-slate-300 p-1"
                  placeholder="e.g. Inception"
                  defaultValue={formState.name}
                />
              </div>

              <div>
                <label className="block">Actors:</label>
                <input
                  type="text"
                  name="actor"
                  className="w-full border rounded border-slate-300 p-1"
                  placeholder="e.g. Leonardo DiCaprio"
                  defaultValue={formState.actor}
                />
              </div>

              <div>
                <label className="block">Release Year Range:</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    name="release_year_from"
                    className="w-1/2 border rounded border-slate-300 p-1"
                    placeholder="From"
                    defaultValue={formState.release_year_from}
                  />
                  <input
                    type="number"
                    name="release_year_to"
                    className="w-1/2 border rounded border-slate-300 p-1"
                    placeholder="To"
                    defaultValue={formState.release_year_to}
                  />
                </div>
              </div>
            </div>

            {/* Second column */}
            <div className="flex flex-col gap-4 w-full md:w-1/2">
              <div>
                <label className="block">Description:</label>
                <input
                  type="text"
                  name="description"
                  className="w-full border rounded border-slate-300 p-1"
                  placeholder="e.g. This is a drama movie.."
                  defaultValue={formState.description}
                />
              </div>

              <div>
                <label className="block">Genres:</label>
                <Select
                  isMulti
                  options={genreOptions}
                  value={selectedGenres}
                  onChange={(selected) => setSelectedGenres(selected || [])}
                  className="w-full"
                  classNamePrefix="react-select"
                  placeholder="Select genres"
                  name="genres"
                />
              </div>
            </div>
          </div>
          <div className="text-right pt-10">
            <Button primary nativeProps={{ type: "submit", disabled: isPending, style: { width: 150 } }}>
              {isPending ? "Searching..." : "Search"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
