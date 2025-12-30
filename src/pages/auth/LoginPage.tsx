import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Mail, ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

type LoginMethod = 'phone' | 'email';
type Step = 'input' | 'otp';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, setUserRole } = useAuth();
  const [method, setMethod] = useState<LoginMethod>('phone');
  const [step, setStep] = useState<Step>('input');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setStep('otp');
  };

  const handleVerifyOtp = async () => {
    setIsLoading(true);
    await login(method === 'phone' ? phone : email, otp.join(''));
    setIsLoading(false);
    navigate('/customer');
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleDemoLogin = (role: 'customer' | 'partner' | 'admin') => {
    setUserRole(role);
    navigate(`/${role}`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-lg mx-auto">
      {/* Header */}
      <div className="gradient-hero pt-12 pb-8 px-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
            <span className="text-primary-foreground font-bold text-xl">S</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">ServeEase</h1>
            <p className="text-xs text-muted-foreground">Home Services Made Easy</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-2">Welcome back!</h2>
        <p className="text-muted-foreground">Sign in to continue booking services</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6">
        {step === 'input' ? (
          <>
            {/* Method Toggle */}
            <div className="flex gap-2 p-1 bg-muted rounded-lg mb-6">
              <button
                onClick={() => setMethod('phone')}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-all',
                  method === 'phone'
                    ? 'bg-card shadow-card text-foreground'
                    : 'text-muted-foreground'
                )}
              >
                <Phone className="w-4 h-4" />
                Phone
              </button>
              <button
                onClick={() => setMethod('email')}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-all',
                  method === 'email'
                    ? 'bg-card shadow-card text-foreground'
                    : 'text-muted-foreground'
                )}
              >
                <Mail className="w-4 h-4" />
                Email
              </button>
            </div>

            {/* Input */}
            {method === 'phone' ? (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Mobile Number</label>
                <div className="flex gap-2">
                  <div className="flex items-center px-4 bg-muted rounded-lg text-sm font-medium">
                    +91
                  </div>
                  <Input
                    type="tel"
                    placeholder="Enter your mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    maxLength={10}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email Address</label>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            )}

            <Button
              className="w-full mt-6"
              size="lg"
              onClick={handleSendOtp}
              disabled={isLoading || (method === 'phone' ? phone.length < 10 : !email.includes('@'))}
            >
              {isLoading ? 'Sending OTP...' : 'Continue'}
              <ArrowRight className="w-4 h-4" />
            </Button>

            {/* Demo Logins */}
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground text-center mb-4">Quick Demo Login</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleDemoLogin('customer')}
                >
                  Customer
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleDemoLogin('partner')}
                >
                  Partner
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleDemoLogin('admin')}
                >
                  Admin
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* OTP Verification */}
            <button
              onClick={() => setStep('input')}
              className="text-sm text-primary font-medium mb-6"
            >
              ← Change {method === 'phone' ? 'number' : 'email'}
            </button>

            <div className="space-y-2 mb-6">
              <label className="text-sm font-medium text-foreground">Enter OTP</label>
              <p className="text-xs text-muted-foreground">
                We've sent a 6-digit code to{' '}
                <span className="font-medium text-foreground">
                  {method === 'phone' ? `+91 ${phone}` : email}
                </span>
              </p>
            </div>

            <div className="flex gap-2 justify-center mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-12 h-14 text-center text-xl font-bold rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                />
              ))}
            </div>

            <Button
              className="w-full"
              size="lg"
              onClick={handleVerifyOtp}
              disabled={isLoading || otp.some((d) => !d)}
            >
              {isLoading ? 'Verifying...' : 'Verify & Continue'}
              <Shield className="w-4 h-4" />
            </Button>

            <button className="w-full mt-4 text-sm text-primary font-medium">
              Resend OTP in 30s
            </button>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 pb-8">
        <p className="text-xs text-center text-muted-foreground">
          By continuing, you agree to our{' '}
          <span className="text-primary">Terms of Service</span> and{' '}
          <span className="text-primary">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}
