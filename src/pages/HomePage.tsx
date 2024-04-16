import CourseItem from "@/components/common/courses/CourseItem";
import CourseList from "@/components/common/courses/CourseList";
import PurchasedCourseItem from "@/components/common/courses/PurchasedCourseItem";
import { useDummyData } from "@/hooks/useDummyData";
import { FC } from "react";

const HomePage: FC = () => {
  const items = useDummyData();

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-semibold">Continue Where You Left Off</h2>
        <CourseList
          items={items.map((item, index) => (
            <PurchasedCourseItem course={item} key={item.id! + "_" + index} />
          ))}
        />
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-semibold">Top Rated Courses</h2>
        <CourseList
          items={items.map((item, index) => (
            <CourseItem course={item} key={item.id! + "_" + index} />
          ))}
        />
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-semibold">Most Popular</h2>
        <CourseList
          items={items.map((item, index) => (
            <CourseItem course={item} key={item.id! + "_" + index} />
          ))}
          autoplay
        />
      </div>
    </div>
  );
};

export default HomePage;
