import Image from "next/image";

export function Categories() {
  return (
    <div className="flex flex-col gap-[26px] py-[42px] px-[20px] bg-[#141518] rounded-[16px] flex-1">
      <p className="text-[19px] font-bold lg:text-[25px] text-nowrap">
        My Work
      </p>
      <div className="flex flex-col gap-6">
        <Link link={"social-media"} text="Social Media" />
        <Link link={"filmmaking"} text="Filmmaking" />
        <Link link={"photography"} text="Photography" />
        <Link link={"podcasts"} text="Podcasts" />
        <Link link={"coverage"} text="Event Coverage" />
      </div>
    </div>
  );
}

function Link({ link, text }: { link: string; text?: string }) {
  return (
    <button
      onClick={() => {
        const element = document.getElementById(link);
        element?.scrollIntoView({ behavior: "smooth" });
      }}
      className="justify-between items-center flex opacity-80 gap-2"
    >
      <p className="text-[14px] lg:text-[16px] text-nowrap">{text}</p>
      <Image src={"/svgs/scroll.svg"} width={9} height={9} alt="scroll icon" />
    </button>
  );
}
