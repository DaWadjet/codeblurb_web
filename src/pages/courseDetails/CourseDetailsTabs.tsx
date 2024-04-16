import useCourseDetailsStore from "@/store/courseDetailsStore";
import qs from "qs";
import { FC, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";

import CourseReviewsTab from "@/pages/courseDetails/CourseRatingsTab";
import CourseSummaryTab from "@/pages/courseDetails/CourseSummaryTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/ui/tabs";

const CourseDetailsTabs: FC = () => {
  const location = useLocation();
  const selectedTab = useCourseDetailsStore(
    useCallback((state) => state.selectedTab, [])
  );
  const setValue = useCourseDetailsStore(
    useCallback((state) => state.setValue, [])
  );

  const { tab } = qs.parse(location.search, { ignoreQueryPrefix: true });

  useEffect(() => {
    if (tab) {
      setValue("selectedTab", tab !== "reviews" ? "summary" : "reviews");
    }
  }, [tab, setValue]);

  return (
    <Tabs
      value={selectedTab}
      onValueChange={(value) =>
        setValue("selectedTab", value as typeof selectedTab)
      }
      defaultValue="summary"
      className="w-full flex-[7]"
    >
      <TabsList className="grid w-full grid-cols-2 mb-10">
        <TabsTrigger value="summary">Course Summary</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>
      <TabsContent value="summary">
        <CourseSummaryTab />
      </TabsContent>
      <TabsContent value="reviews">
        <CourseReviewsTab />
      </TabsContent>
    </Tabs>
  );
};

export default CourseDetailsTabs;
