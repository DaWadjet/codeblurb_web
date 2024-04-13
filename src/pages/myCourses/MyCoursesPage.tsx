import CourseGridItem from "@/components/common/courses/CourseGridItem";
import RatingFilter from "@/pages/myCourses/RatingFilter";
import { dummyCourses } from "@/utils/dummyData";
import shuffle from "lodash/shuffle";
import { FC } from "react";

const MyCoursesPage: FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-2xl font-bold">Your Courses</h2>
      <div className="flex gap-3">
        <RatingFilter />
      </div>
      <div className="grid grid-cols-4 gap-x-4 gap-y-6">
        {shuffle(dummyCourses).map((course, index) => (
          <CourseGridItem
            course={{ ...course, progress: index / dummyCourses.length }}
            key={course.id}
            useBigImageLayout
          />
        ))}
      </div>
    </div>
  );
};

export default MyCoursesPage;
