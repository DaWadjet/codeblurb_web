import CourseItem from "@/components/common/courses/CourseItem";
import CourseList from "@/components/common/courses/CourseList";
import { useDummyData } from "@/hooks/useDummyData";
import { FC } from "react";

const HomePage: FC = () => {
  const items = useDummyData();

  return (
    <CourseList
      items={items.map((item, index) => (
        <CourseItem course={item} key={item.id! + "_" + index} />
      ))}
      autoplay
    />
  );
};

export default HomePage;
