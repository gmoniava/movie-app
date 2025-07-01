"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import React from "react";
import Button from "@/components/client/button";
import Select from "react-select";
import { useOptions } from "@/hooks/useOptions";

function updateSearchParamsFromFormData(
  formData: FormData,
  currentSearchParams: URLSearchParams,
  selectedGenres: readonly any[]
): {
  params: URLSearchParams;
  formState: {
    name: string;
    releaseYearFrom: string;
    releaseYearTo: string;
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
  const releaseYearFrom = getValueFromFormData("releaseYearFrom");
  const releaseYearTo = getValueFromFormData("releaseYearTo");
  const actor = getValueFromFormData("actor");
  const description = getValueFromFormData("description");
  const genres = selectedGenres.map((g) => g.value);

  setOrDeleteSearchParamsVal(params, "name", name);
  setOrDeleteSearchParamsVal(params, "releaseYearFrom", releaseYearFrom);
  setOrDeleteSearchParamsVal(params, "releaseYearTo", releaseYearTo);
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
      releaseYearFrom,
      releaseYearTo,
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
  const { options: genreOptions } = useOptions("genres");

  // The search form supports reading search parameters from URL (although only on mount)
  const getInitialFormStateFromURL = () => {
    const getParam = (key: string) => searchParams.get(key) || "";
    const genres = searchParams.getAll("genres")?.map((g) => parseInt(g));

    return {
      name: getParam("name"),
      releaseYearFrom: getParam("releaseYearFrom"),
      releaseYearTo: getParam("releaseYearTo"),
      actor: getParam("actor"),
      description: getParam("description"),
      genres,
    };
  };

  // Genres component we will make controlled
  const [selectedGenres, setSelectedGenres] = React.useState<readonly any[]>();

  React.useEffect(() => {
    // React select uses options and values of same type, so we need to get full option object based on the value.
    setSelectedGenres(genreOptions.filter((opt) => getInitialFormStateFromURL().genres.includes(opt.value)));
  }, [genreOptions]); //eslint-disable-line

  const handleSearch = (prevState: any, formData: FormData): any => {
    const { params, formState } = updateSearchParamsFromFormData(formData, searchParams, selectedGenres || []);

    push(`${pathname}?${params.toString()}`);

    return {
      ...formState,
    };
  };

  const [formState, formAction, isPending] = React.useActionState(handleSearch, getInitialFormStateFromURL());

  return (
    <div>
      <div className="h-full p-4">
        <form action={formAction} className="w-2/5 space-y-6 rounded-2xl shadow-md p-8 border border-gray-200">
          <div className="text-xl font-semibold mb-5">Search movies</div>

          <div>
            <label className="block">Name:</label>
            <input type="text" name="name" className="w-full input-default" defaultValue={formState.name} />
          </div>

          <div>
            <label className="block">Actors:</label>
            <input type="text" name="actor" className="w-full input-default" defaultValue={formState.actor} />
          </div>

          <div>
            <label className="block">Release Year Range:</label>
            <div className="flex gap-2">
              <input
                type="number"
                name="releaseYearFrom"
                className="w-1/2 input-default"
                placeholder="From"
                defaultValue={formState.releaseYearFrom}
              />
              <input
                type="number"
                name="releaseYearTo"
                className="w-1/2 input-default"
                placeholder="To"
                defaultValue={formState.releaseYearTo}
              />
            </div>
          </div>

          <div>
            <label className="block">Description:</label>
            <input
              type="text"
              name="description"
              className="w-full input-default"
              defaultValue={formState.description}
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
              value={selectedGenres}
              onChange={(selected) => setSelectedGenres(selected || [])}
              className="w-full"
              classNamePrefix="react-select"
              placeholder=""
              name="genres"
            />
          </div>
          <div className="">
            <Button primary nativeProps={{ type: "submit", disabled: isPending, style: { width: 150 } }}>
              {isPending ? "Searching..." : "Search"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
