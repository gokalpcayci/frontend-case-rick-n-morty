import React from "react";
import { CommandItem } from "@/components/ui/command";
import { Character } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface CharacterItemProps {
  item: Character;
  chosenChars: Character[];
  handleCheckboxChange: (item: Character) => void;
  query: string;
}

function highlightText(text: string, query: string) {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, index) =>
    regex.test(part) ? (
      <span key={index} className="font-bold text-yellow-400">
        {part}
      </span>
    ) : (
      part
    )
  );
}

const CharacterItem: React.FC<CharacterItemProps> = ({
  item,
  chosenChars,
  handleCheckboxChange,
  query,
}) => {
  return (
    <CommandItem
      key={`${item.name}-${item.id}`}
      className={cn("flex border-y p-2 items-center justify-start gap-4")}
    >
      <Checkbox
        checked={chosenChars.includes(item)}
        onCheckedChange={() => handleCheckboxChange(item)}
        id={item.name}
      />
      <Avatar>
        <AvatarImage src={item.image} />
        <AvatarFallback>
          {item.name
            .split(" ")
            .map((name) => name.charAt(0))
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-start">
        <p>{highlightText(item.name, query)}</p>
        <p className="text-sm text-muted-foreground">
          {item?.episode?.length} episodes
        </p>
      </div>
    </CommandItem>
  );
};

export default CharacterItem;
