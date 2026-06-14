import { useQuery } from "@tanstack/react-query";

export type AppItem = { id: string; name: string };

const fetchApps = async (): Promise<AppItem[]> => {
  const res = await fetch("/api/apps");
  if (!res.ok) throw new Error("Failed to fetch apps");
  return res.json();
};

const fetchAppGraph = async (appId: string) => {
  const res = await fetch(`/api/apps/${appId}/graph`);
  if (!res.ok) throw new Error("Failed to fetch graph");
  return res.json() as Promise<{ nodes: any[]; edges: any[] }>;
};

export const useAppsQuery = () =>
  useQuery({
    queryKey: ["apps"],
    queryFn: fetchApps,
    staleTime: 1000 * 60 * 5,
  });

export const useAppGraphQuery = (appId: string) =>
  useQuery({
    queryKey: ["appGraph", appId],
    queryFn: () => fetchAppGraph(appId),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
