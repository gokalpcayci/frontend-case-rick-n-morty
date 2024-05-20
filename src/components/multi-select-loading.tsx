import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function MultiSelectLoading() {
  return (
    <div>
      <Skeleton className=" min-w-[100px] min-h-[20px] w-full rounded-full" />
    </div>
  );
}
