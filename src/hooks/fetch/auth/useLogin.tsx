"use client";

import { useCallback, useState } from "react";

type LoginParams = {
  identifier: string;
  password: string;
  rememberMe: boolean;
};

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(
    async (params: LoginParams): Promise<{ error?: string } | null> => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(params),
          credentials: "include",
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          setError(data?.detail ?? "Invalid credentials. Please try again.");
          return data;
        }

        return null;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unexpected error";
        setError(message);
        return { error: message };
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { login, loading, error };
};
