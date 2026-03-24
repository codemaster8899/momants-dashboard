interface ProgressBarProps {
  percentComplete: number;
  pixelWidth?: number;
  backgroundColor?: string;
  barColor?: string;
}

export const ProgressBar = ({
  percentComplete,
  pixelWidth,
  backgroundColor,
  barColor,
}: ProgressBarProps) => {
  return (
    <div
      className="flex items-center justify-center w-full rounded-xl"
      style={pixelWidth ? { width: `${pixelWidth}px` } : undefined}
    >
      <div
        className={`w-full ${backgroundColor || "bg-gray-200"} rounded-full h-1.5`}
      >
        <div
          className={`h-1.5 rounded-full ${barColor || "bg-lime-400"}`}
          style={{ width: `${percentComplete}%` }}
        ></div>
      </div>
    </div>
  );
};
