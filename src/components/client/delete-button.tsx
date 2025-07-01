"use client";

import { deleteMovie } from "@/actions/movies"; // adjust path
import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingOverlay from "@/components/client/loading-overlay";
import Button from "@/components/client/button";
import { PAGE_SIZE } from "@/utils";

const DeleteButton = ({ movieId, total }: { movieId: string; total: number }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const handleDelete = () => {
    const confirmed = confirm("Are you sure you want to delete this movie?");
    if (!confirmed) return;

    startTransition(async () => {
      const result = await deleteMovie(movieId);
      if (result?.error) {
        alert("Error deleting movie: " + result.error);
        return;
      }
      // Calculate new total count (subtract 1 because one movie deleted)
      const newTotal = total - 1;

      // Calculate last valid page
      const lastPage = Math.max(1, Math.ceil(newTotal / PAGE_SIZE));

      // If the new last page is less than current page, we need to update the current page too.
      if (currentPage > lastPage) {
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set("page", String(lastPage));
        router.replace(`?${newParams.toString()}`, { scroll: false });
      }
    });
  };

  return (
    <>
      <Button
        danger
        nativeProps={{
          onClick: () => {
            handleDelete();
          },
        }}
      >
        Delete
      </Button>
      {isPending && <LoadingOverlay />}
    </>
  );
};

export default DeleteButton;
