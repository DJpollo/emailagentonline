CREATE VIEW public.dashboard_stats AS
SELECT
  COUNT(*) AS total_requests,
  COUNT(*) FILTER (WHERE status = 'auto_approved') AS auto_approved,
  COUNT(*) FILTER (WHERE status = 'pending') AS pending_review,
  COUNT(*) FILTER (WHERE status = 'escalated') AS escalated,
  COUNT(*) FILTER (WHERE status = 'approved') AS approved,
  COUNT(*) FILTER (WHERE status = 'rejected') AS rejected,
  COUNT(*) FILTER (WHERE risk_level = 'low') AS low_risk,
  COUNT(*) FILTER (WHERE risk_level = 'medium') AS medium_risk,
  COUNT(*) FILTER (WHERE risk_level = 'high') AS high_risk
FROM public.requests;
