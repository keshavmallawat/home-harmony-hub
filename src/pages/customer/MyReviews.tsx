import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';
import { mockBookings } from '@/data/mockData';
import { format } from 'date-fns';

export default function MyReviews() {
  const navigate = useNavigate();

  const reviewedBookings = mockBookings.filter((b) => b.rating);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="flex items-center gap-4 h-14 px-4 max-w-lg mx-auto">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">My Reviews</h1>
        </div>
      </header>

      <div className="px-4 py-6">
        {reviewedBookings.length > 0 ? (
          <div className="space-y-4">
            {reviewedBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-card rounded-xl border border-border p-4"
              >
                <div className="flex gap-3 mb-3">
                  <img
                    src={booking.service.image}
                    alt={booking.service.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">
                      {booking.service.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(booking.scheduledDate), 'MMM d, yyyy')}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= (booking.rating || 0)
                              ? 'fill-warning text-warning'
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                {booking.review && (
                  <div className="pt-3 border-t border-border">
                    <p className="text-sm text-muted-foreground italic">
                      "{booking.review}"
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="font-semibold text-foreground mb-2">No reviews yet</h3>
            <p className="text-sm text-muted-foreground">
              Complete a booking to leave a review
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
