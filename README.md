# ReactFlow Canvas — App Graph Builder

A responsive "App Graph Builder" UI built with React, ReactFlow, TanStack Query, and Zustand.

## Setup Instructions

### Prerequisites

- Node.js 18+
- npm 9+

### Install & Run

```bash
git clone <your-repo-url>
cd reacflow-canvas
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Scripts

| Command             | Description                   |
| ------------------- | ----------------------------- |
| `npm run dev`       | Start dev server              |
| `npm run build`     | Type-check + production build |
| `npm run preview`   | Preview production build      |
| `npm run lint`      | Run ESLint                    |
| `npm run typecheck` | Run TypeScript type checker   |

---

## Key Decisions

### Mock API — MSW (Mock Service Worker)

Used MSW instead of raw `setTimeout` wrappers to simulate real HTTP requests at the network level. This means TanStack Query sees real fetch responses, caching and error states behave exactly as they would in production. `supertokens-python` is hardcoded to return a 500 to demonstrate error state.

### State Management — Zustand

Zustand manages four pieces of UI state: `selectedAppId`, `selectedNodeId`, `activeInspectorTab`, and `isMobilePanelOpen`. Server data (apps list, graph) lives in TanStack Query cache — no duplication between client and server state.

### Node Inspector — Right Sidebar Drawer

The inspector slides in from the right when a node is selected and closes on ✕ or deselection. This avoids a permanent panel eating canvas space and works across all screen sizes without a separate mobile breakpoint toggle.

### ReactFlow Node Updates

Inspector edits (name, slider, description) are committed back into ReactFlow node data via a stable `updateNode` callback exposed through `onNodesReady`. This keeps ReactFlow as the single source of truth for node state.

### Folder Structure

```
src/
  components/
    layout/      # TopBar, LeftRail, RightRail
    canvas/      # AppCanvas, ServiceNode
    inspector/   # NodeInspector
    ui/          # shadcn/ui primitives
  hooks/         # useAppGraph (TanStack Query)
  mocks/         # MSW handlers + browser worker
  store/         # Zustand store
```

---

## Known Limitations

- **No persistence** — node edits (name, slider value) are lost on page refresh. Would need localStorage or a backend to persist.
- **MSW in production** — MSW only runs in dev mode. A real backend would be needed for production deployment.
- **No edge creation UI** — users can connect nodes by dragging handles, but there's no explicit "add edge" button.
- **Single graph layout** — nodes use fixed initial positions from the mock API; no auto-layout algorithm (e.g. dagre) is applied.
- **supertokens-python always errors** — the error state is hardcoded to one app ID for demo purposes rather than a toggleable UI control.
