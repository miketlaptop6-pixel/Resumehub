/**
 * AI usage limits middleware.
 *
 * Free users: 5 AI requests per day
 * Pro/Admin: unlimited
 *
 * Tracks usage in-memory keyed by userId + date string.
 */

import { ORPCError } from "@orpc/client";
import { getUserRole } from "./rbac";

const MAX_FREE_AI_REQUESTS_PER_DAY = 5;

/** In-memory usage tracker: key = `${userId}:${YYYY-MM-DD}` */
const aiUsageMap = new Map<string, number>();

function getTodayKey(userId: string): string {
	const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
	return `${userId}:${today}`;
}

/**
 * Check if the user has exceeded their daily AI request limit.
 * Throws FORBIDDEN if the limit is reached.
 */
export function checkAiLimit(user: { id: string; role?: string | null }): void {
	const role = getUserRole(user);

	// Pro and Admin have unlimited AI requests
	if (role === "admin" || role === "pro") return;

	const key = getTodayKey(user.id);
	const currentUsage = aiUsageMap.get(key) ?? 0;

	if (currentUsage >= MAX_FREE_AI_REQUESTS_PER_DAY) {
		throw new ORPCError("FORBIDDEN", {
			message: `You've reached your daily limit of ${MAX_FREE_AI_REQUESTS_PER_DAY} AI requests. Upgrade to Pro for unlimited AI usage.`,
		});
	}
}

/**
 * Increment the AI usage counter for a user.
 * Call this after a successful AI request.
 */
export function incrementAiUsage(user: { id: string; role?: string | null }): void {
	const role = getUserRole(user);

	// Don't track for Pro/Admin
	if (role === "admin" || role === "pro") return;

	const key = getTodayKey(user.id);
	const currentUsage = aiUsageMap.get(key) ?? 0;
	aiUsageMap.set(key, currentUsage + 1);
}

/**
 * Get the current AI usage count for a user today.
 */
export function getAiUsage(userId: string): number {
	const key = getTodayKey(userId);
	return aiUsageMap.get(key) ?? 0;
}

/**
 * Clean up old entries (call periodically if needed).
 * Removes entries that don't match today's date.
 */
export function cleanupOldAiUsage(): void {
	const today = new Date().toISOString().slice(0, 10);
	for (const key of aiUsageMap.keys()) {
		if (!key.endsWith(`:${today}`)) {
			aiUsageMap.delete(key);
		}
	}
}
