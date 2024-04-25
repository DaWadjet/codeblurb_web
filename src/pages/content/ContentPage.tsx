import ScratchContent from "@/pages/content/scratch/ScratchContent";
import VideoContent from "@/pages/content/VideoContent";

import DragAndDropContent from "@/pages/content/DragAndDropContent";
import FillInTheGapsContent from "@/pages/content/FillInTheGapsContent";
import QuizContent from "@/pages/content/QuizContent";

import BigLoader from "@/components/common/BigLoader";
import {
  ContentType,
  contentTypePossibilities,
  useViewedContent,
} from "@/hooks/useViewedContent";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shadcn/ui/breadcrumb";
import { Label } from "@/shadcn/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";
import { FC, Fragment, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

const ContentPage: FC = () => {
  const { courseId } = useParams<{
    courseId: string;
  }>();

  const { viewedContent: content, isPending, courseTitle } = useViewedContent();

  const contentType = useMemo<ContentType | null>(() => {
    if (!content) return null;
    if (content.contentType === "CODING") return content.codingContentType;
    return content.contentType;
  }, [content]);

  const [activeTab, setActiveTab] = useState(contentType ?? "QUIZ");

  if (isPending) return <BigLoader />;
  if (!contentType || !content) return null; //should not happen

  return (
    <div className="flex flex-col gap-8 ">
      <div className="flex flex-col items-start gap-1.5 absolute top-0 left-5 ">
        <Label htmlFor="type">Content Type</Label>
        <Select
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as typeof activeTab)}
        >
          <SelectTrigger className="w-52">
            <SelectValue id="type" placeholder="Content type" />
          </SelectTrigger>
          <SelectContent className="w-52">
            {contentTypePossibilities.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Breadcrumb className="w-full bg-background sticky top-0 h-10 pt-2">
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
        {/* {activeTab === "ARTICLE" && <ArticleContent />} */}
        {activeTab === "VIDEO" && <VideoContent />}
        {activeTab === "SCRATCH" && <ScratchContent />}
        {activeTab === "DRAG_AND_DROP" && <DragAndDropContent />}
        {activeTab === "QUIZ" && <QuizContent />}
        {activeTab === "FILL_THE_GAP" && <FillInTheGapsContent />}
      </Fragment>
    </div>
  );
};

export default ContentPage;
