import { CircleCheck, Loader, XCircle } from "lucide-react";
import { TStatus } from "../types";

interface TemplateIconBadgeProps {
  status: TStatus;
}

export const TemplateIconBadge = ({ status }: TemplateIconBadgeProps) => {
  let backgroundColor = "";
  let Icon = Loader;

  if (status === "rejected") {
    backgroundColor = "bg-red-100";
    Icon = XCircle;
  }

  if (status === "approved") {
    backgroundColor = "bg-green-100";
    Icon = CircleCheck;
  }

  if (status === "pending") {
    backgroundColor = "bg-yellow-100";
    Icon = Loader;
  }

  return (
    <div
      className={`w-10 h-10 flex items-center justify-center rounded-md flex-shrink-0 ${backgroundColor}`}
    >
      <Icon className="w-5 h-5" />
    </div>
  );
};
