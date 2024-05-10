import useCourseDetailsMagicQuery from "@/hooks/useCourseDetailsMagicQuery";
import ContentTypeIcon from "@/pages/courseDetails/ContentTypeIcon";
import { HoverBorderGradient } from "@/shadcn/ui/hover-border-gradient";
import { FC, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const NextUpSection: FC = () => {
  const navigate = useNavigate();
  const { course } = useCourseDetailsMagicQuery();

  const nextUp = useMemo(
    () =>
      course.purchasedContents.find((content) => content.status === "NOT_SEEN"),
    [course.purchasedContents]
  );
  if (!nextUp) return null;

  return (
    <>
      <h2 className="text-xl font-semibold">Next Up</h2>
      <HoverBorderGradient
        as="button"
        containerClassName="rounded-lg w-full"
        className="rounded-lg w-full transition-all"
        onClick={() => navigate(`/course/${course.id}/content/${nextUp.id}`)}
      >
        <div className="flex justify-between p-0 border-none">
          <h4 className="font-medium w-full text-left">{nextUp.name}</h4>
          <div className="pb-1 mr-2 text-muted-foreground">
            <ContentTypeIcon type={nextUp.contentType} />
          </div>
        </div>
        <div className="flex justify-between pt-2 items-end gap-4 text-muted-foreground  flex-nowrap">
          <p>{nextUp.shortDescription}</p>
          <span className="font-medium whitespace-nowrap">
            {nextUp.estimatedTime} min
          </span>
        </div>
      </HoverBorderGradient>
    </>
  );
};

export default NextUpSection;
