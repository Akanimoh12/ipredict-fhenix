"use client";

import { WagmiProvider } from "@/components/providers/WagmiProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { FhenixProvider } from "@/components/providers/FhenixProvider";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider>
      <QueryProvider>
        <RainbowKitProvider theme={darkTheme({ accentColor: "#4c6ef5" })}>
          <FhenixProvider>{children}</FhenixProvider>
        </RainbowKitProvider>
      </QueryProvider>
    </WagmiProvider>
  );
}
