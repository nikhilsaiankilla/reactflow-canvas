import React, { useState, useEffect } from "react";
import { useUIStore } from "../../store/useUIStore";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import type { CustomNodeType, ServiceNodeData } from "../canvas/ServiceNode";

interface NodeInspectorProps {
  nodes: CustomNodeType[];
  onUpdateNode: (id: string, data: ServiceNodeData) => void;
}

const statusColors: Record<string, string> = {
  Healthy: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Degraded: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Down: "bg-rose-500/10 text-rose-400 border-rose-500/20",
};

export function NodeInspector({ nodes, onUpdateNode }: NodeInspectorProps) {
  const selectedNodeId = useUIStore((s) => s.selectedNodeId);
  const activeTab = useUIStore((s) => s.activeInspectorTab);
  const setActiveTab = useUIStore((s) => s.setActiveInspectorTab);

  const node = nodes.find((n) => n.id === selectedNodeId);

  const [localLabel, setLocalLabel] = useState("");
  const [localMetrics, setLocalMetrics] = useState(0);
  const [localDesc, setLocalDesc] = useState("");

  useEffect(() => {
    if (node) {
      setLocalLabel(node.data.label ?? "");
      setLocalMetrics(node.data.metricsValue ?? 0);
      setLocalDesc(node.data.description ?? "");
    }
  }, [selectedNodeId]);

  if (!node) {
    return (
      <div className="flex items-center justify-center text-zinc-600 text-xs px-4 py-6 text-center">
        Select a node on the canvas to inspect it
      </div>
    );
  }

  const { data } = node;
  const commit = (patch: Partial<ServiceNodeData>) =>
    onUpdateNode(node.id, { ...data, ...patch });

  return (
    <div className="flex flex-col gap-3 p-4 text-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="font-semibold text-zinc-200 truncate">
          {data.label}
        </span>
        <Badge
          variant="outline"
          className={`text-[10px] px-1.5 ${statusColors[data.status]}`}
        >
          {data.status}
        </Badge>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as "config" | "runtime")}
      >
        <TabsList className="w-full bg-zinc-900 border border-zinc-800">
          <TabsTrigger
            value="config"
            className="flex-1 text-xs data-[state=active]:bg-zinc-700 data-[state=active]:text-white"
          >
            Config
          </TabsTrigger>
          <TabsTrigger
            value="runtime"
            className="flex-1 text-xs data-[state=active]:bg-zinc-700 data-[state=active]:text-white"
          >
            Runtime
          </TabsTrigger>
        </TabsList>

        <TabsContent value="config" className="flex flex-col gap-3 mt-3">
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] text-zinc-500 uppercase tracking-wide">
              Name
            </label>
            <Input
              value={localLabel}
              onChange={(e) => setLocalLabel(e.target.value)}
              onBlur={() => commit({ label: localLabel })}
              className="h-8 bg-zinc-900 border-zinc-700 text-zinc-200 text-xs"
            />
          </div>

          {/* Node Type Toggle */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] text-zinc-500 uppercase tracking-wide">
              Node Type
            </label>
            <div className="flex gap-1 bg-zinc-900 rounded-lg p-1 border border-zinc-800">
              {(["Service", "DB"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => commit({ type: t })}
                  className={`flex-1 py-1 rounded-md text-xs font-medium transition-colors
                    ${data.type === t ? "bg-zinc-700 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Status Toggle */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] text-zinc-500 uppercase tracking-wide">
              Status
            </label>
            <div className="flex gap-1 bg-zinc-900 rounded-lg p-1 border border-zinc-800">
              {(["Healthy", "Degraded", "Down"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => commit({ status: s })}
                  className={`flex-1 py-1 rounded-md text-xs font-medium transition-colors
                    ${data.status === s ? "bg-zinc-700 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] text-zinc-500 uppercase tracking-wide">
              Description
            </label>
            <textarea
              value={localDesc}
              onChange={(e) => setLocalDesc(e.target.value)}
              onBlur={() => commit({ description: localDesc })}
              rows={2}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-md text-xs text-zinc-200 px-2 py-1.5 resize-none focus:outline-none focus:ring-1 focus:ring-zinc-600"
            />
          </div>

          {/* Synced Slider + Input */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] text-zinc-500 uppercase tracking-wide">
              Capacity / Config
            </label>
            <div className="flex items-center gap-3">
              <Slider
                min={0}
                max={100}
                step={1}
                value={[localMetrics]}
                onValueChange={(v) => {
                  const value = Array.isArray(v) ? v[0] : v;
                  setLocalMetrics(value);
                  commit({ metricsValue: value });
                }}
                className="flex-1"
              />
              <Input
                type="number"
                min={0}
                max={100}
                value={localMetrics}
                onChange={(e) => {
                  const v = Math.min(100, Math.max(0, Number(e.target.value)));
                  setLocalMetrics(v);
                  commit({ metricsValue: v });
                }}
                className="w-16 h-7 bg-zinc-900 border-zinc-700 text-zinc-200 text-xs text-center"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="runtime" className="flex flex-col gap-2 mt-3">
          {[
            ["Type", data.type],
            ["Provider", data.provider ?? "—"],
            ["Metrics", `${data.metricsValue}%`],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between text-xs">
              <span className="text-zinc-500">{label}</span>
              <span className="text-zinc-200 font-mono">{value}</span>
            </div>
          ))}
          <div className="flex justify-between text-xs">
            <span className="text-zinc-500">Status</span>
            <Badge
              variant="outline"
              className={`text-[10px] px-1.5 ${statusColors[data.status]}`}
            >
              {data.status}
            </Badge>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
