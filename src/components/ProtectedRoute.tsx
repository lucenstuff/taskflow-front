import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect, useRef } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const toastShown = useRef(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !toastShown.current) {
      toastShown.current = true;
      toast.error("Por favor inicie sesión.");
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
