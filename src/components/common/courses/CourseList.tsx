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
}> = ({ items, autoplay = false }) => {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }
    api.on("select", () => {
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
        onMouseEnter={() => api && (api.plugins() as any).autoplay.stop()}
        onMouseLeave={() => api && (api.plugins() as any).autoplay.play()}
      >
        {items.map((item, index) => (
          <CarouselItem key={index} className="basis-1/3">
            <div className="p-1 h-full">{item}</div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CourseList;
