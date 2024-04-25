import ArticleContent from "@/pages/content/ArticleContent";
import ScratchContent from "@/pages/content/ScratchContent";
import VideoContent from "@/pages/content/VideoContent";

import DragAndDropContent from "@/pages/content/DragAndDropContent";
import FillInTheGapsContent from "@/pages/content/FillInTheGapsContent";
import QuizContent from "@/pages/content/QuizContent";

import BigLoader from "@/components/BigLoader";
import useViewedContent from "@/hooks/useViewedContent";
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
import { FC, Fragment, useState } from "react";
import { useParams } from "react-router-dom";

const contentTypePossibilities = [
  "article",
  "video",
  "quiz",
  "scratch",
  "draganddrop",
  "fillthegap",
] as const;

const ContentPage: FC = () => {
  const { courseId } = useParams<{
    courseId: string;
  }>();

  const { viewedContent: content, isPending, courseTitle } = useViewedContent();

  const [activeTab, setActiveTab] =
    useState<(typeof contentTypePossibilities)[number]>("article");

  if (isPending) return <BigLoader />;
  if (!content) return null; //should not happen

  return (
    <div className="flex flex-col gap-8 ">
      <div className="flex flex-col items-start gap-1.5 absolute top-24 left-5 ">
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
        {activeTab === "article" && <ArticleContent />}
        {activeTab === "video" && <VideoContent />}
        {activeTab === "scratch" && <ScratchContent />}
        {activeTab === "draganddrop" && <DragAndDropContent />}
        {activeTab === "quiz" && <QuizContent />}
        {activeTab === "fillthegap" && <FillInTheGapsContent />}
      </Fragment>
    </div>
  );
};

export default ContentPage;
