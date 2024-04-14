import RatingFilter from "@/pages/myCourses/RatingFilter";
import { FC } from "react";

const MyCoursesPage: FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-2xl font-bold">Your Courses</h2>
      <div className="flex gap-3">
        <RatingFilter />
      </div>
      <div className="grid grid-cols-4 gap-x-4 gap-y-6"></div>
    </div>
  );
};

export default MyCoursesPage;
