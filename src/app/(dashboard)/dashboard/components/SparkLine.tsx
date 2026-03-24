import { hexToRgba } from "@/utils/hexToRgba";
import { lazy, useId } from "react";
import {
  Area,
  AreaChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import type { TLabelValue } from "../type";
import CustomTooltip from "./StatsCustomTooltip";

type SparkLineProps = {
  data: TLabelValue[];
  color?: string;
};

const SparkLine = ({ data, color = "#9ca3af" }: SparkLineProps) => {
  // Add a unique ID so the shadow color matches the component color.
  // This prevents multiple components with different colors from sharing the same filter.
  const uniqueId = useId();
  // if every point in data has a value of 0 render a flat line
  const emptyData = !data.length || data.every((point) => point.value === 0);
  const hex = emptyData ? "#878787" : color;

  if (emptyData)
    return <div className="w-full h-full border-b-2 border-b-red-700 p-1" />;

  return (
    <ResponsiveContainer width="100%" height="100%" debounce={1}>
      <AreaChart data={data}>
        <defs>
          <filter
            id={`sparkline-shadow-${uniqueId}`}
            x="-50%"
            y="0%"
            width="200%"
            height="200%"
          >
            <feDropShadow
              dx="0"
              dy="6"
              stdDeviation="4"
              floodColor={hex}
              floodOpacity="0.3"
            />
          </filter>

          <linearGradient
            id={`sparkline-gradient-${uniqueId}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor={hexToRgba(hex, 0.5)} />
            <stop offset="100%" stopColor={hexToRgba(hex, 0)} />
          </linearGradient>

          <Tooltip content={<CustomTooltip />} />
        </defs>
        <XAxis dataKey="label" hide />

        {emptyData && (
          <ReferenceLine
            y={0}
            stroke="#d1d5db"
            strokeWidth={1.5}
            strokeDasharray="4 4"
          />
        )}

        <Area
          type="monotone"
          dataKey="value"
          stroke={hex}
          strokeWidth={1.5}
          fill={`url(#sparkline-gradient-${uniqueId})`}
          filter={`url(#sparkline-shadow-${uniqueId})`}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default SparkLine;
