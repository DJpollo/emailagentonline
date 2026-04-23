import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { AuthShell } from '../components/auth/AuthShell';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();
  const redirectTo = location.state && typeof location.state === 'object' && 'from' in location.state
    ? (location.state.from as { pathname?: string })?.pathname || '/dashboard'
    : '/dashboard';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await signIn(email, password);
    if (error) setError(error.message);
    else navigate(redirectTo, { replace: true });
    setLoading(false);
  };

  return (
    <AuthShell
      title="Welcome Back"
      subtitle="Sign in to review incoming requests, approval decisions, and escalation activity."
      footer={
        <>
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-semibold text-[#8d69b3] transition-colors hover:text-[#6e58a0]">
            Create an account
          </Link>
        </>
      }
    >
      {error ? (
        <div className="mb-5 rounded-[20px] border border-[#f0b7c7] bg-[linear-gradient(180deg,rgba(255,224,224,0.78),rgba(255,255,255,0.4))] px-4 py-3 text-sm text-[#9a5b72]">
          {error}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          required
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input h-14 rounded-[20px] px-5 text-base"
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input h-14 rounded-[20px] px-5 text-base"
        />
        <Button
          type="submit"
          className="mt-2 h-14 w-full rounded-[20px] border border-white/60 bg-[linear-gradient(135deg,#6050a8_0%,#3f3483_100%)] text-lg font-semibold text-white shadow-[0_18px_40px_rgba(85,71,126,0.28)] hover:brightness-[1.04]"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      <div className="auth-divider mt-8 text-sm uppercase tracking-[0.24em]">Supabase email sign in</div>
      <p className="mt-5 text-center text-sm leading-7 text-[#6f6281]">
        OAuth buttons are intentionally omitted here because this project currently uses Supabase email and password auth only.
      </p>
    </AuthShell>
  );
}
