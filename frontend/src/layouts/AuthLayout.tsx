import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import authHero from "../assets/images/auth-hero.png";

type AuthLayoutProps = {
  title: string;
  subtitle?: string;

  footerText?: string;
  footerLinkText?: string;
  footerLinkTo?: string;

  children: ReactNode;
};

export default function AuthLayout({
  title,
  subtitle,
  footerText,
  footerLinkText,
  footerLinkTo,
  children,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-neutral-950 text-white">
      <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2">
        {/* LEFT IMAGE */}
        <div className="relative hidden md:block">
          <img
            src={authHero}
            alt="Authentication artwork"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/10 to-black/30" />
        </div>

        {/* RIGHT PANEL */}
        <div className="min-h-screen w-full bg-neutral-900/60 flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-lg">
            <header className="mb-6">
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
                {title}
              </h1>

              {subtitle && (
                <p className="mt-2 text-sm md:text-base text-white/70 leading-relaxed">
                  {subtitle}
                </p>
              )}
            </header>

            <div className="space-y-5">{children}</div>

            {footerText && footerLinkText && footerLinkTo && (
              <p className="mt-6 text-sm text-white/70">
                {footerText}{" "}
                <Link
                  to={footerLinkTo}
                  className="text-purple-400 hover:text-purple-300 underline underline-offset-4"
                >
                  {footerLinkText}
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
