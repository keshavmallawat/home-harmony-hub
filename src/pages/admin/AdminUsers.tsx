import { useState } from 'react';
import { Search, User, UserCheck, MoreVertical, Ban, CheckCircle } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type UserType = 'customers' | 'partners';

const mockCustomers = [
  { id: '1', name: 'Rahul Sharma', phone: '+91 98765 43210', bookings: 12, status: 'active' },
  { id: '2', name: 'Priya Patel', phone: '+91 98765 43211', bookings: 8, status: 'active' },
  { id: '3', name: 'Amit Kumar', phone: '+91 98765 43212', bookings: 3, status: 'inactive' },
];

const mockPartners = [
  { id: '1', name: 'Vikram Singh', phone: '+91 98765 43220', category: 'Cleaning', rating: 4.8, status: 'approved' },
  { id: '2', name: 'Suresh Kumar', phone: '+91 98765 43221', category: 'Plumbing', rating: 4.5, status: 'pending' },
  { id: '3', name: 'Ramesh Yadav', phone: '+91 98765 43222', category: 'Electrical', rating: 4.7, status: 'approved' },
];

export default function AdminUsers() {
  const [userType, setUserType] = useState<UserType>('customers');
  const [searchQuery, setSearchQuery] = useState('');

  const users = userType === 'customers' ? mockCustomers : mockPartners;

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.phone.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-background">
      <Header title="Users" showLocation={false} />

      {/* Toggle & Search */}
      <div className="px-4 py-4 sticky top-14 bg-background z-30 space-y-3">
        <div className="flex gap-2 p-1 bg-muted rounded-lg">
          <button
            onClick={() => setUserType('customers')}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-all',
              userType === 'customers'
                ? 'bg-card shadow-card text-foreground'
                : 'text-muted-foreground'
            )}
          >
            <User className="w-4 h-4" />
            Customers
          </button>
          <button
            onClick={() => setUserType('partners')}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-all',
              userType === 'partners'
                ? 'bg-card shadow-card text-foreground'
                : 'text-muted-foreground'
            )}
          >
            <UserCheck className="w-4 h-4" />
            Partners
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder={`Search ${userType}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 bg-muted border-0"
          />
        </div>
      </div>

      {/* Users List */}
      <div className="px-4 pb-6 space-y-3">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="bg-card rounded-xl border border-border p-4"
          >
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                {userType === 'customers' ? (
                  <User className="w-6 h-6 text-primary" />
                ) : (
                  <UserCheck className="w-6 h-6 text-primary" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-foreground truncate">{user.name}</h4>
                  {'rating' in user && (
                    <span className="text-xs font-medium text-warning">★ {user.rating}</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{user.phone}</p>
                
                {'bookings' in user ? (
                  <p className="text-xs text-muted-foreground mt-1">
                    {user.bookings} bookings
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground mt-1">
                    {user.category}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-end gap-2">
                <button className="p-1.5">
                  <MoreVertical className="w-5 h-5 text-muted-foreground" />
                </button>
                {'status' in user && (
                  <span
                    className={cn(
                      'text-xs font-medium px-2 py-0.5 rounded-full',
                      user.status === 'active' || user.status === 'approved'
                        ? 'bg-success/10 text-success'
                        : user.status === 'pending'
                        ? 'bg-warning/10 text-warning'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {user.status}
                  </span>
                )}
              </div>
            </div>

            {/* Partner Actions */}
            {userType === 'partners' && 'status' in user && user.status === 'pending' && (
              <div className="flex gap-2 mt-4 pt-3 border-t border-border">
                <button className="flex-1 flex items-center justify-center gap-1 py-2 bg-destructive/10 text-destructive rounded-lg text-sm font-medium">
                  <Ban className="w-4 h-4" />
                  Reject
                </button>
                <button className="flex-1 flex items-center justify-center gap-1 py-2 bg-success text-success-foreground rounded-lg text-sm font-medium">
                  <CheckCircle className="w-4 h-4" />
                  Approve
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
