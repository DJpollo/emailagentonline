import { useState } from 'react';
import { Search, Calendar as CalendarIcon } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Table } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { useActivityLog } from '../hooks/useSupabase';
import { ActivityLog } from '../lib/supabase';

export default function ActivityLogPage() {
  const { logs, loading } = useActivityLog();
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('all');

  const actionTypes = [
    { value: 'all', label: 'All Actions' },
    { value: 'request_submitted', label: 'Request Submitted' },
    { value: 'risk_scored', label: 'Risk Scored' },
    { value: 'auto_approved', label: 'Auto-Approved' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'escalated', label: 'Escalated' },
  ];

  const filtered = logs.filter(log => {
    const matchSearch = !searchTerm || log.actor_name?.toLowerCase().includes(searchTerm.toLowerCase()) || String(log.request_id).includes(searchTerm);
    const matchAction = actionFilter === 'all' || log.action === actionFilter;
    return matchSearch && matchAction;
  });

  const columns = [
    { header: 'Timestamp', accessor: (log: ActivityLog) => new Date(log.created_at).toLocaleString(), className: 'whitespace-nowrap' },
    { header: 'Action', accessor: (log: ActivityLog) => (<Badge variant={log.action === 'auto_approved' || log.action === 'approved' ? 'success' : log.action === 'rejected' || log.action === 'escalated' ? 'danger' : log.action === 'risk_scored' ? 'info' : 'neutral'}>{log.action.replace(/_/g, ' ').toUpperCase()}</Badge>) },
    { header: 'Request ID', accessor: (log: ActivityLog) => log.request_id ? `#${log.request_id}` : '—' },
    { header: 'Actor', accessor: (log: ActivityLog) => log.actor_name || 'System' },
    { header: 'Notes', accessor: (log: ActivityLog) => log.notes || '—', className: 'max-w-xs truncate' },
  ];

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-primary-dark">Activity Log</h1><p className="text-muted">Audit trail of all system and user actions.</p></div>
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" /><Input placeholder="Search by actor or ID..." className="pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
          <Select options={actionTypes} defaultValue="all" onChange={(e: any) => setActionFilter(e.target.value)} />
          <div className="relative"><CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" /><Input type="date" className="pl-10" /></div>
        </div>
        {loading ? <div className="py-12 text-center text-muted">Loading logs...</div> : (
          <div className="-mx-6 -mb-6"><Table columns={columns} data={filtered} /></div>
        )}
      </Card>
    </div>
  );
}
