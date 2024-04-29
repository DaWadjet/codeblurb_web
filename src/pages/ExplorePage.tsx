import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";
import capitalize from "lodash/capitalize";
import { FC, useEffect, useRef, useState } from "react";

import CourseItem from "@/components/common/courses/CourseItem";
import { useAvailableShoppingItemsQuery } from "@/network/shopping";
import { Button } from "@/shadcn/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import { TPageProps, skillLevelPossibilities } from "@/utils/types";
import { ChevronDown, Loader2Icon } from "lucide-react";
import { useDebounce } from "react-use";

import { useInViewWithQuery } from "@/hooks/useInViewWithQuery";
import { useNavigate } from "react-router-dom";
import { useImmer } from "use-immer";

const sortPossibilities: { label: string; sortValue: TPageProps["sort"] }[] = [
  { label: "None", sortValue: null },
  {
    label: "Most Popular",
    sortValue: { property: "popularity", ascending: false } as const,
  },
  {
    label: "Freshly Released",
    sortValue: { property: "releaseDate", ascending: false } as const,
  },
  {
    label: "Price Ascending",
    sortValue: { property: "price", ascending: true } as const,
  },
  {
    label: "Price Descending",
    sortValue: { property: "price", ascending: false } as const,
  },
  {
    label: "Highest Rated",
    sortValue: { property: "rating", ascending: false } as const,
  },
  {
    label: "Title A to Z",
    sortValue: { property: "title", ascending: true } as const,
  },
  {
    label: "Title Z to A",
    sortValue: { property: "title", ascending: false } as const,
  },
] as const;

const ExplorePage: FC = () => {
  const navigate = useNavigate();
  const [nonDebouncedSearch, setNonDebouncedSearch] = useState("");
  const loaderRef = useRef<HTMLDivElement>(null);
  const [filterOptions, setFilterOptions] = useImmer<{
    sortIndex: number;
    skillLevel: (typeof skillLevelPossibilities)[number][];
    search: string;
  }>({
    sortIndex: 0,
    skillLevel: [],
    search: "",
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, cancel] = useDebounce(
    () => {
      setFilterOptions((draft) => {
        draft.search = nonDebouncedSearch;
      });
    },
    500,
    [nonDebouncedSearch]
  );

  useEffect(() => {
    return () => {
      cancel();
    };
  }, [cancel]);

  const query = useAvailableShoppingItemsQuery({
    sort: sortPossibilities[filterOptions.sortIndex].sortValue,
    skills: filterOptions.skillLevel,
    title: filterOptions.search,
  });

  useInViewWithQuery(loaderRef, query);

  return (
    <div className="flex flex-col">
      <div className="z-10 bg-background sticky top-5 pb-5 flex flex-col gap-7">
        <h2 className="text-3xl font-semibold">Explore</h2>
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <div className="flex flex-col items-start gap-1.5">
              <Label htmlFor="sort">Sort By</Label>
              <Select
                value={filterOptions.sortIndex.toString()}
                onValueChange={(value) =>
                  setFilterOptions((draft) => {
                    draft.sortIndex = parseInt(value);
                  })
                }
              >
                <SelectTrigger className="w-52">
                  <SelectValue id="sort" placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="w-52">
                  {sortPossibilities.map((sort, index) => (
                    <SelectItem key={sort.label} value={index.toString()}>
                      {sort.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col items-start gap-1.5">
              <Label htmlFor="sort">Skill Level</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-52">
                    {filterOptions.skillLevel.length
                      ? filterOptions.skillLevel.map(capitalize).join(", ")
                      : "All levels"}
                    <ChevronDown className="h-4 w-4 opacity-50 ml-auto" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-52">
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
              className="w-64"
              placeholder="Search..."
              onChange={(e) => {
                setNonDebouncedSearch(e.target.value);
              }}
              value={nonDebouncedSearch}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8 place-items-center items-start">
        {query.data?.items.map((course) => (
          <CourseItem key={course!.id} course={course!} />
        ))}
      </div>
      <div ref={loaderRef} className="flex justify-center">
        {(query.isFetchingNextPage || query.isPending) && (
          <Loader2Icon className="size-10 animate-spin my-20" />
        )}
      </div>
      {query.data?.items.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-4 px-5 my-20">
          <h3 className="text-xl font-semibold">No courses found!</h3>
          <span className="text-muted-foreground text-center">
            Play around with the filters to find your desired course or check
            back to your{" "}
            <Button
              variant="link"
              className="p-0 text-base"
              onClick={() => navigate("/home")}
            >
              Home page
            </Button>{" "}
            to see recommendations!
          </span>
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
