import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";
import capitalize from "lodash/capitalize";
import { FC } from "react";

import PurchasedCourseItem from "@/components/common/courses/PurchasedCourseItem";
import { useDummyData } from "@/hooks/useDummyData";
import { Button } from "@/shadcn/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import { ChevronDown } from "lucide-react";
import { useImmer } from "use-immer";

const sortPossibilities = [
  "none",
  "recently-viewed",
  "recently-enrolled",
  "freshly-released",
  "title-a-to-z",
  "title-z-to-a",
] as const;

const skillLevelPossibilities = [
  "beginner",
  "intermediate",
  "advanced",
] as const;

//TODO add other filters as mentioned

const MyCoursesPage: FC = () => {
  const [filterOptions, setFilterOptions] = useImmer<{
    sort: (typeof sortPossibilities)[number];
    skillLevel: (typeof skillLevelPossibilities)[number][];
    search: string;
  }>({
    sort: "none",
    skillLevel: [],
    search: "",
  });

  const items = useDummyData();
  //TODO useMyContentBundlesQuery();

  return (
    <div className="flex flex-col">
      <div className="z-10 bg-background sticky top-5 pb-5 flex flex-col gap-7">
        <h2 className="text-3xl font-semibold">Explore</h2>
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <div className="flex flex-col items-start gap-1.5">
              <Label htmlFor="sort">Sort By</Label>
              <Select
                value={filterOptions.sort}
                onValueChange={(value) =>
                  setFilterOptions((draft) => {
                    draft.sort = value as (typeof sortPossibilities)[number];
                  })
                }
              >
                <SelectTrigger className="w-40">
                  <SelectValue id="sort" placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="w-40">
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

            <div className="flex flex-col items-start gap-1.5">
              <Label htmlFor="sort">Skill Level</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-40">
                    {filterOptions.skillLevel.length
                      ? filterOptions.skillLevel.map(capitalize).join(", ")
                      : "All levels"}
                    <ChevronDown className="h-4 w-4 opacity-50 ml-auto" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40">
                  {skillLevelPossibilities.map((level) => (
                    <DropdownMenuCheckboxItem
                      key={level}
                      onSelect={(e) => e.preventDefault()}
                      checked={filterOptions.skillLevel.includes(level)}
                      onCheckedChange={(checked) =>
                        setFilterOptions((draft) => {
                          if (checked) {
                            draft.skillLevel.push(level);
                            if (
                              draft.skillLevel.length ===
                              skillLevelPossibilities.length
                            )
                              draft.skillLevel = [];
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
          </div>
          <div className="flex flex-col items-start gap-1.5">
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              className="w-56"
              placeholder="Search..."
              onChange={(e) => {
                setFilterOptions((draft) => {
                  draft.search = e.target.value;
                });
              }}
              value={filterOptions.search}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8 place-items-center items-start">
        {items.map((course, i) => (
          <PurchasedCourseItem key={course.id! + i} course={course} />
        ))}
      </div>
    </div>
  );
};

export default MyCoursesPage;
