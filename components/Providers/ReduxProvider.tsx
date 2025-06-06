// app/providers.tsx
"use client";

import { store } from "@/store/store";
import { Provider } from "react-redux";
 // Adjust the import path based on your project

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
