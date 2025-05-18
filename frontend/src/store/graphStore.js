import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useGraphStore = create(
  persist(
    (set) => ({
      nodes: [],
      links: [],
      selectedNode: null,
      addNode: (node) =>
        set((state) => ({
          nodes: [...state.nodes, node],
        })),
      addLink: (link) =>
        set((state) => ({
          links: [...state.links, link],
        })),
      updateNode: (id, updates) =>
        set((state) => ({
          nodes: state.nodes.map((node) =>
            node.id === id ? { ...node, ...updates } : node
          ),
        })),
      setSelectedNode: (nodeId) => set({ selectedNode: nodeId }),
      clearGraph: () => set({ nodes: [], links: [], selectedNode: null }),
    }),
    {
      name: "graph-storage",
    }
  )
);
