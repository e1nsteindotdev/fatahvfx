import { twMerge } from "tailwind-merge";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
        "flex flex-1 flex-col justify-start items-center gap-4 lg:gap-3 py-[18px] px-[24px] lg:py-8 lg:px-[48px] rounded-[24px] bg-[#101924]",
        className
      )}
    >
      <div className="flex items-center w-full justify-start flex-col gap-1">
        <p className="text-[25px] text-center  text-white font-bold lg:text-[32px]">
          {title}
        </p>
        {/* <div className="lg:min-h-[80px]">
          <p className="text-[12px] lg:text-[16px] text-wrap">{desc}</p>
        </div> */}
      </div>
      <Carousel className="w-3/4 lg:w-full max-w-xs">
        <CarouselContent>
          {videoUrls.map((url, index) => {
            return (
              <CarouselItem key={index} className="">
                <div className="p-1">
                  <video
                    className="w-full border-[2px] border-[#008CFF]/50 rounded-[8px] shadow-lg flex-1 object-cover"
                    controls
                    poster={url.thumbnail}
                  >
                    <source src={url.video} type="video/mp4" />
                    Your browser does not support the videos.
                  </video>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="rounded-full text-white bg-[#008CFF] border-none" />
        <CarouselNext className="rounded-full text-white bg-[#008CFF] border-none" />
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
        <CarouselPrevious className="rounded-full text-white bg-[#008CFF] border-none" />
        <CarouselNext className="rounded-full text-white bg-[#008CFF] border-none" />
      </Carousel>
    </div>
  );
}
