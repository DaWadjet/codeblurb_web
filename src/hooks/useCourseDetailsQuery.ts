import { useContentBundleDetailsQuery } from "@/network/content";
import { useParams } from "react-router-dom";

const useCourseDetailsQuery = () => {
  const { courseId } = useParams<{ courseId: string }>();
  return useContentBundleDetailsQuery({
    id: Number(courseId),
  });
};
export default useCourseDetailsQuery;
