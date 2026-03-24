import { MomantsLogo } from "@/components/ui/MomantsLogo";

interface MediaMessageProps {
	src: string;
	alt: string;
	width: number;
	height: number;
	from_agent?: boolean;
	className?: string;
}

export const MediaMessage = ({
	src,
	alt,
	width,
	height,
	from_agent = true,
	className,
}: MediaMessageProps) => {
	const timeString = new Date().toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
	});

	return (
		<div className={`flex items-end ${from_agent ? "justify-start" : "justify-end"}`}>
			{/* Avatar on the left for agent */}
			{from_agent && <MomantsLogo width={24} height={24} className="mr-2" />}

			<div
				className={`relative max-w-xs my-2 rounded-lg flex flex-col break-words text-sm ${
					from_agent ? "bg-gray-100 text-black" : "bg-[#e2f6ca] text-black"
				} ${className ?? ""}`}>
				{/* Media content */}
				<img
					src={src}
					alt={alt}
					width={width}
					height={height}
					className="w-full rounded-md object-cover"
				/>

				{/* Timestamp below the media */}
				<span className="text-[0.65rem] text-gray-500 mt-1 self-end">{timeString}</span>
			</div>
		</div>
	);
};
