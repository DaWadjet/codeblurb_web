import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";
import capitalize from "lodash/capitalize";
import { FC, useEffect, useRef, useState } from "react";

import PurchasedCourseItem from "@/components/common/courses/PurchasedCourseItem";
import { Button } from "@/shadcn/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import { ChevronDown, Loader2Icon } from "lucide-react";

import { useInViewWithQuery } from "@/hooks/useInViewWithQuery";
import { useContentBundlesQuery } from "@/network/content";
import { TPageProps, skillLevelPossibilities } from "@/utils/types";
import { useDebounce } from "react-use";
import { useImmer } from "use-immer";

const sortPossibilities: { label: string; sortValue: TPageProps["sort"] }[] = [
  { label: "None", sortValue: null },
  {
    label: "Recently Viewed",
    sortValue: { property: "lastInteractedAt", ascending: false } as const,
  },
  {
    label: "Recently Enrolled",
    sortValue: { property: "enrolledAt", ascending: false } as const,
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

const MyCoursesPage: FC = () => {
  const [nonDebouncedSearch, setNonDebouncedSearch] = useState("");
  const loaderRef = useRef<HTMLDivElement>(null);
  const [filterOptions, setFilterOptions] = useImmer<{
    sortIndex: number;
    skillLevel: (typeof skillLevelPossibilities)[number][];
    search: string;
  }>({
    sortIndex: 1,
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

  const query = useContentBundlesQuery({
    sort: sortPossibilities[filterOptions.sortIndex].sortValue,
    skills: filterOptions.skillLevel,
    title: filterOptions.search,
    size: 2,
  });

  useInViewWithQuery(loaderRef, query);

  return (
    <div className="flex flex-col">
      <div className="z-10 bg-background sticky top-5 pb-5 flex flex-col gap-7">
        <h2 className="text-3xl font-semibold">Your Content</h2>
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
        {(query.data?.items ?? []).map((course) => (
          <PurchasedCourseItem key={course!.id} course={course!} />
        ))}
      </div>
      <div ref={loaderRef} className="flex justify-center">
        {(query.isFetchingNextPage || query.isPending) && (
          <Loader2Icon className="size-10 animate-spin my-20 text-muted-foreground" />
        )}
      </div>
    </div>
  );
};

export default MyCoursesPage;
