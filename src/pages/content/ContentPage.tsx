import ScratchContent from "@/pages/content/scratch/ScratchContent";
import VideoContent from "@/pages/content/VideoContent";

import DragAndDropContent from "@/pages/content/dragAndDrop/DragAndDropContent";
import FillInTheGapsContent from "@/pages/content/FillInTheGapsContent";
import QuizContent from "@/pages/content/QuizContent";

import BigLoader from "@/components/common/BigLoader";
import { ContentType, useViewedContent } from "@/hooks/useViewedContent";
import ArticleContent from "@/pages/content/ArticleContent";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shadcn/ui/breadcrumb";
import { FC, Fragment, useMemo } from "react";
import { Navigate } from "react-router-dom";

const ContentPage: FC = () => {
  const {
    viewedContent: content,
    isPending,
    courseTitle,
    courseId,
  } = useViewedContent();

  const contentType = useMemo<ContentType | null>(() => {
    if (!content) return null;
    if (content.contentType === "CODING") return content.codingContentType;
    return content.contentType;
  }, [content]);

  if (isPending) return <BigLoader />;
  if (!contentType || !content) return <Navigate to={`/course/${courseId}`} />;

  return (
    <div className="flex flex-col gap-8 ">
      <Breadcrumb className="w-full bg-background sticky top-0 z-10 h-10 pt-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/my-courses">My Courses</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/course/${courseId}`}>
              {courseTitle}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{content.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Fragment key={content.id}>
        {/* key is important to trigger remount */}
        {contentType === "ARTICLE" && <ArticleContent />}
        {contentType === "VIDEO" && <VideoContent />}
        {contentType === "SCRATCH" && <ScratchContent />}
        {contentType === "DRAG_AND_DROP" && <DragAndDropContent />}
        {contentType === "QUIZ" && <QuizContent />}
        {contentType === "FILL_THE_GAP" && <FillInTheGapsContent />}
      </Fragment>
    </div>
  );
};

export default ContentPage;
