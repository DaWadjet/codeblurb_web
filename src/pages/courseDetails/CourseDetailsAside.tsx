import RatingSection from "@/pages/courseDetails/RatingSection";
import { BackgroundGradient } from "@/shadcn/ui/background-gradient";
import { Button } from "@/shadcn/ui/button";
import { Progress } from "@/shadcn/ui/progress";
import { Rating } from "@/shadcn/ui/rating";

import useCourseDetailsStore from "@/store/courseDetailsStore";
import { FC, useCallback } from "react";

const CourseDetailsAside: FC = () => {
  const selectedTab = useCourseDetailsStore(
    useCallback((state) => state.selectedTab, [])
  );
  return (
    <aside className="sticky flex-[3] top-24 z-50 mt-2 h-48 w-full">
      {selectedTab === "summary" && (
        <BackgroundGradient effectClassName="blur-sm rounded-lg">
          <Button
            className="w-full h-16 text-xl font-semibold hover:bg-background"
            variant="outline"
          >
            Add To Cart
          </Button>
        </BackgroundGradient>
      )}

      {selectedTab === "reviews" && (
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-1.5">
            <h3 className="text-xl font-medium">Rating Distribution</h3>
            <div className="flex items-end justify-between">
              <h6 className="font-medium text-muted-foreground">
                4.6 Course Rating
              </h6>
              <p className="text-sm text-muted-foreground">from 234 reviews</p>
            </div>
            <div className="flex flex-row items-center gap-3 leading-tight">
              <Progress value={73} className="h-2" />
              <Rating rating={5} size={14} />
            </div>
            <div className="flex flex-row items-center gap-3">
              <Progress value={23} className="h-2" />
              <Rating rating={4} size={14} />
            </div>
            <div className="flex flex-row items-center gap-3">
              <Progress value={6} className="h-2" />
              <Rating rating={3} size={14} />
            </div>
            <div className="flex flex-row items-center gap-3">
              <Progress value={1} className="h-2" />
              <Rating rating={2} size={14} />
            </div>
            <div className="flex flex-row items-center gap-3">
              <Progress value={0.05} className="h-2" />
              <Rating rating={1} size={14} />
            </div>
          </div>
          <RatingSection />
        </div>
      )}
    </aside>
  );
};

export default CourseDetailsAside;
