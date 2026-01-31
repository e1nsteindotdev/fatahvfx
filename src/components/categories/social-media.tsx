import { CategoryWrapper } from "./category-wrapper";
import Image from "next/image"

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel"

export function SocialMediaCategory() {

	return <CategoryWrapper className="flex flex-col justify-start items-start lg:px-12 lg:gap-8 ">
		<div className="flex flex-col">
			<p className="lg:text-[48px] text-[#008CFF] font-bold">Social Media</p>
			<p className="lg:text-[18px]">
				High-energy, attention-grabbing edits made to captivate audiences and boost engagement across all major social platforms.
			</p>
		</div>
		<Carousel className="w-full max-w-xs" >
			<CarouselContent>
				<CarouselItem className="">
					<div className="px-2  flex-1">
						<video
							className="w-full  border rounded-lg shadow-lg flex-1"
							controls
						>
							<source src="/videos/social-media-1.mp4" type="video/mp4" />
							Your browser d oes not support the video tag.
						</video>
					</div>
				</CarouselItem>

				<CarouselItem className="">
					<div className="px-2  flex-1">
						<video
							className="w-full  border rounded-lg shadow-lg flex-1"
							controls
						>
							<source src="/videos/social-media-1.mp4" type="video/mp4" />
							Your browser does not support the video tag.
						</video>
					</div>
				</CarouselItem>
				<CarouselItem className="">
					<div className="px-2  flex-1">
						<video
							className="w-full  border rounded-lg shadow-lg flex-1"
							controls
						>
							<source src="/videos/social-media-1.mp4" type="video/mp4" />
							Your browser does not support the video tag.
						</video>
					</div>
				</CarouselItem>
			</CarouselContent>
			<CarouselPrevious className="text-black" />
			<CarouselNext className="text-black" />
		</Carousel>	</CategoryWrapper>
}

<video
	className="w-full border rounded-md shadow-lg "
	controls
>
	<source src="/videos/social-media-1.mp4" type="video/mp4" />
	Your browser does not support the video tag.
</video>
