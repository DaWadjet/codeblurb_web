import { useContentBundleDetailsQuery } from "@/network/content";
import { usePaymentsQuery } from "@/network/payments";
import { useShoppingItemDetailsQuery } from "@/network/shopping";
import {
  ArticleContent,
  DragAndDropContent,
  FillInTheGapsContent,
  QuizContent,
  ScratchContent,
  VideoContent,
} from "@/types/ApiTypes";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

const useCourseDetailsMagicQuery = () => {
  const { courseId } = useParams<{
    courseId: string;
  }>();
  const {
    data: paymentData,
    isSuccess: hasQueriedPaymentData,
    isPending: isPaymentsPending,
  } = usePaymentsQuery();

  const hasPurchasedCourseWithId = useMemo(() => {
    if (hasQueriedPaymentData === false) return "CHECKING";
    return Boolean(
      (paymentData.previousPayments ?? [])
        .filter((payment) => payment.status === "PAID")
        .flatMap((payment) => payment.boughtContentBundles)
        .find((course) => course?.id === Number(courseId))
    );
  }, [paymentData, courseId, hasQueriedPaymentData]);

  const enabledQuery = useMemo(() => {
    if (hasPurchasedCourseWithId === "CHECKING") return "NONE";
    if (hasPurchasedCourseWithId) return "CONTENT_BUNDLE_DETAILS_QUERY";
    return "SHOPPING_ITEM_DETAILS_QUERY";
  }, [hasPurchasedCourseWithId]);

  const { data: courseDetails, isLoading: isCourseDetailsPending } =
    useContentBundleDetailsQuery({
      id: Number(courseId),
      enabled: enabledQuery === "CONTENT_BUNDLE_DETAILS_QUERY",
    });

  const { data: shoppingItemDetails, isLoading: isShoppingItemDetailsPending } =
    useShoppingItemDetailsQuery({
      id: Number(courseId),
      enabled: enabledQuery === "SHOPPING_ITEM_DETAILS_QUERY",
    });

  const course = useMemo(() => {
    const contentsVisibleWithoutPurchase =
      shoppingItemDetails?.contentBundle?.includedContent ?? [];
    const purchasedContents = [
      ...((courseDetails?.includedVideos ?? []) as VideoContent[]),
      ...((courseDetails?.includedQuizzes ?? []) as QuizContent[]),
      ...((courseDetails?.includedCodings ?? []) as (
        | ScratchContent
        | DragAndDropContent
        | FillInTheGapsContent
      )[]),
      dummyArticleContent,
    ].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    const totalHours =
      (hasPurchasedCourseWithId
        ? contentsVisibleWithoutPurchase.reduce((acc, content) => {
            return acc + (content.estimatedTime ?? 0);
          }, 0)
        : purchasedContents.reduce((acc, content) => {
            return acc + (content.estimatedTime ?? 0);
          }, 0)) / 60;

    return {
      isPurchased: Boolean(hasPurchasedCourseWithId),
      id: courseDetails?.id ?? shoppingItemDetails?.id ?? Number(courseId),
      title: courseDetails?.title ?? shoppingItemDetails?.title ?? "",
      description:
        courseDetails?.description ??
        shoppingItemDetails?.contentBundle?.description ??
        "",
      price: shoppingItemDetails?.price ?? 0,
      releaseDate:
        courseDetails?.releaseDate ??
        shoppingItemDetails?.contentBundle?.releaseDate ??
        "",
      ratings: courseDetails?.ratings ??
        shoppingItemDetails?.ratings ?? {
          averageRating: 0,
          numberOfRatings: 0,
          ratings: [],
        },
      numberOfPurchases:
        courseDetails?.numberOfPurchases ??
        shoppingItemDetails?.numberOfPurchases ??
        0,
      imageUrl:
        courseDetails?.imageUrl ?? shoppingItemDetails?.contentBundle?.imageUrl,
      skillLevel:
        courseDetails?.skillLevel ??
        shoppingItemDetails?.contentBundle?.skillLevel ??
        "",
      progress: courseDetails?.progress ?? 0,
      contentsVisibleWithoutPurchase,
      purchasedContents,
      technologies: ["Java"],
      totalHours,
    };
  }, [courseDetails, shoppingItemDetails, courseId, hasPurchasedCourseWithId]);

  const returnValue = useMemo(() => {
    return {
      course,
      isLoading:
        isCourseDetailsPending ||
        isShoppingItemDetailsPending ||
        isPaymentsPending,
    };
  }, [
    course,
    isCourseDetailsPending,
    isShoppingItemDetailsPending,
    isPaymentsPending,
  ]);

  return returnValue;
};

export default useCourseDetailsMagicQuery;
const markdown = `
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level \`parserOptions\` property like this:

\`\`\`javascript
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
\`\`\`

- Replace \`plugin:@typescript-eslint/recommended\` to \`plugin:@typescript-eslint/recommended-type-checked\` or \`plugin:@typescript-eslint/strict-type-checked\`
- Optionally add \`plugin:@typescript-eslint/stylistic-type-checked\`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add \`plugin:react/recommended\` & \`plugin:react/jsx-runtime\` to the \`extends\` list
`;
const dummyArticleContent: ArticleContent = {
  id: 987658576868658,
  name: "Dummy Article",
  shortDescription: "This is a dummy article",
  estimatedTime: 75,
  order: 1,
  markdown: markdown,
  status: "NOT_SEEN",
  contentType: "ARTICLE",
};
