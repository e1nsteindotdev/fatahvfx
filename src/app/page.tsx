"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import {
  Category,
} from "@/components/categories/category-wrapper";
import { ContactMeForm } from "@/components/contact-me";
import { Footer } from "@/components/footer";
import { CTAs } from "@/components/hero-section/cta";
import { Main } from "@/components/hero-section/main";
import { Socials } from "@/components/hero-section/socials";
import { TimeZone } from "@/components/hero-section/timezone";
import { VSL } from "@/components/hero-section/vsl";

export default function Home() {
  const categories = useQuery(api.categories.listPublic);

  return (
    <div className="w-full flex flex-col px-[16px] overflow-hidden gap-12 py-6 lg:py-10 sm:px-[200px] lg:px-[16px]">
      <div className="w-full flex flex-col xl:flex-row gap-[18px] justify-start">
        <div className="w-full flex flex-col gap-[18px]">
          <div className="w-full flex flex-col lg:flex-row gap-[18px] justify-start items-center lg:items-stretch">
            <div className="gap-[18px] flex flex-col">
              <Main />
              <Socials />
              <CTAs />
              <TimeZone />
            </div>
            <VSL />
          </div>
        </div>
      </div>

      <div id={"my-work"} className="flex flex-col gap-8 lg:gap-[18px] lg:py-20">
        {!categories ? (
          // Loading state
          <div className="col-span-2 flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#008CFF]"></div>
          </div>
        ) : categories.length === 0 ? (
          // Empty state
          <div className="col-span-2 text-center py-20 text-white/60">
            No content available yet.
          </div>
        ) : (
          // Render categories dynamically
          categories.map((category) => (
            <DynamicCategory
              key={category._id}
              categoryId={category._id}
              title={category.title}
              desc={category.description || "Cinematic edits that bring stories to life with precision and artistry."}
            />
          ))
        )}
      </div>
      <ContactMeForm />
      <Footer />
    </div>
  );
}

function DynamicCategory({
  categoryId,
  title,
  desc,
}: {
  categoryId: string;
  title: string;
  desc: string;
}) {
  const videos = useQuery(api.video.listByCategory, { categoryId: categoryId as any });

  if (!videos) {
    return (
      <div className="flex flex-1 flex-col justify-start items-center gap-4 lg:gap-3 py-[18px] px-[24px] lg:py-8 lg:px-[48px] rounded-[24px]">
        <p className="text-[25px] text-center text-white font-bold lg:text-[102px] uppercase font-script">{title}</p>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="flex flex-1 flex-col justify-start items-center gap-4 lg:gap-3 py-[18px] px-[24px] lg:py-8 lg:px-[48px] rounded-[24px]">
        <p className="text-[25px] text-center text-white font-bold lg:text-[102px] uppercase font-script">{title}</p>
        <p className="text-sm text-white/60">No videos yet</p>
      </div>
    );
  }

  // Transform videos to the format expected by Category component
  const videoUrls = videos.map((video) => ({
    video: video.url || "",
    thumbnail: "", // We'll use the video itself as thumbnail for now
  }));

  return (
    <Category
      categoryId={categoryId}
      title={title}
      desc={desc}
      videoUrls={videoUrls}
    />
  );
}
