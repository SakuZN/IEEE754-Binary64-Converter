import { create } from "zustand";

interface OutputState {
  binary64: string;
  normalized: string;
  exponent: number;
  hexRepresentation: string;
}

interface OutputAction {
  setBinary64: (binary64: string) => void;
  setNormalized: (normalized: string) => void;
  setHexRepresentation: (hexRepresentation: string) => void;
  setExponent: (exponent: number) => void;
  reset: () => void;
}

const initState: OutputState = {
  binary64: "",
  normalized: "",
  exponent: 0,
  hexRepresentation: "",
};

export const useOutputFormStore = create<OutputState & OutputAction>(
  (set, get) => ({
    ...initState,
    setBinary64: (binary64) => set({ binary64 }),
    setNormalized: (normalized) => set({ normalized }),
    setHexRepresentation: (hexRepresentation) => set({ hexRepresentation }),
    setExponent: (exponent) => set({ exponent }),
    reset: () => set(initState),
  }),
);
