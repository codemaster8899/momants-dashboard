import { ReactNode } from "react";

type TagProps = {
  children: ReactNode;
  className?: string;
  active: boolean;
};

export const Tag = ({ children, className = "", active }: TagProps) => {
  const activeClasses = "bg-zinc-100 momants-semibold-extrasmall-darkgray";
  const inactiveClasses =
    "outline outline-1 outline-zinc-300 bg-transparent momants-light-extrasmall-gray";

  return (
    <div
      className={`inline-block rounded-full px-2 py-1 ${
        active ? activeClasses : inactiveClasses
      } ${className}`}
    >
      <p className="leading-xs">{children}</p>
    </div>
  );
};
