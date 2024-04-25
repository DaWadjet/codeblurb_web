import CourseDetailsAside from "@/pages/courseDetails/CourseDetailsAside";
import CourseDetailsTabs from "@/pages/courseDetails/CourseDetailsTabs";
import { Card, CardContent, CardHeader } from "@/shadcn/ui/card";
import { Rating } from "@/shadcn/ui/rating";
import dayjs from "dayjs";
import { FC } from "react";

import BigLoader from "@/components/common/BigLoader";
import useCourseDetailsMagicQuery from "@/hooks/useCourseDetailsMagicQuery";
import {
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
      <Card className="flex-row h-64 justify-between overflow-hidden flex">
        <CardContent className="p-6  flex flex-col justify-between w-full">
          <h2 className="font-semibold text-3xl line-clamp-3 text-ellipsis">
            {course.title}
          </h2>

          <div className="flex flex-col gap-3">
            <div className="flex justify-between w-full items-center text-xs">
              <div className="flex gap-2 items-end">
                <Info className="text-muted-foreground size-5" />
                <span className="text-muted-foreground">
                  {course.skillLevel}
                </span>
              </div>
              <div className="flex gap-2 items-end">
                <Users className="text-muted-foreground size-5" />
                <span className="text-muted-foreground">
                  {course.numberOfPurchases} enrolled
                </span>
              </div>
              <div className="flex gap-2 items-end">
                <Hourglass className="text-muted-foreground size-5" />
                <span className="text-muted-foreground">
                  {course.totalHours} hours
                </span>
              </div>
              <div className="flex gap-2 items-end">
                <LastUpdated className="text-muted-foreground size-5" />
                <span className="text-muted-foreground">
                  Updated {dayjs(course.releaseDate).format("DD/MM/YYYY")}
                </span>
              </div>
            </div>
            <div className="flex gap-2 items-baseline leading-none">
              <div className="font-medium text-foreground text-xl flex gap-2 items-center">
                {course.ratings.averageRating ?? 0}{" "}
                <Rating
                  rating={course.ratings.averageRating ?? 0}
                  size={16}
                  filledClassName="text-amber-400"
                />
              </div>
              {!!course.ratings.numberOfRatings && (
                <p className="text-sm text-muted-foreground">
                  from {course.ratings.numberOfRatings} reviews
                </p>
              )}
            </div>
          </div>
        </CardContent>
        <CardHeader className="w-80 h-full p-0 shrink-0">
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
