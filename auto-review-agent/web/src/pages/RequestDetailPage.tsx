import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle, AlertTriangle, MessageSquare, Clock, User, Building2, Calendar, ShieldAlert, Info } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useRequest, useRequestActivityLog, approveRequest, rejectRequest, escalateRequest } from '../hooks/useSupabase';
import { useAuth } from '../contexts/AuthContext';

export default function RequestDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { request, loading, refetch } = useRequest(id);
  const { logs } = useRequestActivityLog(request?.id);
  const [notes, setNotes] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [actionMsg, setActionMsg] = useState<string | null>(null);

  if (loading) return <div className="py-20 text-center text-muted">Loading request...</div>;
  if (!request) return (
    <div className="flex flex-col items-center justify-center py-20">
      <h2 className="text-2xl font-bold text-primary-dark">Request Not Found</h2>
      <Button onClick={() => navigate('/queue')} className="mt-6">Back to Queue</Button>
    </div>
  );

  const doAction = async (fn: Function, msg: string) => {
    setActionLoading(true);
    const { error } = await fn(request.id, notes, profile?.full_name || 'Admin');
    if (error) setActionMsg('Error: ' + error.message);
    else { setActionMsg(msg); await refetch(); }
    setActionLoading(false);
  };

  const statusVariant = request.status === 'approved' || request.status === 'auto_approved' ? 'success' : request.status === 'pending' ? 'warning' : 'danger';

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted hover:text-primary-dark transition-colors font-medium"><ArrowLeft className="w-4 h-4" />Back</button>
        <div className="flex items-center gap-3">
          <Badge variant={statusVariant}>{request.status.replace('_', ' ').toUpperCase()}</Badge>
          <span className="text-sm text-muted">Submitted {new Date(request.submitted_at).toLocaleString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-primary-dark mb-2">{request.title}</h1>
                <div className="flex flex-wrap gap-4 text-sm text-muted">
                  <div className="flex items-center gap-1.5"><User className="w-4 h-4" />{request.requester_name || request.requester_email}</div>
                  <div className="flex items-center gap-1.5"><Building2 className="w-4 h-4" />{request.department || '—'}</div>
                  <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{request.category}</div>
                  <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" />Urgency: <span className="font-semibold text-primary-dark capitalize">{request.urgency}</span></div>
                </div>
              </div>
              <div className="border-t border-border pt-6">
                <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">Description</h3>
                <p className="text-primary-dark leading-relaxed whitespace-pre-wrap">{request.description}</p>
              </div>
              {request.admin_notes && (
                <div className="border-t border-border pt-6">
                  <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">Admin Notes</h3>
                  <p className="text-primary-dark leading-relaxed">{request.admin_notes}</p>
                </div>
              )}
            </div>
          </Card>

          <Card title="Audit Timeline" subtitle="History of actions taken on this request">
            {logs.length === 0 ? <p className="text-muted text-sm">No activity yet.</p> : (
              <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-200">
                {logs.map((entry, idx) => (
                  <div key={entry.id} className="relative flex items-start">
                    <div className={`absolute left-0 w-10 h-10 rounded-full border-4 border-white flex items-center justify-center z-10 ${idx === 0 ? 'bg-accent-blue text-white' : 'bg-slate-100 text-slate-500'}`}>
                      <div className="w-2 h-2 rounded-full bg-current" />
                    </div>
                    <div className="ml-14 flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-primary-dark">{entry.action}</span>
                        <span className="text-xs text-muted">{new Date(entry.created_at).toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-muted">by <span className="font-medium text-slate-700">{entry.actor_name || 'System'}</span></p>
                      {entry.notes && <p className="mt-2 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg italic">"{entry.notes}"</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        <div className="space-y-8">
          <Card className={`border-l-4 ${request.risk_level === 'high' ? 'border-l-danger bg-red-50/30' : request.risk_level === 'medium' ? 'border-l-warning bg-amber-50/30' : 'border-l-success bg-green-50/30'}`}>
            <div className="flex items-center gap-2 mb-4"><ShieldAlert className="w-5 h-5 text-danger" /><h3 className="font-bold text-primary-dark">AI Risk Analysis</h3></div>
            <div className="mb-6">
              <div className="flex items-end justify-between mb-2">
                <span className="text-sm font-medium text-muted">Risk Score</span>
                <span className={`text-4xl font-black ${request.risk_level === 'low' ? 'text-success' : request.risk_level === 'medium' ? 'text-warning' : 'text-danger'}`}>{request.risk_score ?? '—'}</span>
              </div>
              <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${request.risk_level === 'low' ? 'bg-success' : request.risk_level === 'medium' ? 'bg-warning' : 'bg-danger'}`} style={{ width: `${request.risk_score ?? 0}%` }} />
              </div>
              {request.risk_level && <div className="mt-2 flex justify-center"><Badge variant={request.risk_level === 'low' ? 'success' : request.risk_level === 'medium' ? 'warning' : 'danger'}>{request.risk_level.toUpperCase()} RISK</Badge></div>}
            </div>
            {request.ai_summary && (
              <div className="bg-white/80 p-4 rounded-xl border border-current/10">
                <div className="flex items-center gap-2 text-xs font-bold text-muted uppercase mb-2"><Info className="w-3 h-3" />AI Summary</div>
                <p className="text-sm text-slate-700 leading-relaxed">{request.ai_summary}</p>
              </div>
            )}
          </Card>

          {(request.status === 'pending' || request.status === 'escalated') && (
            <Card title="Admin Actions">
              {actionMsg && <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">{actionMsg}</div>}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted uppercase">Reviewer Notes</label>
                  <textarea className="w-full p-3 text-sm bg-slate-50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-blue/20 min-h-[80px]" placeholder="Add notes..." value={notes} onChange={e => setNotes(e.target.value)} />
                </div>
                <div className="grid grid-cols-1 gap-3 pt-2">
                  <Button className="w-full gap-2" variant="primary" disabled={actionLoading} onClick={() => doAction(approveRequest, '✅ Request approved')}><CheckCircle2 className="w-4 h-4" />Approve Request</Button>
                  <Button className="w-full gap-2" variant="danger" disabled={actionLoading} onClick={() => doAction(rejectRequest, '❌ Request rejected')}><XCircle className="w-4 h-4" />Reject Request</Button>
                  <Button className="w-full gap-2" variant="outline" disabled={actionLoading} onClick={() => doAction(escalateRequest, '⚠️ Request escalated')}><AlertTriangle className="w-4 h-4 text-warning" />Escalate</Button>
                  <Button className="w-full gap-2" variant="ghost"><MessageSquare className="w-4 h-4" />Request More Info</Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
