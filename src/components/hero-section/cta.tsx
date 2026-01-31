import { twMerge } from "tailwind-merge";
import { Wrapper } from "./wrapper";


export function CTAs() {
	return <Wrapper className="flex items-start gap-3">
		<Button className="bg-white text-black flex-1" jumpto={"my-work"}>CHECK MY WORK</Button>
		<Button className="bg-[#252626] text-white flex-1" jumpto={"contact-me-form"}>CONTACT ME</Button>
	</Wrapper>
}

function Button({ children, jumpto, className }: { jumpto: string, children: React.ReactNode, className?: string }) {
	return <button
		onClick={() => {
			const element = document.getElementById(jumpto)
			element?.scrollIntoView({ behavior: "smooth" })

		}}
		className={twMerge("px-3 py-[10px] rounded-[16px] text-[13px] lg:text-[20px] lg:rounded-[20px] font-bold", className)}>
		{children}
	</button>
}



