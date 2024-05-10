import { Card, CardContent, CardHeader } from "@/shadcn/ui/card";
import { FC } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shadcn/ui/accordion";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shadcn/ui/tooltip";

import useCourseDetailsMagicQuery from "@/hooks/useCourseDetailsMagicQuery";
import NextUpSection from "@/pages/courseDetails/NextUpSection";

import ContentTypeIcon from "@/pages/courseDetails/ContentTypeIcon";
import { HoverBorderGradient } from "@/shadcn/ui/hover-border-gradient";
import { Eye, Play, SquareCheckBig } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CourseSummaryTab: FC = () => {
  const navigate = useNavigate();
  const { course } = useCourseDetailsMagicQuery();

  return (
    <div className="flex flex-col gap-4">
      {course.isPurchased && <NextUpSection />}
      <Card className="my-4">
        <CardHeader className="text-xl font-semibold">
          What you'll learn
        </CardHeader>
        <CardContent>{course.description}</CardContent>
      </Card>

      <h2 className="text-xl font-semibold">Course Sections</h2>
      <Accordion
        type="single"
        collapsible
        className="flex w-full flex-col gap-3"
      >
        {(course.isPurchased
          ? course.purchasedContents
          : course.contentsVisibleWithoutPurchase
        ).map((section) => (
          <AccordionItem
            value={section.id!.toString()}
            key={section.id}
            className="border-border border rounded-lg hover:bg-accent transition-all"
          >
            <AccordionTrigger className="flex justify-between p-0 border-none py-2.5 px-4">
              <div className="flex items-center gap-4 w-full justify-start">
                <h4 className="font-medium text-left">{section.name}</h4>
                {section.status === "COMPLETED" && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SquareCheckBig className="size-5 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent align="center">
                        <p>You have completed this section!</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                {section.status === "SEEN" && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Eye className="size-5 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent align="center">
                        <p>
                          You have visited this section, but haven't completed
                          it.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>

              <div className="pb-1 mr-2 text-muted-foreground">
                <ContentTypeIcon type={section.contentType} />
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 pt-4 px-4 pb-2.5">
              <div className="flex justify-between items-end gap-4 text-muted-foreground flex-nowrap ">
                <p>{section.shortDescription}</p>
                <span className="font-medium whitespace-nowrap">
                  {section.estimatedTime} min
                </span>
              </div>
              {course.isPurchased && (
                <HoverBorderGradient
                  duration={0.5}
                  as="button"
                  containerClassName="rounded-lg self-end"
                  className="rounded-lg p-2"
                  onClick={() =>
                    navigate(`/course/${course.id}/content/${section.id}`)
                  }
                >
                  <Play className="size-5 inline-block" />
                </HoverBorderGradient>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default CourseSummaryTab;
