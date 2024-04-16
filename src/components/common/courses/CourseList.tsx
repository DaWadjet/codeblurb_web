import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shadcn/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { FC, ReactNode, useEffect, useState } from "react";

const CourseList: FC<{
  items: ReactNode[];
  autoplay?: boolean;
  slidesToShow?: number;
}> = ({ items, autoplay = false, slidesToShow = 3 }) => {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }
    api.on("select", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (api.plugins() as any).autoplay.stop();
    });
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      plugins={
        autoplay
          ? [
              Autoplay({
                delay: 5000,
              }),
            ]
          : undefined
      }
      opts={{
        align: "start",
        dragFree: true,
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onMouseEnter={() => api && (api.plugins() as any).autoplay.stop()}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onMouseLeave={() => api && (api.plugins() as any).autoplay.play()}
      >
        {items.map((item, index) => (
          <CarouselItem
            key={index}
            style={{
              flexBasis: 100 / slidesToShow + "%",
            }}
          >
            <div className="p-1 h-full">{item}</div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {items.length > slidesToShow && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
    </Carousel>
  );
};

export default CourseList;
