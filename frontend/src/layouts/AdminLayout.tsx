import type { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../context/user/UseUser";

type Props = {
  title?: string;
  subtitle?: string;
  children: ReactNode;
};

export default function AdminLayout({
  title = "Admin Dashboard",
  subtitle = "Manage products and keep your store updated.",
  children,
}: Props) {
  const navigate = useNavigate();
  const userCtx = useUser() as any;

  const currentUser =
    userCtx.logginUser ?? userCtx.loggedInUser ?? userCtx.user ?? null;

  const handleLogout = () => {
    // If your context has a logout/reset function, call it here:
    // userCtx.logout?.();

    // fallback: try to clear common fields safely
    userCtx.setLogginUser?.(null);
    userCtx.setActiveCartId?.("");
    userCtx.setCart?.([]);

    toast.info("Logged out");
    navigate("/login");
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-neutral-950 text-white">
      {/* Top bar */}
      <div className="w-full border-b border-white/10 bg-neutral-950/70 backdrop-blur">
        <div className="mx-auto w-full max-w-6xl px-5 py-4 md:px-10">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight truncate">
                {title}
              </h1>
              <p className="mt-1 text-sm text-white/60 truncate">{subtitle}</p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="hidden sm:inline-flex rounded-full bg-white/10 border border-white/10 px-4 py-2 text-sm hover:bg-white/15 transition"
              >
                Back to Store
              </Link>

              <div className="hidden md:flex items-center gap-3 rounded-full bg-white/10 border border-white/10 px-4 py-2">
                <div className="h-8 w-8 rounded-full bg-black/30 border border-white/10 flex items-center justify-center text-white/70">
                  {currentUser?.username?.[0]?.toUpperCase?.() ??
                    currentUser?.email?.[0]?.toUpperCase?.() ??
                    "A"}
                </div>
                <div className="max-w-[180px]">
                  <div className="text-sm font-medium truncate">
                    {currentUser?.username || "Admin"}
                  </div>
                  <div className="text-xs text-white/60 truncate">
                    {currentUser?.email || "admin@store.com"}
                  </div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="rounded-full bg-purple-600 hover:bg-purple-700 px-4 py-2 text-sm font-semibold transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="h-[calc(100vh-73px)] md:h-[calc(100vh-81px)]">
        {children}
      </div>
    </div>
  );
}
