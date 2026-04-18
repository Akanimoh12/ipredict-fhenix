"use client";

import { createContext, useContext } from "react";

interface FhenixContextType {
  ready: boolean;
}

const FhenixContext = createContext<FhenixContextType>({ ready: true });

export function useFhenixClient() {
  return useContext(FhenixContext);
}

export function FhenixProvider({ children }: { children: React.ReactNode }) {
  // CoFHE encryption is handled via on-chain FHE.asEuint32().
  // No client-side SDK needed — the context just signals readiness.
  return (
    <FhenixContext.Provider value={{ ready: true }}>
      {children}
    </FhenixContext.Provider>
  );
}
