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
import { FC } from "react";

const CourseDetailsPage: FC = () => {
  const courses = useDummyData();

  if (courses.length === 0) return <div>Loading...</div>;
  const course = courses[0];
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

      <div className="relative flex justify-between rounded-md border border-gray-300">
        <div className="flex flex-col justify-between p-5">
          <h1 className="text-2xl font-semibold">{course.title}</h1>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-baseline gap-2">
              <p className="text-gray-400">out of 234 ratings</p>
            </div>
            <div className="flex flex-row gap-3">
              <span>lastupdated</span>
              <span>language</span>
              <span>students total</span>
            </div>
          </div>
        </div>
        {/* <img
          className="h-48 w-72 shadow-md"
          src={course.image}
          alt={course.title}
        /> */}
        <div className="absolute bottom-0 right-0 z-10 flex h-16 w-72 translate-y-16 items-center justify-center rounded-b-md border border-t-0 border-gray-300 bg-white p-3 shadow-lg">
          <button className="flex flex-grow items-center justify-center rounded-lg bg-blue-500 px-4 py-2.5 leading-tight text-white transition-all duration-200 hover:bg-blue-400 hover:shadow-lg">
            Add to cart
          </button>
        </div>
      </div>
      <div className="flex gap-16">
        <CourseDetailsTabs />
        <CourseDetailsAside />
      </div>
    </div>
  );
};

export default CourseDetailsPage;
