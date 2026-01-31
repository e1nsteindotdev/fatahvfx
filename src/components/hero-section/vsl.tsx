import { Wrapper } from "./wrapper";
import { CustomVideoPlayer } from "@/components/custom-video-player";

export function VSL() {
  return (
    <div className="flex items-center rounded-[18px] py-[48px] px-[12px] vsl-gradient flex-1 lg:max-w-full max-w-[660px]">
      <div className="px-2 flex-1">
        <CustomVideoPlayer
          src="/main-vsl.mp4"
          poster="main-vsl-thumbnail.png"
        />
      </div>
    </div>
  );
}
