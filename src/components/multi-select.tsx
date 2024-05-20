import React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import MultiSelectLoading from "./multi-select-loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";

async function getRicks({ pageParam }) {
  const ricks = await axios
    .get(`https://rickandmortyapi.com/api/character/?page=${pageParam}`)
    .then((res) => res.data);

  return {
    results: ricks.results,
    nextPage: ricks.info.next ? pageParam + 1 : undefined,
    prevPage: ricks.info.prev ? pageParam - 1 : undefined,
  };
}

export default function MultiSelect() {
  const { ref, inView } = useInView();

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery({
    queryKey: ["ricks"],
    queryFn: getRicks,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    getPreviousPageParam: (firstPage) => firstPage.prevPage ?? undefined,
  });

  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  console.log(data);
  return (
    <div className="h-full flex ">
      <Command className="border">
        <CommandInput placeholder="Type a command or search..." />

        <CommandList>
          {status === "loading" ? (
            <MultiSelectLoading />
          ) : (
            status === "error" && <span>Error: {error.message}</span>
          )}

          {data?.pages[0].results.length === 0 && (
            <CommandEmpty>No results found.</CommandEmpty>
          )}
          <CommandGroup className="">
            {data?.pages?.map((page, pageIndex) => (
              <React.Fragment key={pageIndex}>
                {page?.results?.map((item, i, arr) => (
                  <CommandItem
                    key={item.name}
                    className={cn(
                      "flex border-y p-2 items-center justify-start gap-4",
                      i == 0 && pageIndex == 0 && "border-t-0",
                      arr.length - 1 == i && "border-b-0"
                    )}
                  >
                    <Avatar>
                      <AvatarImage src={item.image} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start">
                      <p>{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.episode.length} episodes
                      </p>
                    </div>
                  </CommandItem>
                ))}
              </React.Fragment>
            ))}
          </CommandGroup>
          {isFetchingNextPage && <MultiSelectLoading />}
          <div ref={ref}></div>
        </CommandList>
      </Command>
    </div>
  );
}
