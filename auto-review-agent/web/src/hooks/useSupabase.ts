import { useEffect, useState, useCallback } from 'react';
import { supabase, Request, ActivityLog } from '../lib/supabase';

// ─── Requests ──────────────────────────────────────────────────────────────

export function useRequests() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('requests')
      .select('*')
      .order('submitted_at', { ascending: false });
    if (error) setError(error.message);
    else setRequests(data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetch();
    // Real-time subscription
    const channel = supabase
      .channel('requests-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'requests' }, fetch)
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [fetch]);

  return { requests, loading, error, refetch: fetch };
}

export function useRequest(id: string | number | undefined) {
  const [request, setRequest] = useState<Request | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('requests')
      .select('*')
      .eq('id', id)
      .single();
    if (error) setError(error.message);
    else setRequest(data);
    setLoading(false);
  }, [id]);

  useEffect(() => { fetch(); }, [fetch]);

  return { request, loading, error, refetch: fetch };
}

export function useMyRequests(requesterEmail: string | null | undefined) {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!requesterEmail) { setLoading(false); return; }
    const fetch = async () => {
      const { data } = await supabase
        .from('requests')
        .select('*')
        .eq('requester_email', requesterEmail)
        .order('submitted_at', { ascending: false });
      setRequests(data || []);
      setLoading(false);
    };
    fetch();
  }, [requesterEmail]);

  return { requests, loading };
}

// ─── Dashboard Stats (computed from real data) ────────────────────────────

export function useDashboardStats() {
  const [stats, setStats] = useState({
    totalRequests: 0,
    autoApproved: 0,
    pendingReview: 0,
    escalated: 0,
    riskDistribution: { low: 0, medium: 0, high: 0 },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('requests').select('status, risk_level');
      if (data) {
        setStats({
          totalRequests: data.length,
          autoApproved: data.filter(r => r.status === 'auto_approved').length,
          pendingReview: data.filter(r => r.status === 'pending').length,
          escalated: data.filter(r => r.status === 'escalated').length,
          riskDistribution: {
            low: data.filter(r => r.risk_level === 'low').length,
            medium: data.filter(r => r.risk_level === 'medium').length,
            high: data.filter(r => r.risk_level === 'high').length,
          },
        });
      }
      setLoading(false);
    };
    fetch();

    const channel = supabase
      .channel('stats-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'requests' }, fetch)
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  return { stats, loading };
}

// ─── Activity Log ─────────────────────────────────────────────────────────

export function useActivityLog() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('activity_log')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);
      setLogs(data || []);
      setLoading(false);
    };
    fetch();

    const channel = supabase
      .channel('activity-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'activity_log' }, fetch)
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  return { logs, loading };
}

export function useRequestActivityLog(requestId: number | null | undefined) {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!requestId) { setLoading(false); return; }
    const fetch = async () => {
      const { data } = await supabase
        .from('activity_log')
        .select('*')
        .eq('request_id', requestId)
        .order('created_at', { ascending: true });
      setLogs(data || []);
      setLoading(false);
    };
    fetch();
  }, [requestId]);

  return { logs, loading };
}

// ─── Actions ──────────────────────────────────────────────────────────────

export async function approveRequest(requestId: number, notes: string, actorName: string) {
  const { error } = await supabase
    .from('requests')
    .update({ status: 'approved', admin_notes: notes, reviewed_at: new Date().toISOString() })
    .eq('id', requestId);

  if (!error) {
    await supabase.from('activity_log').insert({
      request_id: requestId,
      action: 'approved',
      actor_name: actorName,
      notes,
    });
  }
  return { error };
}

export async function rejectRequest(requestId: number, notes: string, actorName: string) {
  const { error } = await supabase
    .from('requests')
    .update({ status: 'rejected', admin_notes: notes, reviewed_at: new Date().toISOString() })
    .eq('id', requestId);

  if (!error) {
    await supabase.from('activity_log').insert({
      request_id: requestId,
      action: 'rejected',
      actor_name: actorName,
      notes,
    });
  }
  return { error };
}

export async function escalateRequest(requestId: number, notes: string, actorName: string) {
  const { error } = await supabase
    .from('requests')
    .update({ status: 'escalated', admin_notes: notes })
    .eq('id', requestId);

  if (!error) {
    await supabase.from('activity_log').insert({
      request_id: requestId,
      action: 'escalated',
      actor_name: actorName,
      notes,
    });
  }
  return { error };
}


// ─── Submit Request (inserts into emails table, n8n picks it up automatically) ─

export async function submitRequestViaEmail(payload: {
  from: string;
  subject: string;
  body: string;
}) {
  const { error } = await supabase
    .from('emails')
    .insert({
      sender: payload.from,
      subject: payload.subject,
      body: payload.body,
      read: false,
      received_at: new Date().toISOString(),
    });

  if (error) throw new Error(error.message);
}
