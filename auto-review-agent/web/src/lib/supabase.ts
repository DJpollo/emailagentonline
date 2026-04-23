import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─── Types matching your Supabase schema ───────────────────────────────────

export interface Email {
  id: number;
  sender: string;
  subject: string | null;
  body: string | null;
  read: boolean;
  received_at: string;
  message_id: string | null;
  reply_to: string | null;
}

export interface Request {
  id: number;
  email_id: number | null;
  title: string;
  category: string;
  description: string | null;
  department: string | null;
  urgency: 'low' | 'normal' | 'high' | 'critical';
  requester_name: string | null;
  requester_email: string | null;
  risk_score: number | null;
  risk_level: 'low' | 'medium' | 'high' | null;
  ai_summary: string | null;
  ai_recommendation: string | null;
  ai_confidence: number | null;
  status: 'pending' | 'auto_approved' | 'approved' | 'rejected' | 'escalated' | 'info_requested';
  reviewed_by: string | null;
  reviewed_at: string | null;
  admin_notes: string | null;
  submitted_at: string;
  updated_at: string;
  approval_token: string | null;
  n8n_execution_id: string | null;
  user_notified_at: string | null;
  rep_notified_at: string | null;
}

export interface ActivityLog {
  id: number;
  request_id: number | null;
  email_id: number | null;
  action: string;
  actor_id: string | null;
  actor_name: string | null;
  notes: string | null;
  metadata: Record<string, any> | null;
  created_at: string;
}

export interface Profile {
  id: string;
  full_name: string | null;
  email: string;
  role: 'requester' | 'admin';
  department: string | null;
  avatar_url: string | null;
  created_at: string;
}
