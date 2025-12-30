import { Users, Calendar, DollarSign, UserCheck, TrendingUp, AlertCircle } from 'lucide-react';
import { Header } from '@/components/layout/Header';

const stats = [
  { icon: Calendar, label: 'Total Bookings', value: '1,245', change: '+12%' },
  { icon: Users, label: 'Total Customers', value: '856', change: '+8%' },
  { icon: UserCheck, label: 'Active Partners', value: '124', change: '+5%' },
  { icon: DollarSign, label: 'Revenue', value: '₹12.5L', change: '+15%' },
];

const recentBookings = [
  { id: '1', customer: 'Rahul Sharma', service: 'Deep Cleaning', status: 'Confirmed', amount: '₹2,499' },
  { id: '2', customer: 'Priya Patel', service: 'AC Service', status: 'In Progress', amount: '₹499' },
  { id: '3', customer: 'Amit Kumar', service: 'Plumbing', status: 'Pending', amount: '₹299' },
  { id: '4', customer: 'Sneha Reddy', service: 'Facial at Home', status: 'Completed', amount: '₹799' },
];

const pendingApprovals = [
  { id: '1', name: 'Suresh Kumar', category: 'Cleaning', date: 'Dec 28, 2024' },
  { id: '2', name: 'Ramesh Yadav', category: 'Plumbing', date: 'Dec 27, 2024' },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Header title="Admin Dashboard" showLocation={false} />

      <div className="px-4 py-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-card rounded-xl border border-border p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 rounded-lg bg-accent">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                  <span className="text-xs font-medium text-success">{stat.change}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pending Approvals */}
        {pendingApprovals.length > 0 && (
          <div className="bg-warning/10 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-5 h-5 text-warning" />
              <h3 className="font-semibold text-foreground">Pending Partner Approvals</h3>
            </div>
            <div className="space-y-2">
              {pendingApprovals.map((partner) => (
                <div
                  key={partner.id}
                  className="flex items-center justify-between p-3 bg-card rounded-lg"
                >
                  <div>
                    <p className="font-medium text-sm">{partner.name}</p>
                    <p className="text-xs text-muted-foreground">{partner.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 text-xs font-medium bg-destructive/10 text-destructive rounded-lg">
                      Reject
                    </button>
                    <button className="px-3 py-1.5 text-xs font-medium bg-success text-success-foreground rounded-lg">
                      Approve
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Bookings */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-foreground">Recent Bookings</h3>
            <button className="text-sm text-primary font-medium">View All</button>
          </div>
          <div className="space-y-3">
            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between p-4 bg-card rounded-xl border border-border"
              >
                <div>
                  <p className="font-medium text-foreground">{booking.customer}</p>
                  <p className="text-sm text-muted-foreground">{booking.service}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">{booking.amount}</p>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      booking.status === 'Completed'
                        ? 'bg-success/10 text-success'
                        : booking.status === 'In Progress'
                        ? 'bg-primary/10 text-primary'
                        : booking.status === 'Confirmed'
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-warning/10 text-warning'
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="font-bold text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-4 bg-card rounded-xl border border-border text-left hover:shadow-card transition-all">
              <Users className="w-6 h-6 text-primary mb-2" />
              <p className="font-medium text-sm">Manage Users</p>
            </button>
            <button className="p-4 bg-card rounded-xl border border-border text-left hover:shadow-card transition-all">
              <UserCheck className="w-6 h-6 text-primary mb-2" />
              <p className="font-medium text-sm">Manage Partners</p>
            </button>
            <button className="p-4 bg-card rounded-xl border border-border text-left hover:shadow-card transition-all">
              <Calendar className="w-6 h-6 text-primary mb-2" />
              <p className="font-medium text-sm">All Bookings</p>
            </button>
            <button className="p-4 bg-card rounded-xl border border-border text-left hover:shadow-card transition-all">
              <TrendingUp className="w-6 h-6 text-primary mb-2" />
              <p className="font-medium text-sm">Analytics</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
