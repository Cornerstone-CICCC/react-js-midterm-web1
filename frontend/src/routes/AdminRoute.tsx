import { Navigate } from "react-router-dom";
import { useUser } from "../context/user/UseUser";

type Props = {
  children: React.ReactNode;
};

export default function AdminRoute({ children }: Props) {
  const { loggedInUser } = useUser() as any; // ajusta si tu hook tipa diferente

  // Not logged in
  if (!loggedInUser) {
    return <Navigate to="/login" replace />;
  }

  // Not admin
  if (loggedInUser.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
