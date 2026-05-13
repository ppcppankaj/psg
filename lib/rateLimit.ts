// Simple in-memory rate limiter for API routes (non-Edge runtime)
// Resets per window per IP. Not suitable for multi-instance deploys without Redis.

const requestCounts = new Map<string, { count: number; resetAt: number }>();

/**
 * Returns true if the request is allowed, false if rate-limited.
 * @param ip      Caller's IP address
 * @param maxRequests  Max requests per window (default: 3)
 * @param windowMs     Window duration in ms (default: 60 000 = 1 min)
 */
export function rateLimit(
  ip: string,
  maxRequests = 3,
  windowMs = 60_000
): boolean {
  const now = Date.now();
  const entry = requestCounts.get(ip);

  if (!entry || now > entry.resetAt) {
    requestCounts.set(ip, { count: 1, resetAt: now + windowMs });
    return true; // first request in window — allowed
  }

  if (entry.count >= maxRequests) {
    return false; // blocked
  }

  entry.count++;
  return true;
}
