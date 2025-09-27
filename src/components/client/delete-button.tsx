"use client";

import { deleteMovie } from "@/server-functions/movies"; // adjust path
import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Overlay from "@/components/client/overlay";
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
      // Calculate new total after deletion
      const newTotal = total - 1;

      // Calculate last page number based on new total
      const lastPage = Math.max(1, Math.ceil(newTotal / PAGE_SIZE));

      // Did current page become invalid?
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
      {isPending && <Overlay useLoading />}
    </>
  );
};

export default DeleteButton;
