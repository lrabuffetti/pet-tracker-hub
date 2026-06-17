"use client";

import { useEffect, type ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";

type RequireAuthProps = {
  children: ReactNode;
  onUnauthenticated: () => void;
};

export const RequireAuth = ({
  children,
  onUnauthenticated,
}: RequireAuthProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      onUnauthenticated();
    }
  }, [isLoading, isAuthenticated, onUnauthenticated]);

  if (isLoading || !isAuthenticated) {
    return null;
  }

  return children;
};
