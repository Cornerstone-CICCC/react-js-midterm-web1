import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/user/UseUser";

type Props = {
  children: ReactNode;
};

export default function AdminRoute({ children }: Props) {
  // ✅ DEV ONLY: allow access so you can test Admin UI without backend/admin user
  if (import.meta.env.DEV) {
    return <>{children}</>;
  }

  const userCtx = useUser() as any;

  // ✅ support different naming in your context
  const currentUser =
    userCtx.logginUser ?? userCtx.loggedInUser ?? userCtx.user ?? null;

  if (!currentUser) return <Navigate to="/login" replace />;
  if (currentUser.role !== "admin") return <Navigate to="/" replace />;

  return <>{children}</>;
}
