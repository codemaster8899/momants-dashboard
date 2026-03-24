"use client";

import getWebSocketUrl from "@/utils/getWebSocketUrl";
import { useCallback, useEffect, useRef, useState } from "react";

type UseWebSocketOptions = {
  path: string;
  enabled?: boolean;
  onMessage?: (event: MessageEvent) => void;
  onJsonMessage?: (data: unknown) => void;
};

type UseWebSocketResult = {
  isConnected: boolean;
  send: (data: string | object) => void;
  disconnect: () => void;
};

const BASE_WS_URL = getWebSocketUrl();

export const useWebSocket = ({
  path,
  enabled = true,
  onMessage,
  onJsonMessage,
}: UseWebSocketOptions): UseWebSocketResult => {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const enabledRef = useRef(enabled);

  enabledRef.current = enabled;

  const buildUrl = useCallback(() => {
    if (!BASE_WS_URL) return null;
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return `${BASE_WS_URL}${normalizedPath}`;
  }, [path]);

  const cleanupSocket = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.onopen = null;
      socketRef.current.onmessage = null;
      socketRef.current.onerror = null;
      socketRef.current.onclose = null;
      socketRef.current.close();
      socketRef.current = null;
    }
    setIsConnected(false);
  }, []);

  useEffect(() => {
    if (!enabledRef.current) {
      cleanupSocket();
      return;
    }

    const url = getWebSocketUrl();
    if (!url) return;

    if (socketRef.current) return;

    const ws = new WebSocket(`${url}${path}`);
    socketRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connected");
      setIsConnected(true);
      reconnectAttemptsRef.current = 0;
    };

    ws.onmessage = (event: MessageEvent) => {
      onMessage?.(event);

      if (onJsonMessage) {
        try {
          const data = JSON.parse(event.data);
          onJsonMessage(data);
        } catch {}
      }
    };

    ws.onerror = (event) => {
      console.log("WebSocket error", event);
    };

    ws.onclose = (event) => {
      console.log("WebSocket closed", event);
      setIsConnected(false);
      socketRef.current = null;

      if (!enabledRef.current) return;

      const attempts = reconnectAttemptsRef.current + 1;
      reconnectAttemptsRef.current = attempts;

      const delay = Math.min(5000, 1000 * 2 ** attempts);

      setTimeout(() => {
        if (!enabledRef.current) return;
        socketRef.current = null;
      }, delay);
    };

    return cleanupSocket;
  }, [buildUrl, cleanupSocket, enabled]);

  const send = useCallback((data: string | object) => {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN)
      return;

    const payload =
      typeof data === "string"
        ? data
        : (() => {
            try {
              return JSON.stringify(data);
            } catch {
              return "";
            }
          })();

    if (!payload) return;

    socketRef.current.send(payload);
  }, []);

  const disconnect = useCallback(() => {
    enabledRef.current = false;
    cleanupSocket();
  }, [cleanupSocket]);

  return {
    isConnected,
    send,
    disconnect,
  };
};
