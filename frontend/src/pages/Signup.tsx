import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";

export default function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState(""); // optional (you can rename to "name")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setIsLoading(true);

      // TODO: replace with: await auth.signup({ username, email, password })
      await new Promise((res) => setTimeout(res, 600));

      // After signup, usually redirect to login
      navigate("/login");
    } catch (err) {
      setError("Could not create account. Try a different email.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Welcome! Enter your details and start exploring."
      footerText="Already have an account?"
      footerLinkText="Login"
      footerLinkTo="/login"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Error */}
        {error && (
          <div className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        {/* Username (optional) */}
        <div>
          <label className="block text-sm text-white/70 mb-1">Username</label>
          <input
            type="text"
            className="w-full rounded-full bg-white/10 border border-white/10 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="nickname"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm text-white/70 mb-1">
            Email Address
          </label>
          <input
            type="email"
            className="w-full rounded-full bg-white/10 border border-white/10 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-500"
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
            className="w-full rounded-full bg-white/10 border border-white/10 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm text-white/70 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            className="w-full rounded-full bg-white/10 border border-white/10 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-full bg-purple-600 hover:bg-purple-700 py-2.5 font-semibold transition"
        >
          {isLoading ? "Creating..." : "Create account"}
        </button>
      </form>
    </AuthLayout>
  );
}
