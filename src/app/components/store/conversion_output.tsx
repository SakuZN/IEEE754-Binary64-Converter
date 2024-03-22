import { create } from "zustand";

interface OutputState {
  binary64: string;
  normalized: string;
  hexRepresentation: string;
}

interface OutputAction {
  setBinary64: (binary64: string) => void;
  setNormalized: (normalized: string) => void;
  setHexRepresentation: (hexRepresentation: string) => void;
  reset: () => void;
}

const initState: OutputState = {
  binary64: "0".padStart(64, "0"),
  normalized: "",
  hexRepresentation: "",
};

export const useOutputFormStore = create<OutputState & OutputAction>(
  (set, get) => ({
    ...initState,
    setBinary64: (binary64) => set({ binary64 }),
    setNormalized: (normalized) => set({ normalized }),
    setHexRepresentation: (hexRepresentation) => set({ hexRepresentation }),
    reset: () => set(initState),
  }),
);
