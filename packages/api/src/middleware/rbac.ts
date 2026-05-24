/**
 * Role-Based Access Control (RBAC) middleware and helpers.
 *
 * Roles: "admin", "pro", "free"
 * Legacy: "user" is treated as equivalent to "free" for backward compatibility.
 */

import { ORPCError } from "@orpc/client";

export const ROLES = ["admin", "pro", "free"] as const;
export type Role = (typeof ROLES)[number];

/** Normalize legacy "user" role to "free" */
function normalizeRole(role: string | null | undefined): Role {
	if (role === "admin") return "admin";
	if (role === "pro") return "pro";
	// "user", "free", null, undefined all map to "free"
	return "free";
}

export function getUserRole(user: { role?: string | null }): Role {
	return normalizeRole(user.role);
}

export function isAdmin(user: { role?: string | null }): boolean {
	return getUserRole(user) === "admin";
}

export function isPro(user: { role?: string | null }): boolean {
	return getUserRole(user) === "pro";
}

export function isFreeUser(user: { role?: string | null }): boolean {
	return getUserRole(user) === "free";
}

/**
 * Returns true if the user has one of the specified roles.
 */
export function hasRole(user: { role?: string | null }, ...roles: Role[]): boolean {
	return roles.includes(getUserRole(user));
}

/**
 * Throws FORBIDDEN if the user does not have one of the required roles.
 * Use in oRPC handlers: `requireRole(context.user, "admin", "pro")`
 */
export function requireRole(user: { role?: string | null }, ...roles: Role[]): void {
	if (!hasRole(user, ...roles)) {
		throw new ORPCError("FORBIDDEN", {
			message: `This action requires one of the following roles: ${roles.join(", ")}`,
		});
	}
}
