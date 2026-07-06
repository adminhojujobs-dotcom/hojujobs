import { createContext, useContext, type ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getDevPreviewAuthState, isDevPreviewEnabled, type DevPreviewMode } from "@/lib/devPreview";

const DevPreviewAuthContext = createContext<ReturnType<typeof getDevPreviewAuthState> | null>(null);
const GLOBAL_DEV_AUTH_KEY = "hoju_dev_preview_auth";

function isDevPreviewMode(value: string | null): value is DevPreviewMode {
  return value === "onboarding" || value === "job_seeker" || value === "business";
}

function getGlobalDevPreviewMode(): DevPreviewMode | null {
  if (!isDevPreviewEnabled() || typeof window === "undefined") return null;

  const params = new URLSearchParams(window.location.search);
  const requestedMode = params.get("devAuth");

  if (requestedMode === "off") {
    window.localStorage.removeItem(GLOBAL_DEV_AUTH_KEY);
    return null;
  }

  if (isDevPreviewMode(requestedMode)) {
    window.localStorage.setItem(GLOBAL_DEV_AUTH_KEY, requestedMode);
    return requestedMode;
  }

  const storedMode = window.localStorage.getItem(GLOBAL_DEV_AUTH_KEY);
  return isDevPreviewMode(storedMode) ? storedMode : null;
}

export function useDevPreviewAuth() {
  const routePreview = useContext(DevPreviewAuthContext);
  if (routePreview) return routePreview;

  const globalMode = getGlobalDevPreviewMode();
  return globalMode ? getDevPreviewAuthState(globalMode) : null;
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
