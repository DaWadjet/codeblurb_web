import { useContentBundleDetailsQuery } from "@/network/content";
import { useParams } from "react-router-dom";

const useCourseDetailsQuery = () => {
  const { courseId } = useParams<{ courseId: string }>();
  return useContentBundleDetailsQuery(Number(courseId));
};
export default useCourseDetailsQuery;
