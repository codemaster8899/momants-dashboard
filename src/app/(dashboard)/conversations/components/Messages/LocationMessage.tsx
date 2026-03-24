import { MomantsLogo } from "@/components/ui/MomantsLogo";

interface LocationMessageProps {
	width: number;
	height: number;
	lat: number;
	lon: number;
	from_agent?: boolean;
	className?: string;
}

export const LocationMessage = ({
	width,
	height,
	lat,
	lon,
	from_agent = true,
	className,
}: LocationMessageProps) => {
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
				{/* Google Maps iframe */}
				<iframe
					className="w-full rounded-md border-0"
					title="Location"
					width={width}
					height={height}
					src={`https://maps.google.com/maps?q=${lat},${lon}&z=15&output=embed`}
					allowFullScreen></iframe>

				{/* Timestamp below the map */}
				<span className="text-[0.65rem] text-gray-500 mt-1 self-end">{timeString}</span>
			</div>
		</div>
	);
};
