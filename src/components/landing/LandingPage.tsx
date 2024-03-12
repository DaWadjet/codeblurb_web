import CodeEditor from "@/components/codeEditing/CodeEditor";
import DragAndDropTask from "@/components/dragAndDrop/DragAndDropTask";
import FillInTheGapsTask from "@/components/fillInTheGaps/FillInTheGapsTask";
import client from "@/network/axiosClient";
import { useMutation } from "@tanstack/react-query";
import { FC } from "react";

const LandingPage: FC = () => {
  const { mutate } = useMutation({
    mutationKey: [`cart`],
    mutationFn: async () => {
      const response = await client.get("shopping/available-shopping-items");
      console.log(response.data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <p onClick={() => mutate()}>LandingPage</p>
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
