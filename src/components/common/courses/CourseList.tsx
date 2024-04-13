import { TCourseInfo } from "@/utils/types";
import { FC } from "react";

import { cn } from "@/shadcnutils";

const CourseList: FC<{
  slideCount?: number;
  autoplay?: boolean;
  courses: TCourseInfo[] & { progress?: number };
  title: string;
  className?: string;
}> = ({ courses, title, className, slideCount = 3, autoplay }) => {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-4 border-b border-gray-200 pb-2 last:border-none",
        className
      )}
    >
      <h2 className="text-2xl font-bold">{title}</h2>
      {/*   <Swiper
        key={title}
        slidesPerView={slideCount}
        modules={[Autoplay]}
        spaceBetween={10}
        loop
        autoplay={
          autoplay ? { disableOnInteraction: true, delay: 5000 } : undefined
        }
        className="relative max-h-full min-h-0 w-full min-w-0 max-w-full  pb-1"
      >
        <CourseListStepper step={3} direction="next" />
        {courses.map((course) => (
          <SwiperSlide key={course.id + title}>
            <CourseGridItem course={course} />
          </SwiperSlide>
        ))}
      </Swiper> */}
    </div>
  );
};

export default CourseList;

const CourseListStepper: FC<{
  step: number;
  direction: "next" | "prev";
}> = ({ step, direction }) => {
  /* const swiper = useSwiper();
  const handleStep = useCallback(() => {
    if (direction === "next") {
      for (let i = 0; i < step; i++) {
        swiper.slideNext();
      }
    } else {
      for (let i = 0; i < step; i++) {
        swiper.slidePrev();
      }
    }
  }, [direction, step, swiper]); */

  return (
    <button
      className="absolute -right-4 bottom-0 z-10 h-10 w-10 transform rounded-full bg-gray-400 "
      onClick={() => {}}
    >
      {direction === "next" ? ">" : "<"}
    </button>
  );
};
