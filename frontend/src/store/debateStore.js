import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useDebateStore = create(
  persist(
    (set) => ({
      isDebateMode: false,
      debateTopic: null,
      proArguments: [],
      conArguments: [],

      setDebateMode: (isActive) => set({ isDebateMode: isActive }),

      setDebateTopic: (topic) =>
        set({
          debateTopic: topic,
          proArguments: [],
          conArguments: [],
        }),

      addProArgument: (argument) =>
        set((state) => ({
          proArguments: [...state.proArguments, argument],
        })),

      addConArgument: (argument) =>
        set((state) => ({
          conArguments: [...state.conArguments, argument],
        })),

      clearDebate: () =>
        set({
          debateTopic: null,
          proArguments: [],
          conArguments: [],
        }),
    }),
    {
      name: "debate-storage",
    }
  )
);
