import { Card } from '../components/ui/Card';
import { BarChart, PieChart, TrendingUp, Clock, ShieldCheck } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-primary-dark">Analytics</h1>
        <p className="text-muted">Insights and performance metrics for the approval system.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title="Request Volume Over Time" subtitle="Daily submission trends">
          <div className="h-64 flex items-end gap-2 pt-4">
            {[40, 65, 45, 90, 75, 55, 80].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-accent-blue/20 hover:bg-accent-blue/40 transition-colors rounded-t-md relative group"
                  style={{ height: `${val}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary-dark text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {val}
                  </div>
                </div>
                <span className="text-[10px] text-muted uppercase font-bold">Day {i + 1}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Approval Outcomes" subtitle="Distribution of final decisions">
          <div className="flex items-center justify-around h-64">
            <div className="relative w-40 h-40">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-slate-100" strokeWidth="4" />
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-success" strokeWidth="4" strokeDasharray="70, 100" />
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-danger" strokeWidth="4" strokeDasharray="15, 100" strokeDashoffset="-70" />
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-warning" strokeWidth="4" strokeDasharray="15, 100" strokeDashoffset="-85" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-primary-dark">124</span>
                <span className="text-[10px] text-muted uppercase font-bold">Total</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-success" />
                <span className="text-muted">Approved (70%)</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-danger" />
                <span className="text-muted">Rejected (15%)</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-warning" />
                <span className="text-muted">Pending (15%)</span>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Risk Level Distribution" subtitle="AI classification breakdown">
          <div className="space-y-6 pt-4">
            {[
              { label: 'Low Risk', value: 70, color: 'bg-success' },
              { label: 'Medium Risk', value: 40, color: 'bg-warning' },
              { label: 'High Risk', value: 14, color: 'bg-danger' },
            ].map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span>{item.label}</span>
                  <span className="text-muted">{item.value} requests</span>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color}`} style={{ width: `${(item.value / 124) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card className="flex flex-col items-center justify-center text-center p-8">
            <div className="bg-blue-50 p-3 rounded-full mb-4">
              <Clock className="w-8 h-8 text-accent-blue" />
            </div>
            <h4 className="text-sm font-bold text-muted uppercase tracking-wider mb-1">Avg. Approval Time</h4>
            <p className="text-4xl font-black text-primary-dark">2.4h</p>
            <p className="text-xs text-success font-bold mt-2 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              15% faster than last week
            </p>
          </Card>
          <Card className="flex flex-col items-center justify-center text-center p-8">
            <div className="bg-green-50 p-3 rounded-full mb-4">
              <ShieldCheck className="w-8 h-8 text-success" />
            </div>
            <h4 className="text-sm font-bold text-muted uppercase tracking-wider mb-1">Auto-Approval Rate</h4>
            <p className="text-4xl font-black text-primary-dark">68%</p>
            <p className="text-xs text-muted font-medium mt-2">Target: 75%</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
