import CourseDetailsAside from "@/pages/courseDetails/CourseDetailsAside";
import CourseDetailsTabs from "@/pages/courseDetails/CourseDetailsTabs";
import { Card, CardContent, CardHeader } from "@/shadcn/ui/card";
import { Rating } from "@/shadcn/ui/rating";
import dayjs from "dayjs";
import { FC } from "react";

import BigLoader from "@/components/common/BigLoader";
import useCourseDetailsMagicQuery from "@/hooks/useCourseDetailsMagicQuery";
import capitalize from "lodash/capitalize";
import {
  Code,
  Hourglass,
  Info,
  LucideUploadCloud as LastUpdated,
  Users,
} from "lucide-react";

const CourseDetailsPage: FC = () => {
  const { course, isLoading } = useCourseDetailsMagicQuery();

  if (isLoading) return <BigLoader />;
  return (
    <div className="flex flex-col gap-5">
      <Card className="flex-row min-h-56 justify-between overflow-hidden flex">
        <CardContent className="p-6 gap-3 flex flex-col justify-between w-full">
          <h2 className="font-semibold text-3xl text-ellipsis">
            {course.title}
          </h2>
          <div className="grow" />
          <div className="grid grid-cols-3 text-xs w-full gap-x-6 gap-y-3">
            <div className="flex gap-2 items-center">
              <Code className="text-muted-foreground size-5" />
              <span className="text-muted-foreground pt-0.5">
                {course.technologies.join(", ")}
              </span>
            </div>
            <div className="flex gap-2 items-center col-span-2">
              <Info className="text-muted-foreground size-5" />
              <span className="text-muted-foreground pt-0.5">
                {capitalize(course.skillLevel)}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <Users className="text-muted-foreground size-5" />
              <span className="text-muted-foreground pt-0.5">
                {course.numberOfPurchases} enrolled
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <Hourglass className="text-muted-foreground size-5" />
              <span className="text-muted-foreground pt-0.5">
                {course.totalHours} hours
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <LastUpdated className="text-muted-foreground size-5" />
              <span className="text-muted-foreground pt-0.5">
                Updated {dayjs(course.releaseDate).format("DD/MM/YYYY")}
              </span>
            </div>
          </div>
          <div className="flex gap-2 items-baseline leading-none">
            <div className="font-medium text-foreground text-xl flex gap-2 items-center">
              {(course.ratings.averageRating ?? 0).toFixed(1)}{" "}
              <Rating rating={course.ratings.averageRating ?? 0} size={16} />
            </div>
            <p className="text-sm text-muted-foreground">
              {course.ratings.numberOfRatings
                ? ` from ${course.ratings.numberOfRatings} reviews`
                : "-  no reviews yet"}
            </p>
          </div>
        </CardContent>
        <CardHeader className="w-80 min-h-56 p-0 shrink-0 grow">
          <img
            src={
              course.imageUrl ??
              "https://fireship.io/courses/js/img/featured.webp"
            }
            alt={course.title}
            className="h-full w-full object-cover"
          />
        </CardHeader>
      </Card>
      <div className="flex gap-8">
        <CourseDetailsTabs />
        <CourseDetailsAside />
      </div>
    </div>
  );
};

export default CourseDetailsPage;
