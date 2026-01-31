import { twMerge } from "tailwind-merge";

export function Wrapper({ children, className }: { children: React.ReactNode, className?: string }) {
	return <div className={twMerge("", className)} >{children}</div>
}
