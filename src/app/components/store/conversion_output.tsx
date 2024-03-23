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
  binary64: "0".padStart(64, "0"),
  normalized: "",
  exponent: 0,
  hexRepresentation: "0x0".padEnd(16, "0"),
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
