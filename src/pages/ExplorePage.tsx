import { useAvailableShoppingItemsQuery } from "@/network/shopping";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";
import capitalize from "lodash/capitalize";
import { FC } from "react";

import { Button } from "@/shadcn/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";
import { Label } from "@/shadcn/ui/label";
import { useImmer } from "use-immer";

const sortPossibilities = [
  "none",
  "price-ascending",
  "price-descending",
  "highest-rated",
  "freshly-released",
  "title-a-to-z",
  "title-z-to-a",
] as const;

const fitlerPossibilities = ["none", "trending", "new", "popular"] as const;

const skillLevelPossibilities = [
  "beginner",
  "intermediate",
  "advanced",
] as const;

const ExplorePage: FC = () => {
  const [filterOptions, setFitlerOptions] = useImmer<{
    sort: (typeof sortPossibilities)[number];
    filter: (typeof fitlerPossibilities)[number];
    skillLevel: (typeof skillLevelPossibilities)[number][];
  }>({
    sort: "none",
    filter: "none",
    skillLevel: [],
  });
  const { data } = useAvailableShoppingItemsQuery();
  console.log(data);

  return (
    <div className="flex gap-2">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="sort">Sort By</Label>
        <Select>
          <SelectTrigger>
            <SelectValue id="sort" placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortPossibilities.map((sort) => (
              <SelectItem key={sort} value={sort}>
                {sort
                  .split("-")
                  .map((e) => capitalize(e))
                  .join(" ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {fitlerPossibilities.map((filter) => (
            <SelectItem key={filter} value={filter}>
              {capitalize(filter)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Skill Level</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Skill Level</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {skillLevelPossibilities.map((level) => (
            <DropdownMenuCheckboxItem
              key={level}
              onSelect={(e) => e.preventDefault()}
              checked={filterOptions.skillLevel.includes(level)}
              onCheckedChange={(checked) =>
                setFitlerOptions((draft) => {
                  if (checked) {
                    draft.skillLevel.push(level);
                  } else {
                    draft.skillLevel = draft.skillLevel.filter(
                      (l) => l !== level
                    );
                  }
                })
              }
            >
              {capitalize(level)}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ExplorePage;
