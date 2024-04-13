import CourseList from "@/components/common/courses/CourseList";
import { dummyCourses } from "@/utils/dummyData";
import shuffle from "lodash/shuffle";
import { FC } from "react";

const HomePage: FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <CourseList
        courses={dummyCourses.map((c) => ({ ...c, progress: 0.5 }))}
        title="Continue Where You Left Off"
        className="pb-6"
      />
      <CourseList
        courses={shuffle(dummyCourses)}
        title="Top Rated Courses"
        slideCount={4}
      />

      <CourseList
        courses={shuffle(dummyCourses)}
        title="Most Popular"
        slideCount={4}
        autoplay
      />
    </div>
  );
};

export default HomePage;
