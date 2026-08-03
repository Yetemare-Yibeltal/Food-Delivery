'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, MessageSquare, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Avatar } from '@/components/ui/Avatar';

// ─── Review Interface ─────────────────────────────────────────────────────────
export interface IReview {
  _id: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  restaurant: string;
  order?: string;
  rating: number;
  comment: string;
  images?: string[];
  reply?: {
    text: string;
    repliedAt: Date;
  };
  likes: number;
  isLiked?: boolean;
  createdAt: Date;
}

export interface IRatingSummary {
  average: number;
  count: number;
  distribution: Record<string, number>;
}

// ─── Star Rating Display ──────────────────────────────────────────────────────
const StarRating = ({
  rating,
  size = 'sm',
}: {
  rating: number;
  size?: 'xs' | 'sm' | 'md';
}): React.JSX.Element => {
  const sizes = { xs: 'w-3 h-3', sm: 'w-4 h-4', md: 'w-5 h-5' };

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            sizes[size],
            star <= rating
              ? 'fill-accent text-accent'
              : star - 0.5 <= rating
                ? 'fill-accent/50 text-accent/50'
                : 'text-white/20',
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  );
};

// ─── Rating Distribution Bar ──────────────────────────────────────────────────
const RatingDistributionBar = ({
  stars,
  count,
  total,
}: {
  stars: number;
  count: number;
  total: number;
}): React.JSX.Element => {
  const percentage = total > 0 ? (count / total) * 100 : 0;

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1 w-12 shrink-0">
        <span className="text-xs text-white/60">{stars}</span>
        <Star className="w-3 h-3 fill-accent text-accent" aria-hidden="true" />
      </div>
      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, delay: 0.1 * (5 - stars) }}
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
          aria-hidden="true"
        />
      </div>
      <span className="text-xs text-white/40 w-8 text-right shrink-0">
        {count}
      </span>
    </div>
  );
};

// ─── Review Card ──────────────────────────────────────────────────────────────
const ReviewCard = ({
  review,
  onLike,
}: {
  review: IReview;
  onLike?: (id: string) => void;
}): React.JSX.Element => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const isLong = review.comment.length > 200;
  const displayComment =
    isLong && !isExpanded
      ? `${review.comment.slice(0, 200)}...`
      : review.comment;

  const timeAgo = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    if (days < 365) return `${Math.floor(days / 30)} months ago`;
    return `${Math.floor(days / 365)} years ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-5 space-y-4"
    >
      {/* Reviewer Info */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar
            name={`${review.user.firstName} ${review.user.lastName}`}
            src={review.user.avatar}
            size="md"
            shape="circle"
          />
          <div>
            <p className="text-white font-semibold text-sm">
              {review.user.firstName} {review.user.lastName}
            </p>
            <p className="text-white/40 text-xs">{timeAgo(review.createdAt)}</p>
          </div>
        </div>
        <StarRating rating={review.rating} size="sm" />
      </div>

      {/* Review Comment */}
      <div className="space-y-2">
        <p className="text-white/70 text-sm leading-relaxed">
          {displayComment}
        </p>
        {isLong && (
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
          >
            {isExpanded ? 'Show less' : 'Read more'}
            <ChevronDown
              className={cn(
                'w-3 h-3 transition-transform duration-200',
                isExpanded && 'rotate-180',
              )}
              aria-hidden="true"
            />
          </button>
        )}
      </div>

      {/* Review Images */}
      {review.images && review.images.length > 0 && (
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {review.images.map((image, i) => (
            <div
              key={i}
              className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-white/5"
            >
              <img
                src={image}
                alt={`Review image ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Like Button */}
      <div className="flex items-center gap-4 pt-1 border-t border-white/5">
        <button
          type="button"
          onClick={() => onLike?.(review._id)}
          className={cn(
            'flex items-center gap-1.5 text-xs transition-colors',
            review.isLiked
              ? 'text-primary'
              : 'text-white/40 hover:text-white/60',
          )}
          aria-label={`Like review. ${review.likes} likes`}
          aria-pressed={review.isLiked}
        >
          <ThumbsUp
            className={cn('w-3.5 h-3.5', review.isLiked && 'fill-current')}
            aria-hidden="true"
          />
          <span>{review.likes}</span>
        </button>
      </div>

      {/* Owner Reply */}
      {review.reply && (
        <div className="bg-white/5 rounded-xl p-4 space-y-2 border-l-2 border-primary/30">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
            <p className="text-xs font-semibold text-primary">
              Restaurant Reply
            </p>
            <p className="text-xs text-white/30 ml-auto">
              {timeAgo(review.reply.repliedAt)}
            </p>
          </div>
          <p className="text-white/60 text-xs leading-relaxed">
            {review.reply.text}
          </p>
        </div>
      )}
    </motion.div>
  );
};

// ─── Restaurant Reviews Props ─────────────────────────────────────────────────
interface RestaurantReviewsProps {
  reviews: IReview[];
  summary: IRatingSummary;
  isLoading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  onLike?: (id: string) => void;
  isLoadingMore?: boolean;
}

// ─── Restaurant Reviews Component ─────────────────────────────────────────────
export const RestaurantReviews = ({
  reviews,
  summary,
  isLoading = false,
  hasMore = false,
  onLoadMore,
  onLike,
  isLoadingMore = false,
}: RestaurantReviewsProps): React.JSX.Element => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-40 rounded-2xl bg-white/5 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-sm font-bold text-white/70 mb-5">
          Customer Reviews
        </h3>
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Average Rating */}
          <div className="flex flex-col items-center justify-center gap-2 shrink-0">
            <p className="text-5xl font-black gradient-text">
              {summary.average.toFixed(1)}
            </p>
            <StarRating rating={summary.average} size="md" />
            <p className="text-xs text-white/40">
              {summary.count.toLocaleString()} reviews
            </p>
          </div>

          {/* Distribution */}
          <div className="flex-1 space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => (
              <RatingDistributionBar
                key={stars}
                stars={stars}
                count={summary.distribution[stars.toString()] ?? 0}
                total={summary.count}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <span className="text-5xl" aria-hidden="true">💬</span>
          <div className="text-center">
            <p className="text-white font-semibold">No reviews yet</p>
            <p className="text-white/40 text-sm mt-1">
              Be the first to review this restaurant
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              onLike={onLike}
            />
          ))}

          {/* Load More */}
          {hasMore && (
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={onLoadMore}
                disabled={isLoadingMore}
                className={cn(
                  'flex items-center gap-2 px-6 py-3 rounded-xl',
                  'border border-white/10 bg-white/5 text-white/60',
                  'text-sm font-medium hover:border-white/20 hover:text-white/80',
                  'transition-all duration-200',
                  isLoadingMore && 'opacity-50 cursor-not-allowed',
                )}
              >
                {isLoadingMore ? (
                  <>
                    <svg
                      className="animate-spin w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Loading...
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" aria-hidden="true" />
                    Load More Reviews
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RestaurantReviews;