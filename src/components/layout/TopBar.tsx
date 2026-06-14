import React, { useState } from "react";
import {
  Lightbulb,
  Settings,
  Rocket,
  ClipboardList,
  Puzzle,
  Search,
  Plus,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Maximize2,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAppsQuery } from "../../hooks/useAppGraph";
import { useUIStore } from "../../store/useUIStore";

const APP_META: Record<string, { icon: React.ElementType; color: string }> = {
  "supertokens-golang": { icon: Lightbulb, color: "bg-[#5B60FF]" },
  "supertokens-java": { icon: Settings, color: "bg-[#8B5CF6]" },
  "supertokens-python": { icon: Rocket, color: "bg-[#EF4444]" },
  "supertokens-ruby": { icon: ClipboardList, color: "bg-[#EC4899]" },
  "supertokens-go": { icon: Puzzle, color: "bg-[#A78BFA]" },
};

export default function TopBar() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const selectedAppId = useUIStore((s) => s.selectedAppId);
  const triggerFitView = useUIStore((s) => s.triggerFitView);
  const setSelectedAppId = useUIStore((s) => s.setSelectedAppId);

  const { data: apps = [] } = useAppsQuery();

  const filtered = apps.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase()),
  );
  const meta = APP_META[selectedAppId] ?? {
    icon: Lightbulb,
    color: "bg-zinc-700",
  };
  const SelectedIcon = meta.icon;

  return (
    <div className="flex items-center gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <Button
            variant="ghost"
            className="h-10 px-3 bg-[#161616] hover:bg-[#222] border border-neutral-800 text-neutral-200 flex items-center gap-3 rounded-lg"
          >
            <div
              className={`w-6 h-6 rounded flex items-center justify-center ${meta.color} text-white`}
            >
              <SelectedIcon className="w-4 h-4" />
            </div>
            <span className="font-medium text-sm">{selectedAppId}</span>
            {open ? (
              <ChevronUp className="w-4 h-4 text-neutral-400 ml-4" />
            ) : (
              <ChevronDown className="w-4 h-4 text-neutral-400 ml-4" />
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          sideOffset={6}
          className="w-80 bg-black border border-neutral-800 rounded-xl p-4 text-white shadow-2xl"
        >
          <h3 className="text-lg font-semibold mb-3 tracking-wide text-neutral-200">
            Application
          </h3>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#161616] border-neutral-800 text-sm pl-9 h-9 text-neutral-200 placeholder:text-neutral-600"
              />
            </div>
            <Button
              size="icon"
              className="h-9 w-9 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-1 max-h-60 overflow-y-auto pr-1">
            {filtered.map((app) => {
              const m = APP_META[app.id] ?? {
                icon: Lightbulb,
                color: "bg-zinc-700",
              };
              const Icon = m.icon;
              return (
                <button
                  key={app.id}
                  onClick={() => {
                    setSelectedAppId(app.id);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded-lg hover:bg-neutral-900 transition-colors text-left group
                  ${selectedAppId === app.id ? "bg-neutral-900" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${m.color} text-white`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-neutral-300 group-hover:text-white">
                      {app.name}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-600 group-hover:text-neutral-400" />
                </button>
              );
            })}
            {filtered.length === 0 && (
              <p className="text-xs text-neutral-500 text-center py-4">
                No applications found.
              </p>
            )}
          </div>
        </PopoverContent>
      </Popover>
      <Button
        variant="ghost"
        onClick={triggerFitView}
        className="h-10 px-3 bg-[#161616] hover:bg-[#222] border border-neutral-800 text-neutral-400 hover:text-white rounded-lg"
      >
        <Maximize2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
