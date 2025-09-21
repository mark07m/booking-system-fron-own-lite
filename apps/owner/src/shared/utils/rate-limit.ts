/**
 * Rate limiting utilities for client-side handling
 */

export interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: number;
  retryAfter?: number;
}

/**
 * Parse rate limit headers from response
 */
export function parseRateLimitHeaders(headers: Headers): RateLimitInfo | null {
  const limit = headers.get('x-ratelimit-limit');
  const remaining = headers.get('x-ratelimit-remaining');
  const reset = headers.get('x-ratelimit-reset');
  const retryAfter = headers.get('retry-after');

  if (!limit || !remaining || !reset) {
    return null;
  }

  return {
    limit: parseInt(limit, 10),
    remaining: parseInt(remaining, 10),
    reset: parseInt(reset, 10),
    retryAfter: retryAfter ? parseInt(retryAfter, 10) : undefined,
  };
}

/**
 * Calculate time until rate limit resets
 */
export function getTimeUntilReset(rateLimitInfo: RateLimitInfo): number {
  const now = Date.now();
  const resetTime = rateLimitInfo.reset * 1000; // Convert to milliseconds
  return Math.max(0, resetTime - now);
}

/**
 * Format time remaining in human-readable format
 */
export function formatTimeRemaining(milliseconds: number): string {
  const seconds = Math.ceil(milliseconds / 1000);
  
  if (seconds < 60) {
    return `${seconds} seconds`;
  }
  
  const minutes = Math.ceil(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minutes`;
  }
  
  const hours = Math.ceil(minutes / 60);
  return `${hours} hours`;
}

/**
 * Check if we should show a rate limit warning
 */
export function shouldShowRateLimitWarning(rateLimitInfo: RateLimitInfo): boolean {
  // Show warning when remaining requests are low (less than 20% of limit)
  const warningThreshold = Math.ceil(rateLimitInfo.limit * 0.2);
  return rateLimitInfo.remaining <= warningThreshold;
}

/**
 * Get a user-friendly rate limit message
 */
export function getRateLimitMessage(rateLimitInfo: RateLimitInfo): string {
  const timeRemaining = getTimeUntilReset(rateLimitInfo);
  const formattedTime = formatTimeRemaining(timeRemaining);
  
  if (rateLimitInfo.remaining === 0) {
    return `Rate limit exceeded. Please try again in ${formattedTime}.`;
  }
  
  if (shouldShowRateLimitWarning(rateLimitInfo)) {
    return `Rate limit warning: ${rateLimitInfo.remaining} requests remaining. Resets in ${formattedTime}.`;
  }
  
  return `Rate limit: ${rateLimitInfo.remaining}/${rateLimitInfo.limit} requests remaining.`;
}
