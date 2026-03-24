import {
  BanknoteArrowUp,
  ChartLine,
  Clock,
  CreditCard,
  Euro,
  HandCoins,
  MessageCircle,
  MessageCircleWarning,
  MessageSquare,
  MessageSquareDot,
  Timer,
} from "lucide-react";

export const miniBoxList = [
  {
    title: "Support cost saved",
    keyName: "support_cost_saved",
    icon: BanknoteArrowUp,
    type: "money",
  },
  {
    title: "Direct revenue",
    keyName: "direct_revenue",
    icon: ChartLine,
    type: "money",
  },
  {
    title: "Assisted revenue",
    keyName: "assisted_revenue",
    icon: Euro,
    type: "money",
  },
  {
    title: "Avg. messages per conversation",
    keyName: "average_messages_per_conversation",
    icon: MessageCircle,
    type: "money",
  },
  {
    title: "Hours saved",
    keyName: "hours_saved",
    icon: Clock,
    type: "number",
  },
  {
    title: "Total messages",
    keyName: "total_messages",
    icon: MessageSquareDot,
    type: "number",
  },
  {
    title: "Avg. order value",
    keyName: "average_order_value",
    icon: CreditCard,
    type: "money",
  },
  {
    title: "Avg. response time",
    keyName: "average_response_time",
    icon: Timer,
    type: "number",
  },
] as const;

export const questionsList = [
  {
    title: "Training center open questions",
    keyName: "training_center_open_questions",
    Icon: MessageCircle,
  },
  {
    title: "Most frequently asked questions",
    keyName: "most_frequently_asked_questions",
    Icon: MessageCircleWarning,
  },
] as const;

export const chartContentStyle = {
  borderRadius: 12,
  borderColor: "#e5e7eb",
  boxShadow: "0 4px 16px rgba(15,23,42,0.08)",
  fontSize: 12,
} as const;

export const colors = [
  "#DCF7C5",
  "#F3E8FF",
  "#DBEAFE",
  "#FEF9C3",
  "#FFEDD5",
  "#D1FAE5",
];
export const borderColors = [
  "#559D16",
  "#6B21A8",
  "#1E40AF",
  "#854D0E",
  "#9A3412",
  "#065F46",
];

export const chartsList = [
  {
    title: "Conversations During Office & Non-Office Hours",
    keyName: "conversations_office_vs_non_office",
    Icon: MessageSquare,
    label: "Hours",
  },
  {
    title: "Most sold products",
    keyName: "most_sold_products",
    Icon: HandCoins,
    label: "Products",
  },
] as const;

export const pieProps = {
  outerRadius: "90%",
  paddingAngle: 2,
  innerRadius: "55%",
} as const;