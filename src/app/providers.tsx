'use client';

import { ReactNode, useEffect } from "react";
import { ThemeProvider } from "./theme-providers";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { store } from "@/store";

const CART_STORAGE_KEY = "ecom_cart_v1";

function CartPersistence({ children }: { children: ReactNode }) {
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (raw) {
        const cartItems = JSON.parse(raw);
        store.dispatch({ type: "cart/hydrateCart", payload: cartItems });
      }

      const unsubscribe = store.subscribe(() => {
        const state = store.getState();
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cart.cartItems));
      });

      return () => {
        unsubscribe();
      };
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
    }
  }, []);

  return <>{children}</>;
}

function Providers({ children }: { children: ReactNode }) {
  return <>
    <Provider store={store}>
      <CartPersistence>
        <Toaster position="top-right" richColors />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </CartPersistence>
    </Provider>
  </>;
}

export default Providers;