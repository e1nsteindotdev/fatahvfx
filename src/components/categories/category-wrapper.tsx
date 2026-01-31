import { twMerge } from "tailwind-merge";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CustomVideoPlayer } from "@/components/custom-video-player";
import Image from "next/image";

export function CategoryWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={twMerge(
        " w-full py-10 rounded-[24px] bg-[#101318]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function Category({
  categoryId,
  videoUrls,
  title,
  desc,
  className,
}: {
  categoryId: string;
  className?: string;
  videoUrls: { video: string; thumbnail: string }[];
  title: string;
  desc: string;
}) {
  return (
    <div
      id={categoryId}
      className={twMerge(
        "flex flex-1 flex-col justify-start items-center gap-6 lg:gap-10 py-[24px] px-[24px] lg:py-12 lg:px-[48px] rounded-[24px]",
        className
      )}
    >
      <p className="text-[40px] text-center text-white font-bold lg:text-[102px] tracking-widest uppercase font-script">
        {title}
      </p>

      <Carousel className="w-full max-w-full pl-6 pr-6">
        <CarouselContent className={`gap-6 ${videoUrls.length <= 2 ? 'justify-center' : ''}`}>
          {videoUrls.map((url, index) => (
            <CarouselItem
              key={index}
              className={`flex justify-center basis-[95vw] md:basis-1/3 ${videoUrls.length === 1 ? 'md:basis-full' : videoUrls.length === 2 ? 'md:basis-1/2' : ''}`}
            >
              <div className="aspect-[9/16] md:aspect-[9/16] w-full max-w-[80vw] lg:max-w-auto">
                <CustomVideoPlayer
                  src={url.video}
                  poster={url.thumbnail}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-transparent hover:bg-transparent border-none left-2 md:left-6 flex justify-start" />
        <CarouselNext className="bg-transparent hover:bg-transparent border-none right-2 md:right-6 flex justify-end" />
      </Carousel>
    </div>
  );
}

export function ImagesCategory({
  categoryId,
  imagesUrls,
  title,
  desc,
  className,
}: {
  categoryId: string;
  className?: string;
  imagesUrls: string[];
  title: string;
  desc: string;
}) {
  return (
    <div
      id={categoryId}
      className={twMerge(
        "flex flex-col justify-start items-center gap-4 lg:gap-6 py-[18px] px-[24px] lg:py-8 lg:px-[48px] rounded-[24px] bg-[#101924]",
        className
      )}
    >
      <div className="flex items-center justify-start flex-col gap-1">
        <p className="text-[25px] text-[#008CFF] text-center font-bold lg:text-[48px]">
          {title}
        </p>
        <p className="text-[12px] lg:text-[16px] text-wrap">{desc}</p>
      </div>
      <Carousel className="w-3/4 lg:w-[95%] ">
        <CarouselContent>
          {imagesUrls.map((url, index) => {
            return (
              <CarouselItem key={index} className="">
                <div className="p-1">
                  <Image
                    src={url}
                    height={3309}
                    width={4964}
                    alt="image"
                    className="w-full border-[4px] border-[#008CFF] rounded-[22px] shadow-lg flex-1"
                    priority={true}
                  />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="bg-transparent hover:bg-transparent border-none" />
        <CarouselNext className="bg-transparent hover:bg-transparent border-none" />
      </Carousel>
    </div>
  );
}
