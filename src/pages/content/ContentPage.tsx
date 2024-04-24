import ArticleContent from "@/pages/content/ArticleContent";
import ScratchContent from "@/pages/content/ScratchContent";
import VideoContent from "@/pages/content/VideoContent";

import DragAndDropContent from "@/pages/content/DragAndDropContent";
import FillInTheGapsContent from "@/pages/content/FillInTheGapsContent";
import QuizContent from "@/pages/content/QuizContent";

import BigLoader from "@/components/BigLoader";
import useCourseDetailsQuery from "@/hooks/useCourseDetailsQuery";
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
import { FC, useMemo, useState } from "react";
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
  const { contentId, courseId } = useParams<{
    courseId: string;
    contentId: string;
  }>();
  const { data, isPending } = useCourseDetailsQuery();

  const content = useMemo(() => {
    if (!data) return null;

    const includedContent = [
      ...(data?.includedCodings ?? []),
      ...(data?.includedVideos ?? []),
      ...(data?.includedQuizzes ?? []),
    ];
    console.log(includedContent.map((item) => item.id));
    return includedContent.find((item) => item.id === Number(contentId));
  }, [data, contentId]);

  const [activeTab, setActiveTab] =
    useState<(typeof contentTypePossibilities)[number]>("article");

  if (isPending) return <BigLoader />;
  if (!content) return null; //should not happen

  return (
    <div
      className="flex flex-col gap-5"
      style={{
        height: "calc(100vh - 148px)",
      }}
    >
      <div className="flex flex-col items-start gap-1.5 absolute top-24 left-5">
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
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/my-courses">My Courses</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/courses/${courseId}`}>
              {data?.title}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{content.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {activeTab === "article" && <ArticleContent />}
      {activeTab === "video" && <VideoContent />}
      {activeTab === "scratch" && <ScratchContent />}
      {activeTab === "draganddrop" && <DragAndDropContent />}
      {activeTab === "quiz" && <QuizContent />}
      {activeTab === "fillthegap" && <FillInTheGapsContent />}
    </div>
  );
};

export default ContentPage;
