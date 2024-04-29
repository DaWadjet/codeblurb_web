import { Card, CardContent, CardHeader } from "@/shadcn/ui/card";
import { FC } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shadcn/ui/accordion";

import useCourseDetailsMagicQuery from "@/hooks/useCourseDetailsMagicQuery";
import NextUpSection from "@/pages/courseDetails/NextUpSection";

import ContentTypeIcon from "@/pages/courseDetails/ContentTypeIcon";
import { HoverBorderGradient } from "@/shadcn/ui/hover-border-gradient";
import { cn } from "@/shadcnutils";
import { Play } from "lucide-react";
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
            className={cn(
              //TODO might need to change this back
              "border-border border rounded-lg hover:bg-accent transition-all",
              section.status === "SEEN" && "bg-muted-foreground/5",
              section.status === "COMPLETED" && "bg-muted-foreground/15"
            )}
          >
            <AccordionTrigger className="flex justify-between p-0 border-none py-2.5 px-4 ">
              <h4 className="font-medium w-full text-left">{section.name}</h4>
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
