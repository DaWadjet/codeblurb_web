import { TCourseInfo } from "@/utils/types";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { Link } from "react-router-dom";
import ProgressBar from "../ProgressBar";
import Rating from "../Rating";

const CourseGridItem: FC<{
  course: Omit<TCourseInfo, "price"> &
    (
      | {
          price: number;
        }
      | {
          progress: number;
        }
    );
  useBigImageLayout?: boolean;
}> = ({ course, useBigImageLayout }) => {
  return (
    <Link to={`/course/${course.id}`}>
      {"progress" in course && !useBigImageLayout ? (
        <div className="flex h-[136] flex-shrink-0 flex-col justify-between rounded-sm bg-gray-100 transition-all duration-200 hover:bg-gray-200 hover:shadow-lg">
          <div className="flex h-[132px] gap-3 p-3">
            <img
              src={course.image}
              alt={course.title}
              className="h-28 w-28 rounded-sm object-cover"
            />
            <div className="flex flex-col justify-between">
              <h3 className="text-base font-bold">{course.title}</h3>
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">{course.technology}</p>

                <p className="text-sm text-gray-500">
                  {" "}
                  <span className="text-amber-500">&#9733;</span>{" "}
                  {course.rating}
                </p>
                {/* Add better rating design */}
              </div>
            </div>
          </div>
          <ProgressBar progress={course.progress} />
        </div>
      ) : (
        <div className="flex flex-shrink-0 flex-col  rounded-md p-3 transition-all duration-200 hover:bg-gray-100 hover:shadow-md">
          <div className="relative h-40">
            <img
              src={course.image}
              alt={course.title}
              className="h-full w-full rounded-md object-cover drop-shadow-lg"
            />
            {!("progress" in course) && (
              <FontAwesomeIcon
                icon={faShoppingBasket}
                className="absolute bottom-2 right-2 h-6 w-6 cursor-pointer rounded-sm border border-black bg-white p-1 shadow-lg transition-all duration-200 hover:bg-gray-200"
              />
            )}
          </div>

          <h3 className="mt-2 line-clamp-2 h-12 text-base font-bold">
            {course.title}
          </h3>
          <div className="flex items-center justify-between">
            <Rating rating={course.rating} starSize={14} />
            <p className="text-xs text-gray-500">{course.technology}</p>
          </div>
          {"progress" in course && (
            <ProgressBar progress={course.progress} shouldShowBorder />
          )}
        </div>
      )}
    </Link>
  );
};

export default CourseGridItem;
