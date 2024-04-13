import ProgressBar from "@/components/common/ProgressBar";
import Rating from "@/components/common/Rating";
import RatingSection from "@/pages/courseDetails/RatingSection";
import useCourseDetailsStore from "@/store/courseDetailsStore";
import { FC, useCallback } from "react";

const CourseDetailsAside: FC = () => {
  const selectedTab = useCourseDetailsStore(
    useCallback((state) => state.selectedTab, [])
  );
  return (
    <aside className="sticky top-20 z-50 mt-20 h-48 w-72">
      {selectedTab === 0 && <div></div>}
      {selectedTab === 1 && (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-medium">Rating Distribution</h3>
            <div className="flex items-end justify-between">
              <h6 className="font-semibold">4.6 Course Rating</h6>
              <p className="text-sm text-gray-400">from 234 ratings</p>
            </div>
            <div className="flex w-full flex-col">
              <div className="flex flex-row items-center gap-3 leading-tight">
                <ProgressBar
                  progress={0.73}
                  shouldShowBorder
                  className="h-2.5 flex-1"
                />
                <Rating rating={5} starSize={20} />
              </div>
              <div className="flex flex-row items-center gap-3">
                <ProgressBar
                  progress={0.23}
                  shouldShowBorder
                  className="h-2.5 flex-1"
                />
                <Rating rating={4} starSize={20} />
              </div>
              <div className="flex flex-row items-center gap-3">
                <ProgressBar
                  progress={0.06}
                  shouldShowBorder
                  className="h-2.5 flex-1"
                />
                <Rating rating={3} starSize={20} />
              </div>
              <div className="flex flex-row items-center gap-3">
                <ProgressBar
                  progress={0.01}
                  shouldShowBorder
                  className="h-2.5 flex-1"
                />
                <Rating rating={2} starSize={20} />
              </div>
              <div className="flex flex-row items-center gap-3">
                <ProgressBar
                  progress={0.05}
                  shouldShowBorder
                  className="h-2.5 flex-1"
                />
                <Rating rating={1} starSize={20} />
              </div>
            </div>
          </div>

          <RatingSection />
        </div>
      )}
    </aside>
  );
};

export default CourseDetailsAside;
