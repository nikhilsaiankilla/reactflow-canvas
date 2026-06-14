import "./App.css";
import { ReactFlowProvider } from "@xyflow/react";
import { useState, useRef } from "react";
import LeftRail from "./components/layout/LeftRail";
import RightRail from "./components/layout/RightRail";
import TopBar from "./components/layout/TopBar";
import { AppCanvas } from "./components/canvas/AppCanvas";
import { NodeInspector } from "./components/inspector/NodeInspector";
import { useUIStore } from "./store/useUIStore";
import { useAppGraphQuery } from "./hooks/useAppGraph";
import type {
  CustomNodeType,
  ServiceNodeData,
} from "./components/canvas/ServiceNode";

function App() {
  const [liveNodes, setLiveNodes] = useState<CustomNodeType[]>([]);
  const updateNodeFn = useRef<
    ((id: string, data: ServiceNodeData) => void) | null
  >(null);

  const selectedAppId = useUIStore((s) => s.selectedAppId);
  const selectedNodeId = useUIStore((s) => s.selectedNodeId);
  const setSelectedNodeId = useUIStore((s) => s.setSelectedNodeId);

  const { data, isLoading, isError } = useAppGraphQuery(selectedAppId);

  const handleNodesReady = (
    nodes: CustomNodeType[],
    updater: (id: string, data: ServiceNodeData) => void,
  ) => {
    setLiveNodes(nodes);
    updateNodeFn.current = updater;
  };

  const isDrawerOpen = !!liveNodes.find((n) => n.id === selectedNodeId);

  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden bg-zinc-950 text-white select-none">
      <div className="flex-1 h-full relative">
        {/* Left Rail */}
        <div className="absolute top-0 left-0 z-50 h-full">
          <LeftRail />
        </div>

        {/* Top Bar */}
        <div className="absolute top-0 right-0 left-0 z-50 pointer-events-none flex items-center justify-between p-3 pl-20">
          <div className="pointer-events-auto">
            <TopBar />
          </div>
          <div className="pointer-events-auto">
            <RightRail />
          </div>
        </div>

        {/* Canvas */}
        <div className="w-full h-full z-10">
          {isLoading ? (
            <div className="w-full h-full bg-zinc-950 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-6 h-6 border-2 border-t-transparent border-violet-500 rounded-full animate-spin" />
                <span className="text-xs font-medium tracking-wider text-zinc-500">
                  Fetching topology configurations...
                </span>
              </div>
            </div>
          ) : isError ? (
            <div className="w-full h-full bg-zinc-950 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3 text-center px-6">
                <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center">
                  <span className="text-rose-400 text-lg">!</span>
                </div>
                <span className="text-sm font-medium text-rose-400">
                  Failed to load graph
                </span>
                <span className="text-xs text-zinc-500">
                  This app returned a simulated server error.
                </span>
              </div>
            </div>
          ) : (
            <ReactFlowProvider>
              <AppCanvas
                initialNodes={data?.nodes || []}
                initialEdges={data?.edges || []}
                onNodeSelect={(id) => setSelectedNodeId(id)}
                onNodesReady={handleNodesReady}
              />
            </ReactFlowProvider>
          )}
        </div>

        {/* Right Sidebar Drawer */}
        <div
          className={`
          absolute top-0 right-0 z-30 h-full w-80
          bg-[#0e0e0e] border-l border-zinc-800 shadow-2xl
          transition-transform duration-300 ease-in-out
          ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}
        `}
        >
          <div className="px-4 pt-16 pb-3 border-b border-zinc-800 flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-widest text-zinc-500 font-semibold">
              Service Inspector
            </span>
            <button
              onClick={() => setSelectedNodeId(null)}
              className="text-zinc-600 hover:text-zinc-300 text-sm transition-colors"
            >
              ✕
            </button>
          </div>
          <div className="overflow-y-auto h-[calc(100%-80px)]">
            <NodeInspector
              nodes={liveNodes}
              onUpdateNode={(id, data) => updateNodeFn.current?.(id, data)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
