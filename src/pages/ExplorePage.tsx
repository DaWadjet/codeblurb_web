import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";
import capitalize from "lodash/capitalize";
import { ShoppingCart } from "lucide-react";
import { FC } from "react";

import PriceTag from "@/components/Discount";
import { useDummyData } from "@/hooks/useDummyData";
import { AspectRatio } from "@/shadcn/ui/aspect-ratio";
import { Button } from "@/shadcn/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import { Ratings } from "@/shadcn/ui/rating";
import { ShoppingItemResponse } from "@/types/ApiTypes";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
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

const filterPossibilities = ["none", "trending", "new", "popular"] as const;

const skillLevelPossibilities = [
  "beginner",
  "intermediate",
  "advanced",
] as const;

const ExplorePage: FC = () => {
  const [filterOptions, setFilterOptions] = useImmer<{
    sort: (typeof sortPossibilities)[number];
    filter: (typeof filterPossibilities)[number];
    skillLevel: (typeof skillLevelPossibilities)[number][];
    search: string;
  }>({
    sort: "none",
    filter: "none",
    skillLevel: [],
    search: "",
  });

  const items = useDummyData();

  return (
    <div className="flex flex-col">
      <div className="z-10 bg-background sticky top-5 pb-5 flex flex-col gap-7">
        <h2 className="text-3xl font-semibold">Explore</h2>
        <div className="flex items-center justify-between ">
          <div className="flex gap-3">
            <div className="flex flex-col items-start gap-1.5">
              <Label htmlFor="sort">Sort By</Label>
              <Select
                value={filterOptions.sort}
                onValueChange={(value) =>
                  setFilterOptions((draft) => {
                    draft.sort = value as any;
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
              <Label htmlFor="filter">Filter By</Label>
              <Select
                value={filterOptions.filter}
                onValueChange={(value) =>
                  setFilterOptions((draft) => {
                    draft.filter = value as any;
                  })
                }
              >
                <SelectTrigger className="w-40">
                  <SelectValue id="filter" placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="w-40">
                  {filterPossibilities.map((filter) => (
                    <SelectItem key={filter} value={filter}>
                      {capitalize(filter)}
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
          <CourseItem key={course.id! + i} course={course} />
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;

const CourseItem: FC<{ course: ShoppingItemResponse }> = ({ course }) => {
  const navigate = useNavigate();

  return (
    // <BackgroundGradient
    //   containerClassName="w-full h-full rounded-lg"
    //   className="grow w-full h-full rounded-lg"
    //   effectClassName="rounded-lg overflow-clip opacity-0 blur-sm"
    // >

    <Card
      onClick={() => navigate(`/course/${course.id}`)}
      className="overflow-clip hover:border-card-foreground/40 transition-all duration-150 h-full w-full cursor-pointer justify-between flex flex-col"
    >
      <CardHeader className="p-0 relative">
        <AspectRatio ratio={16 / 9}>
          <img
            src={"https://fireship.io/courses/js/img/featured.webp"}
            alt={course.title}
          />
        </AspectRatio>
        <div className="p-4">
          <CardTitle className="text-2xl">
            {course.title +
              (course.id! % 2 === 0 ? "longer text to see how it fits" : "")}
          </CardTitle>
        </div>
        <Button
          variant="outline"
          className="absolute border-muted size-9 p-2 top-0 right-1.5"
          onClick={(e) => {
            e.stopPropagation();
            console.log("Add to cart");
          }}
        >
          <ShoppingCart className="text-foreground" />
          <span className="sr-only">Add to cart</span>
        </Button>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="text-sm text-muted-foreground flex justify-between items-center">
          <div className="flex items-center">
            <Ratings
              rating={4.3}
              size={12}
              filledClassName="text-amber-500"
              hoverClassName="text-amber-300"
            />
            <p className="text-muted-foreground">(5)</p>
          </div>

          <PriceTag originalPrice={course.price!} discountedPrice={12} />
        </div>
      </CardContent>
    </Card>

    // </BackgroundGradient>
  );
};
