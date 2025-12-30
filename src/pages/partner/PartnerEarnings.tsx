import { useState } from 'react';
import { DollarSign, TrendingUp, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { mockPartner } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type Period = 'today' | 'week' | 'month';

const earningsHistory = [
  { id: '1', date: 'Today', amount: 2450, jobs: 3, type: 'credit' as const },
  { id: '2', date: 'Yesterday', amount: 3200, jobs: 4, type: 'credit' as const },
  { id: '3', date: 'Dec 27', amount: 1800, jobs: 2, type: 'credit' as const },
  { id: '4', date: 'Dec 26', amount: -500, jobs: 0, type: 'debit' as const, note: 'Cancellation fee' },
  { id: '5', date: 'Dec 25', amount: 4100, jobs: 5, type: 'credit' as const },
];

export default function PartnerEarnings() {
  const [period, setPeriod] = useState<Period>('week');

  const periodStats = {
    today: { earnings: 2450, jobs: 3, change: 12 },
    week: { earnings: 18500, jobs: 12, change: 8 },
    month: { earnings: 65000, jobs: 45, change: 15 },
  };

  const stats = periodStats[period];

  return (
    <div className="min-h-screen bg-background">
      <Header title="Earnings" showLocation={false} />

      <div className="px-4 py-6">
        {/* Period Selector */}
        <div className="flex gap-2 p-1 bg-muted rounded-lg mb-6">
          {(['today', 'week', 'month'] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                'flex-1 py-2.5 rounded-md text-sm font-medium transition-all capitalize',
                period === p
                  ? 'bg-card shadow-card text-foreground'
                  : 'text-muted-foreground'
              )}
            >
              {p === 'today' ? 'Today' : p === 'week' ? 'This Week' : 'This Month'}
            </button>
          ))}
        </div>

        {/* Earnings Card */}
        <div className="gradient-primary rounded-2xl p-6 text-primary-foreground mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm opacity-90 mb-1">Total Earnings</p>
              <h2 className="text-3xl font-bold">₹{stats.earnings.toLocaleString()}</h2>
            </div>
            <div className="flex items-center gap-1 bg-primary-foreground/20 rounded-full px-3 py-1">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">+{stats.change}%</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div>
              <p className="text-2xl font-bold">{stats.jobs}</p>
              <p className="text-sm opacity-90">Jobs Done</p>
            </div>
            <div>
              <p className="text-2xl font-bold">₹{Math.round(stats.earnings / stats.jobs)}</p>
              <p className="text-sm opacity-90">Avg per Job</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-card rounded-xl border border-border p-4">
            <p className="text-sm text-muted-foreground mb-1">Pending Payout</p>
            <p className="text-xl font-bold text-foreground">₹8,450</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4">
            <p className="text-sm text-muted-foreground mb-1">Total Withdrawn</p>
            <p className="text-xl font-bold text-foreground">
              ₹{(mockPartner.totalEarnings - 8450).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Withdraw Button */}
        <Button variant="hero" className="w-full mb-6" size="lg">
          <DollarSign className="w-5 h-5" />
          Withdraw ₹8,450
        </Button>

        {/* History */}
        <div>
          <h3 className="font-bold text-foreground mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {earningsHistory.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-card rounded-xl border border-border"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center',
                      item.type === 'credit' ? 'bg-success/10' : 'bg-destructive/10'
                    )}
                  >
                    {item.type === 'credit' ? (
                      <ArrowUpRight className="w-5 h-5 text-success" />
                    ) : (
                      <ArrowDownRight className="w-5 h-5 text-destructive" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {item.type === 'credit' ? `${item.jobs} Jobs Completed` : item.note}
                    </p>
                    <p className="text-sm text-muted-foreground">{item.date}</p>
                  </div>
                </div>
                <span
                  className={cn(
                    'font-bold',
                    item.type === 'credit' ? 'text-success' : 'text-destructive'
                  )}
                >
                  {item.type === 'credit' ? '+' : ''}₹{Math.abs(item.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
