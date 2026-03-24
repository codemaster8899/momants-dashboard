import {
  Cell,
  Label,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  borderColors,
  chartContentStyle,
  chartsList,
  colors,
  pieProps,
} from "../constants";
import type { TStatsResponse } from "../type";

const emptyChartData = [{ value: 1, name: "No data" }];

function PieCharts({ data }: { data: TStatsResponse }) {
  return chartsList.map(({ title, keyName, Icon, label }) => {
    const chartData = data[keyName].data;
    const total = chartData.reduce((acc, item) => acc + item.value, 0);
    const isEmpty = chartData.length === 0;

    return (
      <section
        key={keyName}
        className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm flex flex-col"
      >
        <div className="flex momants-light-small-gray gap-2 items-center">
          <Icon size={14} className="min-w-4" />
          {title}
        </div>
        <div className="grid grid-cols-2 items-center gap-8">
          <div className="relative flex-1 aspect-square max-h-[310px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={isEmpty ? emptyChartData : chartData}
                  dataKey="value"
                  nameKey="name"
                  {...pieProps}
                >
                  {chartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                  <Label
                    content={() => (
                      <g
                        style={{
                          transform: `translate(50%, calc(50% + 10px))`,
                        }}
                      >
                        <text textAnchor="middle">
                          <tspan
                            x={0}
                            dy="-0.2em"
                            fill="#0f172a"
                            style={{ fontSize: 24, fontWeight: 700 }}
                          >
                            {total}
                          </tspan>
                          <tspan
                            x={0}
                            dy="1.4em"
                            fill="#64748b"
                            style={{ fontSize: 12 }}
                          >
                            {label}
                          </tspan>
                        </text>
                      </g>
                    )}
                  />
                </Pie>
                {!isEmpty && (
                  <Tooltip
                    contentStyle={chartContentStyle}
                    itemStyle={{ color: "#000000" }}
                  />
                )}
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-col gap-3 min-w-[140px]">
            {chartData.map((entry, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="size-3 rounded-sm border"
                    style={{
                      backgroundColor: colors[index % colors.length],
                      borderColor: borderColors[index % colors.length],
                    }}
                  />
                  <span className="momants-light-extrasmall-gray">
                    {entry.name}
                  </span>
                </div>
                <span className="momants-bold-extrasmall-black">
                  {entry.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  });
}

export default PieCharts;
