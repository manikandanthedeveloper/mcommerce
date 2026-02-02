'use client';

import { ReactNode } from "react";
import { ThemeProvider } from "./theme-providers";

function Providers({ children }: { children: ReactNode }) {
  return <>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  </>;
}

export default Providers;