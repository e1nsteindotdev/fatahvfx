import Image from "next/image";

export function Socials() {
  return (
    <div className="gap-[26px] py-[42px] px-[20px]  bg-[#141518] rounded-[18px] flex-1">
      <div className="flex flex-col gap-6">
        <Link
          text="Linkedin"
          imageUrl="/svgs/linkedin.svg"
          link={"https://www.linkedin.com/in/fatah-c-2215a4190/"}
        />
        <Link
          text="Whatsapp"
          imageUrl="/svgs/whatsapp.svg"
          link={"https://wa.me/qr/NW4AGXC6Z36NH1"}
        />
        <Link
          text="Instagram"
          imageUrl="/svgs/instagram.svg"
          link={"https://www.instagram.com/fatahvfx/"}
        />
        <Link
          text="Gmail"
          imageUrl="/svgs/gmail.svg"
          link={"mailto:chafaafateh@gmail.com"}
        />
      </div>
    </div>
  );
}

function Link({
  link,
  text,
  imageUrl,
}: {
  link?: string;
  text?: string;
  imageUrl: string;
}) {
  return (
    <a
      href={link}
      target="_blank"
      className="justify-center phone:justify-center items-center h-[56px] flex bg-[#252629] gap-3 py-[10px] px-[14px] rounded-[12px]"
    >
      <Image
        src={imageUrl}
        className=""
        width={31}
        height={31}
        alt="scroll icon"
      />
      <p className="font-bold xl:hidden text-[13px] hidden phone:inline lg:text-[14px]">
        {text}
      </p>
    </a>
  );
}
