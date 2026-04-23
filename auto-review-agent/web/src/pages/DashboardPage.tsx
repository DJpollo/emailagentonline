import { useMemo } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import {
  FileText,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Plus,
  ListFilter,
  History,
  TrendingUp,
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Table } from '../components/ui/Table';
import { useRequests, useDashboardStats } from '../hooks/useSupabase';
import { Request } from '../lib/supabase';

interface DashboardOutletContext {
  searchQuery: string;
}

type BadgeVariant = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { requests, loading: reqLoading } = useRequests();
  const { stats, loading: statsLoading } = useDashboardStats();
  const { searchQuery } = useOutletContext<DashboardOutletContext>();

  const statCards = [
    { title: 'Total Requests', value: stats.totalRequests, icon: FileText, color: 'bg-blue-500', accent: 'border-blue-500', trend: 'All time' },
    { title: 'Auto-Approved', value: stats.autoApproved, icon: CheckCircle2, color: 'bg-green-500', accent: 'border-green-500', trend: 'AI approved' },
    { title: 'Pending Review', value: stats.pendingReview, icon: Clock, color: 'bg-amber-500', accent: 'border-amber-500', trend: 'Awaiting action' },
    { title: 'Escalated', value: stats.escalated, icon: AlertTriangle, color: 'bg-red-500', accent: 'border-red-500', trend: 'Needs attention' },
  ];

  const columns = [
    {
      header: 'Request Title',
      accessor: (req: Request) => (
        <div className="flex flex-col">
          <span className="font-medium text-primary-dark">{req.title}</span>
          <span className="text-xs text-muted">#{req.id}</span>
        </div>
      ),
    },
    {
      header: 'Requester',
      accessor: (req: Request) => req.requester_name || req.requester_email || '-',
    },
    { header: 'Category', accessor: 'category' },
    {
      header: 'Risk Score',
      accessor: (req: Request) => (
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${req.risk_level === 'low' ? 'bg-success' : req.risk_level === 'medium' ? 'bg-warning' : 'bg-danger'}`}
              style={{ width: `${req.risk_score ?? 0}%` }}
            />
          </div>
          <span
            className={`text-xs font-bold ${req.risk_level === 'low' ? 'text-success' : req.risk_level === 'medium' ? 'text-warning' : 'text-danger'}`}
          >
            {req.risk_score ?? '-'}
          </span>
        </div>
      ),
    },
    {
      header: 'Status',
      accessor: (req: Request) => {
        const variants: Record<string, BadgeVariant> = {
          pending: 'warning',
          auto_approved: 'success',
          approved: 'success',
          rejected: 'danger',
          escalated: 'danger',
        };
        const labels: Record<string, string> = {
          pending: 'Pending',
          auto_approved: 'Auto-Approved',
          approved: 'Approved',
          rejected: 'Rejected',
          escalated: 'Escalated',
        };

        return <Badge variant={variants[req.status] || 'neutral'}>{labels[req.status] || req.status}</Badge>;
      },
    },
    {
      header: 'Submitted',
      accessor: (req: Request) => new Date(req.submitted_at).toLocaleDateString(),
    },
  ];

  const filteredRequests = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return requests;
    }

    return requests.filter((req) => {
      const fields = [
        req.title,
        req.requester_name,
        req.requester_email,
        req.category,
        req.status,
        req.ai_summary,
        String(req.id),
      ];

      return fields.some((field) => field?.toLowerCase().includes(normalizedQuery));
    });
  }, [requests, searchQuery]);

  const total =
    stats.riskDistribution.low + stats.riskDistribution.medium + stats.riskDistribution.high || 1;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, idx) => (
          <Card
            key={idx}
            className={`relative overflow-hidden border-l-4 ${stat.accent} cursor-default transition-transform hover:translate-y-[-2px]`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="mb-1 text-sm font-medium text-muted">{stat.title}</p>
                <h3 className="text-3xl font-bold text-primary-dark">
                  {statsLoading ? '-' : stat.value}
                </h3>
              </div>
              <div className={`${stat.color} rounded-lg p-2 text-white`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs text-muted">
              <TrendingUp className="h-3 w-3 text-success" />
              <span>{stat.trend}</span>
            </div>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card title="Recent Requests" subtitle="Latest approval submissions">
            {reqLoading ? (
              <div className="py-12 text-center text-muted">Loading...</div>
            ) : requests.length === 0 ? (
              <div className="py-12 text-center text-muted">
                No requests yet. They will appear here once emails come in.
              </div>
            ) : filteredRequests.length === 0 ? (
              <div className="py-12 text-center text-muted">
                No requests matched "{searchQuery}".
              </div>
            ) : (
              <div className="-mx-6 -mb-6">
                <Table
                  columns={columns}
                  data={filteredRequests.slice(0, 5)}
                  onRowClick={(req) => navigate(`/request/${req.id}`)}
                />
                <div className="flex justify-center border-t border-border p-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-accent-blue"
                    onClick={() => navigate('/queue')}
                  >
                    View all requests
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
        <div className="space-y-8">
          <Card title="Risk Distribution" subtitle="AI analysis breakdown">
            <div className="mt-2 space-y-4">
              {[
                { label: 'Low Risk', count: stats.riskDistribution.low, color: 'bg-success' },
                { label: 'Medium Risk', count: stats.riskDistribution.medium, color: 'bg-warning' },
                { label: 'High Risk', count: stats.riskDistribution.high, color: 'bg-danger' },
              ].map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-primary-dark">{item.label}</span>
                    <span className="text-muted">{item.count}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${(item.count / total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card title="Quick Actions">
            <div className="grid grid-cols-1 gap-3">
              <Button
                onClick={() => navigate('/submit')}
                className="w-full justify-start gap-3"
                variant="outline"
              >
                <Plus className="h-4 w-4 text-accent-blue" />
                Submit New Request
              </Button>
              <Button
                onClick={() => navigate('/queue')}
                className="w-full justify-start gap-3"
                variant="outline"
              >
                <ListFilter className="h-4 w-4 text-amber-500" />
                Review Pending Queue
              </Button>
              <Button
                onClick={() => navigate('/activity')}
                className="w-full justify-start gap-3"
                variant="outline"
              >
                <History className="h-4 w-4 text-slate-500" />
                View Activity Logs
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
