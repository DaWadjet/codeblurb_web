import CodeEditor from "@/components/codeEditing/CodeEditor";
import DragAndDropTask from "@/components/dragAndDrop/DragAndDropTask";
import FillInTheGapsTask from "@/components/fillInTheGaps/FillInTheGapsTask";
import { useAvailableShoppingItemsQuery } from "@/network/shopping";
import { FC } from "react";

const LandingPage: FC = () => {
  const { data } = useAvailableShoppingItemsQuery();
  if (data) {
    console.log(data);
  }
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <CodeEditor />
      <DragAndDropTask />
      <FillInTheGapsTask
        textParts={[
          "lorem ipsum",
          "dolor sit amet",
          "egyketha negyothat hetnyolckilenc",
          "blablablabla asg sa g",
          "lorem ipsum",
          "dolor sit amet sadg asg asg   sag a",
          "egyketha negyothat hetnyolckilenc",
          "blablablabla",
          "lorem ipsum sa gs",
          "dolor sit amet",
          "egyketha negyothat hetnyolckilenc",
          "blablablabla",
        ]}
        solutions={[
          "a",
          "a",
          "a",
          "a",
          "a",
          "a",
          "a",
          "a",
          "a",
          "a",
          "a",
          "a",
          "a",
        ]}
      />
    </div>
  );
};

export default LandingPage;
