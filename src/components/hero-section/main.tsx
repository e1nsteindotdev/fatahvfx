import Image from "next/image";
import { Wrapper } from "./wrapper";

export function Main() {
  return (
    <Wrapper className="px-[32px] py-[36px] rounded-[16px] bg-[#101924] gap-[16px] flex flex-col justify-center lg:justify-start lg:py-[64px items-start max-w-[524px] lg:flex-1">
      <div className="relative flex flex-col gap-4 items-start justify-start">
        <div className="px-3 py-2 rounded-[12px] bg-pink flex justify-center items-center bg-[#202124] gap-2 z-20">
          <div className="bg-[#15FF00] w-[10px] h-[10px] lg:w-[14px] lg:h-[14px] rounded-full"></div>
          <p className="text-[12px] text-[#15FF00] lg:text-[14px]">
            Open for work
          </p>
        </div>
        <p className="font-bold text-[54px] text-white leading-[100%] z-20 lg:text-[84px] drop-shadow-title-glow">
          {" "}
          Hello! <br /> I am Fatah{" "}
        </p>
        <Image
          className="absolute z-10 right-[-20px] phone:right-[-60px] top-[-10px] phone:top-[-20px] lg:w-[220px] w-[140px] phone:w-[160px] "
          src={"/images/fatah.png"}
          width={187}
          height={215}
          alt={"fatah pic"}
        />
      </div>
      <p className="text-[13px] lg:text-[18px]  ">
        A versatile video editor with a passion for storytelling through
        visuals. Skilled in transforming raw footage into polished, content
        across various formats.
      </p>
      <div className="flex flex-wrap gap-2">
        <Tag> 22 Y.O </Tag>
        <Tag> VIDEO EDITING </Tag>
        <Tag> ADOBE PREMIERE PRO </Tag>
        <Tag> ADOBE ILLUSTRATOR </Tag>
        <Tag> ADOBE PHOTOSHOP </Tag>
        <Tag> ADOBE AFTER EFFECTS</Tag>
      </div>
    </Wrapper>
  );
}

function Tag({ children }: { children?: React.ReactNode }) {
  return (
    <div className="px-2 py-[5px] bg-[#2D353E] rounded-[8px] text-[10x] font-semibold">
      <p className="text-[10px] lg:text-[15px]">{children}</p>
    </div>
  );
}
