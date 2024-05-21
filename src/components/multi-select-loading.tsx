import { Skeleton } from "@/components/ui/skeleton";

export default function MultiSelectLoading() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center m-2 gap-2">
        <div className="flex items-center w-full space-x-4">
          <Skeleton className="h-12 w-12 rounded-2xl" />
          <div className="space-y-2 w-full">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <div className="flex items-center w-full space-x-4">
          <Skeleton className="h-12 w-12 rounded-2xl" />
          <div className="space-y-2 w-full">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <div className="flex items-center w-full space-x-4">
          <Skeleton className="h-12 w-12 rounded-2xl" />
          <div className="space-y-2 w-full">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
