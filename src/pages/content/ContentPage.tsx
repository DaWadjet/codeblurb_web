import ArticleContent from "@/pages/content/ArticleContent";
import ScratchContent from "@/pages/content/ScratchContent";
import VideoContent from "@/pages/content/VideoContent";

import DragAndDropContent from "@/pages/content/DragAndDropContent";
import FillInTheGapsContent from "@/pages/content/FillInTheGapsContent";
import QuizContent from "@/pages/content/QuizContent";

import { Label } from "@/shadcn/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";
import { FC, useState } from "react";

const contentTypePossibilities = [
  "article",
  "video",
  "quiz",
  "scratch",
  "draganddrop",
  "fillthegap",
] as const;

const ContentPage: FC = () => {
  const [activeTab, setActiveTab] =
    useState<(typeof contentTypePossibilities)[number]>("article");
  return (
    <div className="flex flex-col gap-5 h-full">
      <div className="flex flex-col items-start gap-1.5">
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
