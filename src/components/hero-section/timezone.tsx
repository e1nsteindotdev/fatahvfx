import Image from "next/image";
import { Wrapper } from "./wrapper";

export function TimeZone() {
	return <Wrapper className="px-[32px] py-[36px] rounded-[16px] bg-[#141518] gap-[16px] flex flex-col justify-start items-start lg:py-[24px]">

		<div className="flex justify-between items-center gap-10">
			<div className="flex flex-col gap-1">
				<p className=" font-bold text-[17px] lg:text-[25px]">El Harrach, Algiers</p>
				<p className="11px lg:text-[16px]">CET, UTC + 1 LOCAL TIME</p>
			</div>
			<Image src="/images/algeria.png" width={57} height={38} alt="svg" className="rounded-[4px]" />
		</div>

		<div className="gap-1 lg:gap-2 flex center">
			<Image src="/svgs/convo.svg" width={13} height={13} className="lg:w-[20px]" alt="svg" />
			<p className="font-bold text-[12px] lg:text-[18px]">2 hours average response time.</p>
		</div>
	</Wrapper>
}

