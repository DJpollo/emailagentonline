import { useNavigate } from 'react-router-dom';
import { FileText, CheckCircle, Clock, XCircle, Eye } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Table } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { useMyRequests } from '../hooks/useSupabase';
import { useAuth } from '../contexts/AuthContext';
import { Request } from '../lib/supabase';

export default function MyRequestsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { requests, loading } = useMyRequests(user?.email);

  const stats = [
    { title: 'Total Submitted', value: requests.length, icon: FileText, color: 'bg-blue-500' },
    { title: 'Approved', value: requests.filter(r => r.status === 'approved' || r.status === 'auto_approved').length, icon: CheckCircle, color: 'bg-green-500' },
    { title: 'Pending', value: requests.filter(r => r.status === 'pending').length, icon: Clock, color: 'bg-amber-500' },
    { title: 'Rejected', value: requests.filter(r => r.status === 'rejected').length, icon: XCircle, color: 'bg-red-500' },
  ];

  const columns = [
    { header: 'Title', accessor: 'title' },
    { header: 'Category', accessor: 'category' },
    { header: 'Submitted', accessor: (req: Request) => new Date(req.submitted_at).toLocaleDateString() },
    { header: 'Status', accessor: (req: Request) => { const v: Record<string, any> = { pending: { label: 'Pending', variant: 'warning' }, auto_approved: { label: 'Auto-Approved', variant: 'info' }, approved: { label: 'Approved', variant: 'success' }, rejected: { label: 'Rejected', variant: 'danger' }, escalated: { label: 'Escalated', variant: 'danger' } }; const c = v[req.status] || { label: req.status, variant: 'neutral' }; return <Badge variant={c.variant}>{c.label}</Badge>; } },
    { header: 'Risk Score', accessor: (req: Request) => (<span className={`font-bold ${req.risk_level === 'low' ? 'text-success' : req.risk_level === 'medium' ? 'text-warning' : 'text-danger'}`}>{req.risk_score ?? '—'}</span>) },
    { header: 'Actions', accessor: (req: Request) => (<button onClick={() => navigate(`/request/${req.id}`)} className="p-1.5 text-muted hover:text-accent-blue hover:bg-blue-50 rounded-lg transition-colors"><Eye className="w-4 h-4" /></button>) },
  ];

  return (
    <div className="space-y-8">
      <div><h1 className="text-2xl font-bold text-primary-dark">My Requests</h1><p className="text-muted">Track the status of your approval submissions.</p></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Card key={idx} className="flex items-center gap-4 p-4">
            <div className={`${stat.color} p-3 rounded-xl text-white`}><stat.icon className="w-6 h-6" /></div>
            <div><p className="text-sm text-muted font-medium">{stat.title}</p><h3 className="text-2xl font-bold text-primary-dark">{stat.value}</h3></div>
          </Card>
        ))}
      </div>
      <Card>
        {loading ? <div className="py-12 text-center text-muted">Loading your requests...</div> : requests.length === 0 ? <div className="py-12 text-center text-muted">You haven't submitted any requests yet.</div> : (
          <div className="-mx-6 -mb-6"><Table columns={columns} data={requests} /></div>
        )}
      </Card>
    </div>
  );
}
