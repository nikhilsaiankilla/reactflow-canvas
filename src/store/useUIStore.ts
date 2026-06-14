import { create } from "zustand";

interface UIState {
  selectedAppId: string;
  selectedNodeId: string | null;
  isMobilePanelOpen: boolean;
  activeInspectorTab: "config" | "runtime";
  fitViewTrigger: number;
  setSelectedAppId: (id: string) => void;
  setSelectedNodeId: (id: string | null) => void;
  toggleMobilePanel: (isOpen?: boolean) => void;
  setActiveInspectorTab: (tab: "config" | "runtime") => void;
  triggerFitView: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  selectedAppId: "supertokens-golang",
  selectedNodeId: null,
  isMobilePanelOpen: false,
  activeInspectorTab: "config",
  fitViewTrigger: 0,
  setSelectedAppId: (id) => set({ selectedAppId: id, selectedNodeId: null }),
  setSelectedNodeId: (id) => set({ selectedNodeId: id }),
  toggleMobilePanel: (isOpen) =>
    set((s) => ({
      isMobilePanelOpen: isOpen !== undefined ? isOpen : !s.isMobilePanelOpen,
    })),
  setActiveInspectorTab: (tab) => set({ activeInspectorTab: tab }),
  triggerFitView: () => set((s) => ({ fitViewTrigger: s.fitViewTrigger + 1 })),
}));
