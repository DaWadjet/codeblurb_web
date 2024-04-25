import qs from "qs";
import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import CourseReviewsTab from "@/pages/courseDetails/CourseRatingsTab";
import CourseSummaryTab from "@/pages/courseDetails/CourseSummaryTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/ui/tabs";

const CourseDetailsTabs: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { tab } = qs.parse(location.search, { ignoreQueryPrefix: true });

  return (
    <Tabs
      value={tab === "reviews" ? "reviews" : "summary"}
      onValueChange={(value) =>
        navigate({
          search: qs.stringify({
            tab: value,
          }),
        })
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
