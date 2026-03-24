type TNameValue = {
  name: string;
  value: number;
};

export type TDateCount = {
  date: string;
  count: number;
};

export type THourCount = {
  hour: number;
  count: number;
};

export type TLabelValue = {
  label: string;
  value: number;
};

export type TMetric = {
  data: TLabelValue[];
  relative_change: number | null;
  total_current_period: number;
  tooltip_title: string;
};

export type TConversations = {
  data: TDateCount[];
  summary: {
    total: number;
  };
};

export type TStatsResponse = {
  currency: string;

  support_cost_saved: TMetric;
  direct_revenue: TMetric;
  assisted_revenue: TMetric;
  average_order_value: TMetric;
  hours_saved: TMetric;
  total_messages: TMetric;
  average_messages_per_conversation: TMetric;
  average_response_time: TMetric;

  training_center_open_questions: string[];
  most_frequently_asked_questions: string[];

  conversations: TConversations;

  conversation_heatmap: {
    data: THourCount[];
  };

  conversations_office_vs_non_office: {
    data: TNameValue[];
  };

  most_sold_products: {
    data: TNameValue[];
  };
};
