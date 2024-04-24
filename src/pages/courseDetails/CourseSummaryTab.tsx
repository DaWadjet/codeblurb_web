import { Card, CardContent, CardHeader } from "@/shadcn/ui/card";
import { dummySections } from "@/utils/dummyData";
import { FC } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shadcn/ui/accordion";

import useCourseDetailsQuery from "@/hooks/useCourseDetailsQuery";
import { HoverBorderGradient } from "@/shadcn/ui/hover-border-gradient";
import {
  NewspaperIcon as ArticleIcon,
  Code2 as CodeIcon,
  LucideMessageCircleQuestion as QuestionIcon,
  VideoIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const getIcon = (type: string) => {
  switch (type) {
    case "video":
      return <VideoIcon className="size-5 inline-block" />;
    case "article":
      return <ArticleIcon className="size-5 inline-block" />;
    case "question":
      return <QuestionIcon className="size-5 inline-block" />;
    case "code":
      return <CodeIcon className="size-5 inline-block" />;
    default:
      return null;
  }
};

const CourseSummaryTab: FC = () => {
  const navigate = useNavigate();
  const { data } = useCourseDetailsQuery();

  const nextUp = dummySections[0];
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Next Up</h2>
      <HoverBorderGradient
        as="button"
        containerClassName="rounded-lg w-full"
        className="rounded-lg w-full"
        onClick={() =>
          navigate(
            `/course/${data!.id}/content/${data?.includedQuizzes![0].id}`
          )
        }
      >
        <div className="flex justify-between p-0 border-none">
          <h4 className="font-medium w-full text-left">{nextUp.title}</h4>
          <div className="pb-1 mr-2 text-muted-foreground">
            {getIcon(nextUp.type)}
          </div>
        </div>
        <div className="flex justify-between pt-2 items-end gap-4 text-muted-foreground  flex-nowrap">
          <p>{nextUp.subtitle}</p>
          <span className="font-medium whitespace-nowrap">
            {nextUp.estimatedTime} min
          </span>
        </div>
      </HoverBorderGradient>

      <Card className="my-4">
        <CardHeader className="text-xl font-semibold">
          What you'll learn
        </CardHeader>
        <CardContent>
          JavaScript is the most popular programming language in the world. It
          powers the entire web development industry. So, if you want to become
          a web developer, JavaScript is a must-learn language. This course is
          perfect for complete beginners. This course will take you from a
          complete JavaScript beginner to an advanced developer. You will not
          just learn the JavaScript language itself, you will also learn how to
          program. How to solve problems. How to structure and organize code
          using common JavaScript patterns.
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold">Course Sections</h2>
      <Accordion
        type="single"
        collapsible
        className="flex w-full flex-col gap-3"
      >
        {dummySections.map((section) => (
          <AccordionItem
            value={section.id.toString()}
            key={section.id}
            className=" border-border border rounded-lg py-2.5 px-4"
          >
            <AccordionTrigger className="flex justify-between p-0 border-none">
              <h4 className="font-medium w-full text-left">{section.title}</h4>
              <div className="pb-1 mr-2 text-muted-foreground">
                {getIcon(section.type)}
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex justify-between pt-4 pb-1 items-end gap-4 text-muted-foreground  flex-nowrap">
              <p>{section.subtitle}</p>
              <span className="font-medium whitespace-nowrap">
                {section.estimatedTime} min
              </span>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default CourseSummaryTab;
