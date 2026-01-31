import { Wrapper } from "./wrapper";

export function VSL() {
  return (
    <div className="flex items-center rounded-[18px] py-[48px] px-[12px] vsl-gradient flex-1  lg:max-w-full max-w-[660px]">
      <div className="px-2  flex-1">
        <video
          className="w-full rounded-[24px] flex-1"
          controls
          poster="main-vsl-thumbnail.png"
        >
          <source src="/main-vsl.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
