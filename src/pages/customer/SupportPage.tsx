import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Phone, Mail, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: 'How do I book a service?',
    answer: 'Browse services from the home screen, select your preferred service, choose a date and time slot, select your address, and confirm your booking.',
  },
  {
    question: 'How can I cancel my booking?',
    answer: 'Go to My Bookings, select the booking you want to cancel, and tap on Cancel Booking. Please note that cancellation charges may apply based on the timing.',
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We accept UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, ServeEase Wallet, and Cash on Delivery.',
  },
  {
    question: 'How do I contact the service professional?',
    answer: 'Once a professional is assigned to your booking, you can contact them directly through the booking details page.',
  },
  {
    question: 'What if I\'m not satisfied with the service?',
    answer: 'We have a satisfaction guarantee. If you\'re not happy with the service, contact our support team within 24 hours and we\'ll help resolve the issue.',
  },
  {
    question: 'How do refunds work?',
    answer: 'Refunds are processed within 5-7 business days to your original payment method. Wallet credits are instant.',
  },
];

export default function SupportPage() {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="flex items-center gap-4 h-14 px-4 max-w-lg mx-auto">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">Help & Support</h1>
        </div>
      </header>

      <div className="px-4 py-6">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search help topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 bg-muted border-0"
          />
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <Button variant="outline" className="flex-col h-auto py-4">
            <MessageCircle className="w-6 h-6 mb-2 text-primary" />
            <span className="text-xs">Chat</span>
          </Button>
          <Button variant="outline" className="flex-col h-auto py-4">
            <Phone className="w-6 h-6 mb-2 text-primary" />
            <span className="text-xs">Call</span>
          </Button>
          <Button variant="outline" className="flex-col h-auto py-4">
            <Mail className="w-6 h-6 mb-2 text-primary" />
            <span className="text-xs">Email</span>
          </Button>
        </div>

        {/* FAQs */}
        <div>
          <h3 className="font-semibold text-foreground mb-4">Frequently Asked Questions</h3>
          <div className="space-y-3">
            {filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className="bg-card rounded-xl border border-border overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="font-medium text-foreground pr-4">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  )}
                </button>
                <div
                  className={cn(
                    'overflow-hidden transition-all duration-200',
                    expandedFaq === index ? 'max-h-48' : 'max-h-0'
                  )}
                >
                  <div className="px-4 pb-4">
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 p-4 bg-accent rounded-xl">
          <h4 className="font-semibold text-foreground mb-2">Need more help?</h4>
          <p className="text-sm text-muted-foreground mb-3">
            Our support team is available 24/7 to assist you.
          </p>
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              <span>+91 1800-123-4567</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              <span>support@serveease.com</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
