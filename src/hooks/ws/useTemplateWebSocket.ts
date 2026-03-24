"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useWebSocket } from "./useWebSocket";
import type { TStatus } from "@/app/(dashboard)/templates/types";

interface Message {
  type: "template_status_update";
  template_id: string;
  status: TStatus;
}

const useTemplateWebSocket = () => {
  const queryClient = useQueryClient();

  const onMessage = (event: MessageEvent) => {
    const data: Message = JSON.parse(event.data);

    if (data?.type === "template_status_update") {
      queryClient.setQueryData(["Template", "templates"], (oldData: any) => {
        if (!oldData) return oldData;
        return oldData.map((template: any) =>
          template.id === data.template_id
            ? { ...template, status: data.status }
            : template,
        );
      });
    }
  };

  const { isConnected, disconnect } = useWebSocket({
    path: "/ws/dashboard/",
    onMessage,
    enabled: Boolean(true),
  });

  return {
    isConnected,
    disconnect,
  };
};

export default useTemplateWebSocket;
