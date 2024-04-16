import { useDummyData } from "@/hooks/useDummyData";
import CourseDetailsAside from "@/pages/courseDetails/CourseDetailsAside";
import CourseDetailsTabs from "@/pages/courseDetails/CourseDetailsTabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shadcn/ui/breadcrumb";
import { Card, CardContent, CardHeader } from "@/shadcn/ui/card";
import { Rating } from "@/shadcn/ui/rating";
import dayjs from "dayjs";
import { FC } from "react";

import {
  Hourglass,
  Info,
  LucideUploadCloud as LastUpdated,
  Users,
} from "lucide-react";

const CourseDetailsPage: FC = () => {
  const courses = useDummyData();

  if (courses.length === 0) return <div>Loading...</div>;
  const course = courses[2];
  return (
    <div className="flex flex-col gap-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="flex-row h-64 justify-between overflow-hidden flex">
        <CardContent className="p-6  flex flex-col justify-between w-full">
          <h2 className="font-semibold text-3xl line-clamp-3 text-ellipsis">
            {course.title}
          </h2>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between w-full items-center text-xs">
              <div className="flex gap-2 items-end">
                <Info className="text-muted-foreground size-5" />
                <span className="text-muted-foreground">Intermediate</span>
              </div>
              <div className="flex gap-2 items-end">
                <Users className="text-muted-foreground size-5" />
                <span className="text-muted-foreground">234 enrolled</span>
              </div>
              <div className="flex gap-2 items-end">
                <Hourglass className="text-muted-foreground size-5" />
                <span className="text-muted-foreground">12 hours</span>
              </div>
              <div className="flex gap-2 items-end">
                <LastUpdated className="text-muted-foreground size-5" />
                <span className="text-muted-foreground">
                  Updated {dayjs(new Date()).format("DD/MM/YYYY")}
                </span>
              </div>
            </div>
            <div className="flex gap-2 items-baseline leading-none">
              <div className="font-medium text-foreground text-xl flex gap-2 items-center">
                4.6{" "}
                <Rating
                  rating={4.6}
                  size={16}
                  filledClassName="text-amber-400"
                />
              </div>
              <p className="text-sm text-muted-foreground">from 234 reviews</p>
            </div>
          </div>
        </CardContent>

        <CardHeader className="w-80 h-full p-0 shrink-0">
          <img
            src={"https://fireship.io/courses/js/img/featured.webp"}
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
