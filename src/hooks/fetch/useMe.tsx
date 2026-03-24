import { useCallback, useState } from "react";
import { API } from "../../lib/api";
import { Agent, useMeStore } from "../../stores/data/useMeStore";
import { useLogout } from "./auth/useLogout";

type MeResponse = {
  email: string | null;
  agents: Agent[];
  current_agent?: Agent | null;
};

export const useMe = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { logout } = useLogout();

  const setEmail = useMeStore((s) => s.setEmail);
  const setAgents = useMeStore((s) => s.setAgents);
  const setCurrentAgent = useMeStore((s) => s.setCurrentAgent);

  const fetchMe = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await API("/dashboard/me", {
        method: "GET",
        credentials: "include",
      });

      if (res.status === 401 || res.status === 403) {
        await logout();
        return;
      }

      if (!res.ok) {
        setError("Failed to fetch user data");
        return;
      }

      const data: MeResponse = await res.json();

      setEmail(data.email ?? null);
      setAgents(data.agents ?? []);

      // if there is a current agent
      // check if that agent is still in the agents list from the response
      // if it is, set it, if not set it to the first agent from the list
      // if nothing is a option, set it to null
      if (data.current_agent) {
        const exists = data.agents.some(
          (agent) => agent.id === data.current_agent!.id,
        );
        if (exists) {
          setCurrentAgent(data.current_agent);
        } else if (data.agents.length > 0) {
          setCurrentAgent(data.agents[0]);
        } else {
          setCurrentAgent(null);
        }
      } else {
        setCurrentAgent(data.agents.length > 0 ? data.agents[0] : null);
      }
    } catch (err) {
      const status = (err as Error & { status?: number }).status;
      if (status === 401 || status === 403) {
        await logout();
      } else {
        setError(err instanceof Error ? err.message : "Unexpected error");
      }
    } finally {
      setLoading(false);
    }
  }, [setEmail, setAgents, setCurrentAgent, logout]);

  return {
    fetchMe,
    loading,
    error,
  };
};
