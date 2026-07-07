import { createContext, useContext, type ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getDevPreviewAuthState, isDevPreviewEnabled, type DevPreviewMode } from "@/lib/devPreview";

const DevPreviewAuthContext = createContext<ReturnType<typeof getDevPreviewAuthState> | null>(null);

export function useDevPreviewAuth() {
  return useContext(DevPreviewAuthContext);
}

export function DevPreviewAuthProvider({ mode, children }: { mode: DevPreviewMode; children: ReactNode }) {
  if (!isDevPreviewEnabled()) {
    return <Navigate to="/" replace />;
  }

  return (
    <DevPreviewAuthContext.Provider value={getDevPreviewAuthState(mode)}>
      {children}
    </DevPreviewAuthContext.Provider>
  );
}

export function DevPreviewLayout() {
  if (!isDevPreviewEnabled()) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
