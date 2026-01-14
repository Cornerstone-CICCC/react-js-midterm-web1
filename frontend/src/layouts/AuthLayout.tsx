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
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-5xl overflow-hidden rounded-2xl bg-neutral-900 border border-white/10 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* LEFT IMAGE */}
          <div className="relative hidden md:block">
            <img
              src={authHero}
              alt="Authentication artwork"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/10 to-neutral-900/30" />
          </div>

          {/* RIGHT CONTENT */}
          <div className="p-8 md:p-10 flex flex-col justify-center">
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

        {/* MOBILE IMAGE */}
        <div className="md:hidden border-t border-white/10">
          <img
            src={authHero}
            alt="Authentication artwork"
            className="h-40 w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
