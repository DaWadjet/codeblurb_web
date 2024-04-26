import BigLoader from "@/components/common/BigLoader";
import CourseItem from "@/components/common/courses/CourseItem";
import CourseList from "@/components/common/courses/CourseList";
import PurchasedCourseItem from "@/components/common/courses/PurchasedCourseItem";
import { useContentBundlesQuery } from "@/network/content";
import { useAvailableShoppingItemsQuery } from "@/network/shopping";
import { FC } from "react";

const HomePage: FC = () => {
  const { data: purchasedCourses, isPending: isPending_Purchased } =
    useContentBundlesQuery();

  const { data: mostPopularData, isPending: isPending_MostPopular } =
    useAvailableShoppingItemsQuery({
      title: "",
      skills: null,
      sort: {
        property: "popularity",
        ascending: false,
      },
    });

  const { data: topRatedData, isPending: isPending_TopRated } =
    useAvailableShoppingItemsQuery({
      title: "",
      skills: null,
      sort: {
        property: "rating",
        ascending: false,
      },
    });

  if (isPending_Purchased || isPending_MostPopular || isPending_TopRated) {
    return <BigLoader />;
  }

  return (
    <div className="flex flex-col gap-7">
      {Boolean(purchasedCourses?.items?.length) && (
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-semibold">
            Continue Where You Left Off
          </h2>
          <CourseList
            items={(purchasedCourses?.items ?? []).map((item) => (
              <PurchasedCourseItem course={item!} key={item!.id} />
            ))}
          />
        </div>
      )}
      {Boolean(mostPopularData?.items?.length) && (
        <div className="flex flex-col gap-4">
          {/* TODO remove duplicates */}
          <h2 className="text-3xl font-semibold">Top Rated Courses</h2>
          <CourseList
            items={[
              ...(mostPopularData?.items ?? []),
              ...(mostPopularData?.items ?? []),
            ].map((item, index) => (
              <CourseItem course={item!} key={index} />
            ))}
          />
        </div>
      )}
      {Boolean(topRatedData?.items?.length) && (
        <div className="flex flex-col gap-4">
          {/* TODO remove duplicates */}
          <h2 className="text-3xl font-semibold">Most Popular</h2>
          <CourseList
            items={[
              ...(topRatedData?.items ?? []),
              ...(topRatedData?.items ?? []),
            ].map((item, index) => (
              <CourseItem course={item!} key={index} />
            ))}
            autoplay
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;
