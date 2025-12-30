import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Wallet, Plus, ArrowUpRight, ArrowDownLeft, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const transactions = [
  { id: '1', type: 'credit' as const, amount: 500, description: 'Added via UPI', date: 'Dec 28, 2024' },
  { id: '2', type: 'debit' as const, amount: 799, description: 'Paid for Facial at Home', date: 'Dec 25, 2024' },
  { id: '3', type: 'credit' as const, amount: 200, description: 'Cashback reward', date: 'Dec 20, 2024' },
  { id: '4', type: 'debit' as const, amount: 299, description: 'Paid for Tap Repair', date: 'Dec 18, 2024' },
];

export default function WalletPage() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(850);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [addAmount, setAddAmount] = useState('');

  const quickAmounts = [100, 500, 1000, 2000];

  const handleAddMoney = () => {
    const amount = parseInt(addAmount);
    if (!amount || amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    setBalance(prev => prev + amount);
    toast.success(`₹${amount} added to wallet`);
    setIsDialogOpen(false);
    setAddAmount('');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="flex items-center gap-4 h-14 px-4 max-w-lg mx-auto">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">Wallet & Payments</h1>
        </div>
      </header>

      <div className="px-4 py-6">
        {/* Balance Card */}
        <div className="gradient-primary rounded-2xl p-6 text-primary-foreground mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-primary-foreground/20">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm opacity-90">Wallet Balance</p>
              <h2 className="text-3xl font-bold">₹{balance}</h2>
            </div>
          </div>
          <Button
            variant="secondary"
            className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            onClick={() => setIsDialogOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Money
          </Button>
        </div>

        {/* Saved Cards */}
        <div className="mb-6">
          <h3 className="font-semibold text-foreground mb-3">Payment Methods</h3>
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent">
                <CreditCard className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">HDFC Bank ••••4532</p>
                <p className="text-xs text-muted-foreground">Credit Card</p>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-success/10 text-success font-medium">
                Default
              </span>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-3">
            <Plus className="w-4 h-4 mr-2" />
            Add Payment Method
          </Button>
        </div>

        {/* Transactions */}
        <div>
          <h3 className="font-semibold text-foreground mb-3">Transaction History</h3>
          <div className="space-y-3">
            {transactions.map((txn) => (
              <div
                key={txn.id}
                className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border"
              >
                <div
                  className={cn(
                    'p-2 rounded-full',
                    txn.type === 'credit' ? 'bg-success/10' : 'bg-destructive/10'
                  )}
                >
                  {txn.type === 'credit' ? (
                    <ArrowDownLeft className="w-4 h-4 text-success" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4 text-destructive" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground truncate">
                    {txn.description}
                  </p>
                  <p className="text-xs text-muted-foreground">{txn.date}</p>
                </div>
                <span
                  className={cn(
                    'font-semibold',
                    txn.type === 'credit' ? 'text-success' : 'text-destructive'
                  )}
                >
                  {txn.type === 'credit' ? '+' : '-'}₹{txn.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Money Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-[90%] rounded-2xl">
          <DialogHeader>
            <DialogTitle>Add Money to Wallet</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Input
                type="number"
                value={addAmount}
                onChange={(e) => setAddAmount(e.target.value)}
                placeholder="Enter amount"
                className="text-center text-2xl h-14 font-semibold"
              />
            </div>
            <div className="flex gap-2">
              {quickAmounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => setAddAmount(amt.toString())}
                  className="flex-1 py-2 rounded-lg bg-muted text-sm font-medium hover:bg-accent transition-colors"
                >
                  ₹{amt}
                </button>
              ))}
            </div>
            <Button className="w-full" onClick={handleAddMoney}>
              Add ₹{addAmount || 0}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
