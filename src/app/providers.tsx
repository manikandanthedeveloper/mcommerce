'use client';

import { ReactNode } from "react";
import { ThemeProvider } from "./theme-providers";
import { Toaster } from "sonner";

function Providers({ children }: { children: ReactNode }) {
  return <>
    <Toaster position="top-right" richColors />
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  </>;
}

export default Providers;