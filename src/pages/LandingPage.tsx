import CodeEditor from "@/components/CodeEditor";
import { BackgroundGradient } from "@/shadcn/ui/background-gradient";
import { Button } from "@/shadcn/ui/button";
import { SparklesCore } from "@/shadcn/ui/sparkles";
import { TypewriterEffectSmooth } from "@/shadcn/ui/typewriter-effect";
import { Play } from "lucide-react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
const words = [
  {
    text: "Learn",
  },
  {
    text: "to",
  },
  {
    text: "<code/>",
    className: "text-amber-500 dark:text-amber-500",
  },
  {
    text: "with",
  },
  {
    text: "CodeBlurb.",
    className: "text-blue-500 dark:text-blue-500",
  },
];

const dummyCode = `public class ShortestSubarray {
  public static int findSubarray(int[] nums, int target) {
      // Your code here
      
  }

  public static void main(String[] args) {
      int[] nums = { 1, 2, 3, 10, 4, 2, 3 };
      int target = 12;
      System.out.println("Length of Shortest Subarray: " + findSubarray(nums, target)); // Output should be 3
  }
}
`;

const LandingPage: FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen">
        <div className="h-[20rem] my-12 w-full bg-background flex flex-col items-center justify-center overflow-hidden rounded-md">
          <h1 className="md:text-5xl text-2xl lg:text-7xl font-bold text-center text-foreground relative z-20 pb-4">
            CodeBlurb
          </h1>
          <div className="w-[40rem] h-40 relative">
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={1200}
              className="w-full h-full"
            />

            <div className="absolute inset-0 w-full h-full bg-background [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
          </div>
        </div>
        <TypewriterEffectSmooth
          words={words}
          className="flex items-center justify-center"
        />
        <div className="text-center mt-8">
          <p className="text-xl font-medium">
            {
              "CodeBlurb is a platform where you can learn to code with ease.\nWe provide a wide range of courses to help you get started with coding or to smash your next interview!"
            }
          </p>
        </div>

        <div className="flex justify-center text-center mt-12">
          <BackgroundGradient effectClassName="blur-sm rounded-lg">
            <Button
              className="w-full p-5 h-16 leading-none text-3xl font-semibold hover:bg-background"
              variant="outline"
              onClick={() => navigate("/register")}
            >
              Get Started!
            </Button>
          </BackgroundGradient>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <h2 className="lg:text-3xl font-semibold text-xl">Not convinced?</h2>
          <p className="lg:text-xl text-base font-medium">
            Take a look at examples of what awaits you on CodeBlurb.
          </p>
        </div>

        <div className="flex flex-col mt-8">
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-semibold">
              An integrated editor to tackle challenges!
            </h2>
            <div className="flex gap-4 justify-between items-end">
              <span>
                Implement the <code>findSubarray</code> method to find the
                length of the shortest subarray in the given array{" "}
                <code>nums</code>, such that the product of all its elements is
                less than the given target. If no such subarray exists, return{" "}
                <code>-1</code>. Ensure your solution has an efficient time
                complexity.
              </span>
            </div>
            <Button
              onClick={() => toast.success("Sign up to check your code!")}
              className="flex  w-fit self-end font-semibold"
            >
              <Play className="mr-2 h-4 w-4" />
              Run Code!
            </Button>
            <CodeEditor
              initialCode={dummyCode}
              onCodeChange={(value) => {
                value;
              }}
            />
          </div>
        </div>
        <div className="flex gap-2 justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold">
              A mobile app to accompany the web platform!
            </h2>
            <p>Watch videos, read articles or write code on the go!</p>
          </div>

          {/* TODO add mockups  of the app */}
          <img src="/mobileapp.png" alt="Mobile App" className="w-1/3 h-auto" />
        </div>

        <h2 className="text-xl font-semibold">
          ... and wide range of courses to choose from!
        </h2>
        <div className="flex justify-center text-center mt-12">
          <BackgroundGradient effectClassName="blur-sm rounded-lg">
            <Button
              className="w-full p-5 h-16 leading-none text-3xl font-semibold hover:bg-background"
              variant="outline"
              onClick={() => navigate("/register")}
            >
              I'm in!
            </Button>
          </BackgroundGradient>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
