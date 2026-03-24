import { LucideIcon } from "lucide-react";
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { TDateCount } from "../type";

interface LineChartCardProps {
	title: string;
	icon: LucideIcon;
	tooltipLabel: string;
	totalAmount: number | string;
	data: TDateCount[];
	isLoading?: boolean;
}

export const LineChartCard = ({
	icon: Icon,
	title,
	tooltipLabel,
	totalAmount,
	data,
	isLoading = false,
}: LineChartCardProps) => {
	if (isLoading) {
		return (
			<div className="h-full flex flex-col bg-white border border-gray-200 rounded-xl animate-pulse">
				<div className="px-6 pt-6">
					<div className="flex items-center gap-2 mb-2">
						<div className="w-4 h-4 bg-gray-200 rounded" />
						<div className="h-4 w-24 bg-gray-200 rounded" />
					</div>
					<div className="h-8 w-32 bg-gray-200 rounded mb-4" />
				</div>

				<div className="flex-1 px-6 pb-6">
					<div className="w-full h-full bg-gray-100 rounded-lg" />
				</div>
			</div>
		);
	}

	return (
		<div className="h-[400px] flex flex-col bg-white border border-gray-200 rounded-xl">
			<div className="px-6 pt-6">
				<div className="flex items-center gap-2 momants-light-small-gray mb-2">
					<Icon size={16} />
					{title}
				</div>
				<div className="momants-semibold-huge-black mb-4">{totalAmount}</div>
			</div>

			<div className="flex-1 pr-6 pb-6">
				<ResponsiveContainer width="100%" height="100%">
					<AreaChart data={data} className="flex-1 w-full">
						<defs>
							<filter id="line-shadow-bottom" x="-50%" y="0%" width="200%" height="200%">
								<feDropShadow
									dx="0"
									dy="6"
									stdDeviation="4"
									floodColor="#15803D"
									floodOpacity="0.3"
								/>
							</filter>

							<linearGradient id="wave-gradient" x1="0" y1="0" x2="0" y2="1">
								<stop offset="0%" stopColor="#15803D" stopOpacity={0.3} />
								<stop offset="100%" stopColor="#15803D" stopOpacity={0} />
							</linearGradient>
						</defs>

						<CartesianGrid stroke="#e5e7eb" vertical={false} />

						<XAxis
							dataKey="date"
							tick={{ fontSize: 12, fill: "#6b7280" }}
							axisLine={false}
							tickLine={false}
							tickMargin={18}
						/>
						<YAxis
							tick={{ fontSize: 12, fill: "#6b7280" }}
							axisLine={false}
							tickLine={false}
							tickMargin={18}
						/>
						<Tooltip
							formatter={(value: unknown) => [Number(value ?? 0).toLocaleString(), tooltipLabel]}
							contentStyle={{
								borderRadius: 8,
								borderColor: "#d1d5db",
								fontSize: 12,
							}}
						/>

						<Area
							type="monotone"
							dataKey="count"
							stroke="#15803D"
							strokeWidth={1.5}
							fill="url(#wave-gradient)"
							filter="url(#line-shadow-bottom)"
							isAnimationActive={false}
						/>
					</AreaChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};
