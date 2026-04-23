import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { useAuth } from '../contexts/AuthContext';
import { AuthShell } from '../components/auth/AuthShell';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'requester' | 'admin'>('requester');
  const [adminCode, setAdminCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const roleOptions = [
    { value: 'requester', label: 'Requester' },
    { value: 'admin', label: 'Admin' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await signUp(email, password, fullName, role, adminCode);
    if (error) setError(error.message);
    else navigate('/dashboard', { replace: true });
    setLoading(false);
  };

  return (
    <AuthShell
      title="Create Account"
      subtitle="Create your account to start submitting requests or reviewing approval work."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-[#8d69b3] transition-colors hover:text-[#6e58a0]">
            Sign in
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
          label="Full Name"
          placeholder="Enter your full name"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="auth-input h-14 rounded-[20px] px-5 text-base"
        />
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input h-14 rounded-[20px] px-5 text-base"
        />
        <Select
          label="Account Type"
          options={roleOptions}
          value={role}
          onChange={(e) => setRole(e.target.value as 'requester' | 'admin')}
          className="auth-input h-14 rounded-[20px] px-5 pr-10 text-base"
        />
        {role === 'admin' ? (
          <Input
            label="Organization Admin Code"
            type="password"
            placeholder="Enter admin code"
            required
            value={adminCode}
            onChange={(e) => setAdminCode(e.target.value)}
            className="auth-input h-14 rounded-[20px] px-5 text-base"
          />
        ) : null}
        <Input
          label="Password"
          type="password"
          placeholder="Create a password"
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
          {loading ? 'Creating account...' : 'Create Account'}
        </Button>
      </form>
    </AuthShell>
  );
}
