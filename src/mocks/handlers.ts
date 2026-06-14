import { http, HttpResponse } from "msw";

const APPS = [
  { id: "supertokens-golang", name: "supertokens-golang" },
  { id: "supertokens-java", name: "supertokens-java" },
  { id: "supertokens-python", name: "supertokens-python" },
  { id: "supertokens-ruby", name: "supertokens-ruby" },
  { id: "supertokens-go", name: "supertokens-go" },
];

const GRAPHS: Record<string, { nodes: any[]; edges: any[] }> = {
  "supertokens-golang": {
    nodes: [
      {
        id: "1",
        type: "customService",
        position: { x: 150, y: 200 },
        data: {
          label: "Go Web Server",
          type: "Service",
          status: "Healthy",
          metricsValue: 45,
          provider: "AWS",
        },
      },
      {
        id: "2",
        type: "customService",
        position: { x: 550, y: 100 },
        data: {
          label: "Redis Cache",
          type: "Service",
          status: "Degraded",
          metricsValue: 80,
          provider: "AWS",
        },
      },
      {
        id: "3",
        type: "customService",
        position: { x: 550, y: 320 },
        data: {
          label: "Postgres DB",
          type: "DB",
          status: "Healthy",
          metricsValue: 12,
          provider: "AWS",
        },
      },
    ],
    edges: [
      {
        id: "e1-2",
        source: "1",
        target: "2",
        animated: true,
        style: { stroke: "#52525b" },
      },
      {
        id: "e1-3",
        source: "1",
        target: "3",
        animated: true,
        style: { stroke: "#52525b" },
      },
    ],
  },
  "supertokens-java": {
    nodes: [
      {
        id: "j1",
        type: "customService",
        position: { x: 150, y: 220 },
        data: {
          label: "Java Engine",
          type: "Service",
          status: "Healthy",
          metricsValue: 62,
          provider: "AWS",
        },
      },
      {
        id: "j2",
        type: "customService",
        position: { x: 550, y: 220 },
        data: {
          label: "MySQL Replica",
          type: "DB",
          status: "Down",
          metricsValue: 0,
          provider: "AWS",
        },
      },
    ],
    edges: [
      {
        id: "ej1-2",
        source: "j1",
        target: "j2",
        animated: true,
        style: { stroke: "#52525b" },
      },
    ],
  },
};

export const handlers = [
  http.get("/api/apps", () => {
    return HttpResponse.json(APPS);
  }),

  http.get("/api/apps/:appId/graph", ({ params }) => {
    const { appId } = params as { appId: string };
    if (appId === "supertokens-python") {
      return new HttpResponse(null, { status: 500 });
    }
    const graph = GRAPHS[appId] ?? GRAPHS["supertokens-golang"];
    return HttpResponse.json(graph);
  }),
];
