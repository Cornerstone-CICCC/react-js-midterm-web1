import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // placeholders (we'll connect to AuthContext later)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // basic front validation
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setIsLoading(true);

      // TODO: replace with: await auth.login(email, password)
      await new Promise((res) => setTimeout(res, 600));

      // TODO: after real login, redirect based on role (admin -> /admin)
      navigate("/"); // or "/products" if Miya has that route
    } catch (err) {
      setError("Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Login"
      subtitle="Welcome! Enter your details and start exploring."
      footerText="Don't have an account?"
      footerLinkText="Sign up"
      footerLinkTo="/signup"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Error */}
        {error && (
          <div className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        {/* Email */}
        <div>
          <label className="block text-sm text-white/70 mb-1">
            Email Address
          </label>
          <input
            type="email"
            className="w-full rounded-md bg-white/10 border border-white/10 px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm text-white/70 mb-1">Password</label>
          <input
            type="password"
            className="w-full rounded-md bg-white/10 border border-white/10 px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-md bg-purple-600 hover:bg-purple-700 disabled:opacity-60 disabled:cursor-not-allowed py-2 font-medium transition"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        {/* Helper links */}
        <div className="flex items-center justify-between text-sm">
          <Link
            to="/"
            className="text-white/60 hover:text-white underline underline-offset-4"
          >
            Back to Home
          </Link>

          {/* Optional: you can later add a /forgot route */}
          <button
            type="button"
            className="text-purple-400 hover:text-purple-300 underline underline-offset-4"
            onClick={() => setError("Forgot password is not implemented yet.")}
          >
            Forgot password?
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
