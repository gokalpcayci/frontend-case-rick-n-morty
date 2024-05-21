import { useState, useEffect } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { getUniqueResults } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import MultiSelectLoading from "./multi-select-loading";
import { useInView } from "react-intersection-observer";
import { Icons } from "./icons";
import { useToast } from "@/components/ui/use-toast";
import { getRicks } from "@/api/ricks";
import { Character } from "@/types";
import CharacterItem from "./character-item";

export default function MultiSelect() {
  const { ref, inView } = useInView();
  const { toast } = useToast();
  const [chosenChars, setChosenChars] = useState([]);
  const [query, setQuery] = useState("");

  const {
    status,
    data,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["ricks"],
    queryFn: getRicks,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    initialPageParam: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }

    if (status === "error") {
      toast({
        title: "Error",
        description: error.message,
        duration: 5000,
      });
    }
  }, [fetchNextPage, inView, hasNextPage, status, error, toast]);

  // Filter data to get unique results
  const uniqueResults = data ? getUniqueResults(data.pages) : [];

  const handleCheckboxChange = (item: Character) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setChosenChars((prev: any) =>
      prev.includes(item)
        ? prev.filter((char: Character) => char !== item)
        : [...prev, item]
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleRemoveItem = (item: Character) => {
    setChosenChars((prev) => prev.filter((char) => char !== item));
  };

  return (
    <div className="h-full flex">
      <Command className="border">
        <CommandInput
          value={query}
          onChangeCapture={handleInputChange}
          placeholder="Search a character from Rick and Morty"
        />

        <CommandList className="relative">
          <CommandGroup
            className="flex flex-col z-20 bg-background/90 items-start justify-start"
            heading={chosenChars.length > 0 ? "Chosen characters: " : ""}
          >
            {chosenChars.map((item: Character) => (
              <CommandItem
                key={item.name}
                className="bg-secondary inline-block m-1"
              >
                <div className="flex items-center gap-2">
                  {item.name}
                  <Icons.x
                    onClick={() => handleRemoveItem(item)}
                    className="w-4 h-4 cursor-pointer"
                  />
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
          {status === "pending" ? (
            <MultiSelectLoading />
          ) : (
            status !== "error" && (
              <>
                {uniqueResults.length === 0 && (
                  <CommandEmpty>No results found.</CommandEmpty>
                )}
                <CommandGroup className="">
                  {uniqueResults.map((item) => (
                    <CharacterItem
                      item={item}
                      chosenChars={chosenChars}
                      handleCheckboxChange={handleCheckboxChange}
                      query={query}
                    />
                  ))}
                </CommandGroup>
                {isFetchingNextPage && <MultiSelectLoading />}
                <div ref={ref} />
              </>
            )
          )}
        </CommandList>
      </Command>
    </div>
  );
}
