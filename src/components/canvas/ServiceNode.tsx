import React from "react";
import { Server, Database, Activity } from "lucide-react";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import { Badge } from "../ui/badge";

export type ServiceNodeData = {
  label: string;
  type: "Service" | "DB";
  status: "Healthy" | "Degraded" | "Down";
  metricsValue: number;
  provider?: string;
  description?: string;
};

export type CustomNodeType = Node<ServiceNodeData>;

export const ServiceNode = ({ data, selected }: NodeProps<CustomNodeType>) => {
  const isDb = data.type === "DB";
  const statusColors = {
    Healthy: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Degraded: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Down: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  };

  return (
    <div
      className={`px-4 py-3 shadow-xl rounded-xl border bg-zinc-900 w-64 min-h-[90px] transition-all
      ${selected ? "border-violet-500 ring-1 ring-violet-500/30" : "border-zinc-800 hover:border-zinc-700"}`}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="w-2 h-2 !bg-zinc-600 border-none"
      />
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`p-1.5 rounded-md ${isDb ? "bg-cyan-500/10 text-cyan-400" : "bg-indigo-500/10 text-indigo-400"}`}
            >
              {isDb ? (
                <Database className="w-4 h-4" />
              ) : (
                <Server className="w-4 h-4" />
              )}
            </div>
            <span className="text-sm font-semibold text-zinc-100 truncate max-w-[120px]">
              {data.label}
            </span>
          </div>
          <Badge
            variant="outline"
            className={`text-[10px] px-1.5 py-0 font-medium ${statusColors[data.status]}`}
          >
            {data.status}
          </Badge>
        </div>
        <div className="flex items-center justify-between text-[11px] text-zinc-400 mt-1">
          <div className="flex items-center gap-1">
            <Activity className="w-3 h-3 text-zinc-500" />
            <span>Capacity / Config:</span>
          </div>
          <span className="font-mono text-zinc-300 font-bold">
            {data.metricsValue}%
          </span>
        </div>
        {data.provider && (
          <div className="flex justify-end text-[9px] uppercase tracking-wider text-zinc-600 font-bold border-t border-zinc-800/60 pt-1.5 mt-1">
            {data.provider}
          </div>
        )}
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="w-2 h-2 !bg-zinc-600 border-none"
      />
    </div>
  );
};
