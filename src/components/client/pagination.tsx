"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import React, { useOptimistic, useTransition } from "react";
import Button from "./button";
import { PAGE_SIZE } from "@/utils";

export default function Pagination({ total }: any) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const [optimisticPage, setOptimisticPage] = useOptimistic(parseInt(searchParams.get("page") || "1", 10));
  const [pending, startTransition] = useTransition();

  const handlePageChange = (newPage: number) => {
    startTransition(() => {
      // Generate URLSearchParams with the new page
      const params = new URLSearchParams(searchParams);
      params.set("page", newPage.toString());

      // Make sure we see the new page immediately
      // even if the server response is delayed
      setOptimisticPage(newPage);

      // Now also push the new page to the URL
      // This will trigger a re-render and fetch the new data
      push(`${pathname}?${params.toString()}`);
    });
  };

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const isPrevDisabled = optimisticPage === 1;
  const isNextDisabled = optimisticPage >= totalPages;

  return (
    <div className="flex justify-center gap-5 items-center mt-4" data-pending={pending ? "" : undefined}>
      <Button nativeProps={{ onClick: () => handlePageChange(optimisticPage - 1), disabled: isPrevDisabled }}>
        &lt;
      </Button>

      <span className="text-gray-600">Page {`${optimisticPage}/${totalPages}`}</span>

      <Button nativeProps={{ onClick: () => handlePageChange(optimisticPage + 1), disabled: isNextDisabled }}>
        &gt;
      </Button>
    </div>
  );
}
