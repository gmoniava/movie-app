"use client";

import { deleteMovie } from "@/actions/movies"; // adjust path
import { useTransition } from "react";
import LoadingOverlay from "../LoadingOverlay";
const DeleteButton = ({ movieId }: { movieId: string }) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    const confirmed = confirm("Are you sure you want to delete this movie?");
    if (!confirmed) return;

    startTransition(async () => {
      const result = await deleteMovie(movieId);
      if (result?.error) {
        alert("Error deleting movie: " + result.error);
        return;
      }
    });
  };

  return (
    <>
      <button onClick={handleDelete} disabled={isPending} className="btn-secondary text-red-600">
        Delete
      </button>
      {isPending && <LoadingOverlay />}
    </>
  );
};

export default DeleteButton;
