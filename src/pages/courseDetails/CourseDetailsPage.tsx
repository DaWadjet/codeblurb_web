import Rating from "@/components/common/Rating";
import CourseDetailsAside from "@/pages/courseDetails/CourseDetailsAside";
import CourseDetailsTabs from "@/pages/courseDetails/CourseDetailsTabs";
import { FC } from "react";

const course = {
  id: 10,
  title: "That Weird Javascript Course",
  technology: "JavaScript",
  rating: 4.0,
  image: "https://fireship.io/courses/js/img/featured.webp",
  price: 9.99,
};

const CourseDetailsPage: FC = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="relative flex justify-between rounded-md border border-gray-300">
        <div className="flex flex-col justify-between p-5">
          <h1 className="text-2xl font-semibold">{course.title}</h1>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-baseline gap-2">
              <Rating rating={course.rating} starSize={28} />
              <p className="text-gray-400">out of 234 ratings</p>
            </div>
            <div className="flex flex-row gap-3">
              <span>lastupdated</span>
              <span>language</span>
              <span>students total</span>
            </div>
          </div>
        </div>
        <img
          className="h-48 w-72 shadow-md"
          src={course.image}
          alt={course.title}
        />
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
