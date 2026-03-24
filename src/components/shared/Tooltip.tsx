import { twMerge } from "tailwind-merge";

function Tooltip({
  children,
  customClassname = "",
}: {
  children: React.ReactNode;
  customClassname?: string;
}) {
  return (
    <p
      className={twMerge(
        "bg-white rounded-md absolute max-w-xs border w-fit shadow-lg p-2 momants-light-extrasmall-black z-30 opacity-0 pointer-events-none transition-all duration-300 group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-10",
        customClassname,
      )}
    >
      {children}
    </p>
  );
}

export default Tooltip;
