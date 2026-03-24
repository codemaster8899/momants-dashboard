import { Clock } from "lucide-react";
import type { THourCount } from "../type";
import { twMerge } from "tailwind-merge";
import Tooltip from "@/components/shared/Tooltip";

const MAX_DOTS = 15;

function DotChart({ data }: { data: THourCount[] }) {
  const maxCount = data.reduce(
    (max, { count }) => (count > max ? count : max),
    0,
  );

  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-7 max-2xl:lg:col-span-2 col-span-1 shadow-sm flex flex-col gap-2">
      <div className="flex momants-light-small-gray gap-2 items-center">
        <Clock size={14} />
        24 Hour Conversation Heatmap
      </div>
      <div className="w-full h-full flex-1 flex justify-between">
        {data.map(({ count, hour }) => {
          const fraction = maxCount > 0 ? count / maxCount : 0;
          const normalizedDots = Math.round(MAX_DOTS * fraction);
          const dotCount = count > 0 ? Math.max(normalizedDots, 1) : 0;

          return (
            <div
              key={hour}
              className="flex flex-col-reverse items-center justify-between gap-0.5 w-3 group/tooltip"
            >
              <span className="text-center momants-light-extrasmall-gray">
                {hour}
              </span>
              {Array.from({ length: MAX_DOTS }).map((_, dotIdx) => (
                <div
                  key={dotIdx}
                  className={twMerge(
                    "size-2.5 rounded-full",
                    dotIdx < dotCount ? "bg-green-700" : "",
                  )}
                />
              ))}
              <Tooltip>{`${count} conversations at ${hour}`}</Tooltip>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default DotChart;
