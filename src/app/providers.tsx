'use client';

import { ReactNode, useEffect, useRef } from "react";
import { ThemeProvider } from "./theme-providers";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { store } from "@/store";
import { useAuth } from "@clerk/nextjs";

const CART_STORAGE_KEY = "ecom_cart_v1";
const getStorageKey = (userId: string | null | undefined) =>
  userId ? `${CART_STORAGE_KEY}_${userId}` : `${CART_STORAGE_KEY}_anon`;

function CartPersistence({ children }: { children: ReactNode }) {
  const { userId } = useAuth();
  const skipSyncRef = useRef(true);

  useEffect(() => {
    try {
      const storageKey = getStorageKey(userId);
      const raw = localStorage.getItem(storageKey);
      const localItems = raw ? JSON.parse(raw) : [];
      if (!userId && localItems.length) {
        store.dispatch({ type: "cart/hydrateCart", payload: localItems });
      }

      let syncTimeout: ReturnType<typeof setTimeout> | null = null;
      const syncCart = (items: Array<{ productId: string; amount: number }>) => {
        if (!userId) return;
        if (syncTimeout) clearTimeout(syncTimeout);
        syncTimeout = setTimeout(() => {
          fetch("/api/cart/sync", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items }),
          }).catch((error) => {
            console.error("Cart sync failed:", error);
          });
        }, 300);
      };

      const unsubscribe = store.subscribe(() => {
        const state = store.getState();
        localStorage.setItem(
          storageKey,
          JSON.stringify(state.cart.cartItems),
        );

        if (!skipSyncRef.current) {
          const payload = state.cart.cartItems.map((item) => ({
            productId: item.productId,
            amount: item.amount,
          }));
          syncCart(payload);
        }
      });

      if (userId) {
        fetch("/api/cart")
          .then((response) => response.json())
          .then((data) => {
            const serverItems = Array.isArray(data.items) ? data.items : [];
            if (serverItems.length > 0) {
              skipSyncRef.current = true;
              store.dispatch({
                type: "cart/hydrateCart",
                payload: serverItems,
              });
            } else {
              store.dispatch({ type: "cart/hydrateCart", payload: [] });
            }
          })
          .catch((error) => {
            console.error("Cart fetch failed:", error);
          })
          .finally(() => {
            skipSyncRef.current = false;
          });
      } else {
        skipSyncRef.current = true;
      }

      return () => {
        if (syncTimeout) clearTimeout(syncTimeout);
        unsubscribe();
      };
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
    }
  }, [userId]);

  return <>{children}</>;
}

function Providers({ children }: { children: ReactNode }) {
  return <>
    <Provider store={store}>
      <CartPersistence>
        <Toaster position="bottom-right" richColors />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </CartPersistence>
    </Provider>
  </>;
}

export default Providers;