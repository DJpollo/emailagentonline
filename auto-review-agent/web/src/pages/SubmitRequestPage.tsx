import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, CheckCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { submitRequestViaEmail } from '../hooks/useSupabase';
import { useAuth } from '../contexts/AuthContext';

export default function SubmitRequestPage() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: '',
    category: 'Room Booking',
    urgency: 'normal',
    department: '',
    description: '',
  });

  const categories = [
    { value: 'Room Booking', label: 'Room Booking' },
    { value: 'Club Permission', label: 'Club Permission' },
    { value: 'IT Access', label: 'IT Access' },
    { value: 'Budget Approval', label: 'Budget Approval' },
    { value: 'Event Approval', label: 'Event Approval' },
    { value: 'Other', label: 'Other' },
  ];

  const urgencies = [
    { value: 'low', label: 'Low' },
    { value: 'normal', label: 'Normal' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' },
  ];

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const senderEmail = user?.email || 'unknown@user.com';
      const senderName = profile?.full_name || user?.email || 'User';

      await submitRequestViaEmail({
        from: senderEmail,
        subject: `[${form.category}] ${form.title}`,
        body: `Requester: ${senderName}
Department: ${form.department}
Urgency: ${form.urgency}
Category: ${form.category}

${form.description}`,
      });

      setSuccess(true);
      setTimeout(() => navigate('/my-requests'), 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to submit request.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto mt-20 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-success" />
        </div>
        <h2 className="text-2xl font-bold text-primary-dark mb-2">Request Submitted!</h2>
        <p className="text-muted">Our AI agent is analyzing your request. You'll see the result in My Requests shortly.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary-dark">Submit New Request</h1>
        <p className="text-muted">Fill out the form below. Our AI agent will analyze the risk automatically within 1 minute.</p>
      </div>

      {error && <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Input label="Request Title" placeholder="e.g., Conference Room A Booking for Team Sync" required value={form.title} onChange={handleChange('title')} />
            </div>
            <Select label="Category" options={categories} required value={form.category} onChange={handleChange('category')} />
            <Select label="Urgency Level" options={urgencies} required value={form.urgency} onChange={handleChange('urgency')} />
            <div className="md:col-span-2">
              <Input label="Department / Team" placeholder="e.g., Marketing, Engineering" required value={form.department} onChange={handleChange('department')} />
            </div>
            <div className="md:col-span-2 space-y-1.5">
              <label className="block text-sm font-medium text-primary-dark">Description</label>
              <textarea
                className="block w-full px-3 py-2 bg-white border border-border rounded-lg text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue min-h-[120px]"
                placeholder="Provide detailed information about your request..."
                required
                value={form.description}
                onChange={handleChange('description')}
              />
            </div>
          </div>
        </Card>

        <div className="flex items-center justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
          <Button type="submit" className="gap-2" disabled={loading}>
            <Send className="w-4 h-4" />
            {loading ? 'Submitting...' : 'Submit Request'}
          </Button>
        </div>
      </form>
    </div>
  );
}
