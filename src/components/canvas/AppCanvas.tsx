import React, { useCallback, useEffect } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  type Edge,
  type Connection,
} from "@xyflow/react";
import {
  ServiceNode,
  type CustomNodeType,
  type ServiceNodeData,
} from "./ServiceNode";
import { useUIStore } from "../../store/useUIStore";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";

const nodeTypes = { customService: ServiceNode };

interface AppCanvasProps {
  initialNodes: CustomNodeType[];
  initialEdges: Edge[];
  onNodeSelect: (id: string | null) => void;
  onNodesReady?: (
    nodes: CustomNodeType[],
    updateNode: (id: string, data: ServiceNodeData) => void,
  ) => void;
}

export const AppCanvas = ({
  initialNodes,
  initialEdges,
  onNodeSelect,
  onNodesReady,
}: AppCanvasProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { fitView, screenToFlowPosition } = useReactFlow();
  const fitViewTrigger = useUIStore((s) => s.fitViewTrigger);
  const triggerFitView = useUIStore((s) => s.triggerFitView);
  const toggleMobilePanel = useUIStore((s) => s.toggleMobilePanel);

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    setTimeout(() => fitView({ padding: 0.2 }), 50);
  }, [initialNodes, initialEdges, setNodes, setEdges, fitView]);

  useEffect(() => {
    if (fitViewTrigger > 0) fitView({ padding: 0.2 });
  }, [fitViewTrigger, fitView]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onSelectionChange = useCallback(
    ({ nodes: selectedNodes }: { nodes: any[] }) => {
      onNodeSelect(selectedNodes.length > 0 ? selectedNodes[0].id : null);
    },
    [onNodeSelect],
  );

  // Add new node
  const handleAddNode = useCallback(() => {
    const id = `node-${Date.now()}`;
    const position = screenToFlowPosition({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });
    const newNode: CustomNodeType = {
      id,
      type: "customService",
      position,
      data: {
        label: "New Service",
        type: "Service",
        status: "Healthy",
        metricsValue: 50,
        provider: "AWS",
        description: "",
      },
    };
    setNodes((nds) => [...nds, newNode]);
  }, [setNodes, screenToFlowPosition]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      const isTyping =
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        (e.target as HTMLElement).isContentEditable;

      // Delete node — skip when typing
      if (!isTyping && (e.key === "Delete" || e.key === "Backspace")) {
        const remainingIds = new Set(
          nodes.filter((n) => !n.selected).map((n) => n.id),
        );
        setNodes((nds) => nds.filter((n) => !n.selected));
        setEdges((eds) =>
          eds.filter(
            (ed) => remainingIds.has(ed.source) && remainingIds.has(ed.target),
          ),
        );
        onNodeSelect(null);
      }

      // Fit view — F key
      if (!isTyping && e.key === "f") {
        triggerFitView();
      }

      // Toggle panel — P key
      if (!isTyping && e.key === "p") {
        toggleMobilePanel();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    nodes,
    setNodes,
    setEdges,
    onNodeSelect,
    triggerFitView,
    toggleMobilePanel,
  ]);

  const updateNode = useCallback(
    (id: string, data: ServiceNodeData) =>
      setNodes((nds) => nds.map((n) => (n.id === id ? { ...n, data } : n))),
    [setNodes],
  );

  useEffect(() => {
    onNodesReady?.(nodes, updateNode);
  }, [nodes, updateNode]);

  return (
    <div className="w-full h-full bg-zinc-950 relative">
      {/* Add Node Button */}
      <div className="absolute top-16 left-20 z-20">
        <Button
          onClick={handleAddNode}
          className="h-9 px-3 bg-[#161616] hover:bg-[#222] border border-neutral-800 text-neutral-300 hover:text-white rounded-lg flex items-center gap-2 text-xs shadow-lg"
          variant="ghost"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Node
        </Button>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onSelectionChange={onSelectionChange}
        nodeTypes={nodeTypes}
        fitView
        className="text-white"
        defaultEdgeOptions={{
          style: { stroke: "#3f3f46", strokeWidth: 2 },
          animated: true,
        }}
      >
        <Background color="#27272a" gap={20} size={1} />
        <Controls
          className="bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-lg p-1 fill-zinc-300 !left-20 !bottom-4 shadow-xl"
          showInteractive={false}
        />
      </ReactFlow>
    </div>
  );
};
