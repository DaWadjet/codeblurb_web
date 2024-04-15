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
      <TabsList className="grid w-full grid-cols-2">
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
  {
    /* {selectedTab === 0 && (
        <div className="flex flex-col">
          <div className="flex flex-col gap-2 rounded-md border border-gray-300 p-5 ">
            <h2 className="text-xl font-semibold">What you'll learn</h2>
            <ul className="flex flex-col gap-2">
              <li>
                Learn the core JavaScript skills you need to apply for jobs or
                further your career in frontend development.
              </li>
              <li>
                Be able to sit for and pass the JavaScript Specialist
                Designation Exam.
              </li>
              <li>Build 5 Beautiful real-world projects for your portfolio!</li>
              <li>
                Learn how to apply for jobs as a junior frontend developer.
              </li>
              <li>
                Learn how to interview for frontend developer jobs with
                confidence.
              </li>
            </ul>
          </div>
          <h2 className="mb-3 mt-5 text-xl font-semibold">Course Sections</h2>
          <div className="flex flex-col gap-2">
            {dummySections.map((section) => (
              <div
                className="flex items-center rounded-md border border-gray-300 bg-slate-100 px-4 py-2 transition-all duration-200 hover:bg-slate-200 hover:shadow-sm"
                key={section.id}
              >
                <div className="flex flex-[4] flex-col gap-1">
                  <h4 className="line-clamp-1 font-semibold">
                    {section.title}
                  </h4>
                  <h6 className="line-clamp-1 text-gray-500">
                    {section.subtitle}
                  </h6>
                </div>
                <span className="flex-1 text-sm text-gray-500">
                  {section.type} - {section.estimatedTime} min
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      {selectedTab === 1 && (
        <div className="flex flex-col gap-5 border-t border-gray-300 pt-5">
          {dummyReviews.map((review) => (
            <div
              className="flex flex-col border-b border-gray-300 pb-5"
              key={review.id}
            >
              <div className="flex justify-between">
                <h4 className="text-lg font-semibold">{review.name}</h4>
                <p className="text-xs text-gray-400">{review.date}</p>
              </div>
              <Rating rating={review.rating} starSize={24} />
              <p className="text-base">{review.comment}</p>
            </div>
          ))}
        </div>
      )} */
  }
};

export default CourseDetailsTabs;
