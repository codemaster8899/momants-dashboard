import { CircleCheck, XCircle } from "lucide-react";

interface CampaignIconBadgeProps {
  active: boolean;
}

export const CampaignIconBadge = ({ active }: CampaignIconBadgeProps) => {
  const backgroundColor = active ? "#DCF7C5" : "#F8FAFC";
  const Icon = active ? CircleCheck : XCircle;

  return (
    <div
      className="w-10 h-10 flex items-center justify-center rounded-md flex-shrink-0"
      style={{ backgroundColor }}
    >
      <Icon className="w-5 h-5" />
    </div>
  );
};
