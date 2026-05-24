/**
 * Admin API routes.
 * All endpoints require the "admin" role.
 */

import { ORPCError } from "@orpc/client";
import { z } from "zod";
import { count, eq, sql } from "drizzle-orm";
import { db } from "@reactive-resume/db/client";
import * as schema from "@reactive-resume/db/schema";
import { protectedProcedure } from "../../context";
import { requireRole } from "../../middleware/rbac";

export const adminRouter = {
	/** List all users with role, email, createdAt, and resume count */
	listUsers: protectedProcedure
		.route({
			method: "GET",
			path: "/admin/users",
			tags: ["Admin"],
			operationId: "adminListUsers",
			summary: "List all users (admin only)",
			description: "Returns a list of all users with their role, email, creation date, banned status, and resume count. Requires admin role.",
		})
		.handler(async ({ context }) => {
			requireRole(context.user, "admin");

			const users = await db
				.select({
					id: schema.user.id,
					name: schema.user.name,
					email: schema.user.email,
					role: schema.user.role,
					banned: schema.user.banned,
					banReason: schema.user.banReason,
					createdAt: schema.user.createdAt,
					resumeCount: sql<number>`(SELECT COUNT(*) FROM resume WHERE resume.user_id = ${schema.user.id})`.as("resume_count"),
				})
				.from(schema.user)
				.orderBy(schema.user.createdAt);

			return users;
		}),

	/** Change a user's role */
	updateUserRole: protectedProcedure
		.route({
			method: "PATCH",
			path: "/admin/users/{id}/role",
			tags: ["Admin"],
			operationId: "adminUpdateUserRole",
			summary: "Change a user's role (admin only)",
			description: "Updates the role of a user. Valid roles: admin, pro, free. Requires admin role.",
		})
		.input(
			z.object({
				id: z.string(),
				role: z.enum(["admin", "pro", "free"]),
			}),
		)
		.handler(async ({ context, input }) => {
			requireRole(context.user, "admin");

			const [updated] = await db
				.update(schema.user)
				.set({ role: input.role })
				.where(eq(schema.user.id, input.id))
				.returning({ id: schema.user.id, role: schema.user.role });

			if (!updated) {
				throw new ORPCError("NOT_FOUND", { message: "User not found" });
			}

			return updated;
		}),

	/** Ban or unban a user */
	banUser: protectedProcedure
		.route({
			method: "PATCH",
			path: "/admin/users/{id}/ban",
			tags: ["Admin"],
			operationId: "adminBanUser",
			summary: "Ban or unban a user (admin only)",
			description: "Sets the banned status of a user. Optionally provide a ban reason. Requires admin role.",
		})
		.input(
			z.object({
				id: z.string(),
				banned: z.boolean(),
				banReason: z.string().optional(),
			}),
		)
		.handler(async ({ context, input }) => {
			requireRole(context.user, "admin");

			// Prevent admin from banning themselves
			if (input.id === context.user.id) {
				throw new ORPCError("BAD_REQUEST", { message: "You cannot ban yourself." });
			}

			const [updated] = await db
				.update(schema.user)
				.set({
					banned: input.banned,
					banReason: input.banned ? (input.banReason ?? null) : null,
				})
				.where(eq(schema.user.id, input.id))
				.returning({
					id: schema.user.id,
					banned: schema.user.banned,
					banReason: schema.user.banReason,
				});

			if (!updated) {
				throw new ORPCError("NOT_FOUND", { message: "User not found" });
			}

			return updated;
		}),

	/** Get admin stats: total users, total resumes, users by role */
	stats: protectedProcedure
		.route({
			method: "GET",
			path: "/admin/stats",
			tags: ["Admin"],
			operationId: "adminGetStats",
			summary: "Get platform statistics (admin only)",
			description: "Returns total users, total resumes, and user count by role. Requires admin role.",
		})
		.handler(async ({ context }) => {
			requireRole(context.user, "admin");

			const [userCount] = await db.select({ count: count() }).from(schema.user);
			const [resumeCount] = await db.select({ count: count() }).from(schema.resume);

			// Count by role — normalize "user" and null to "free"
			const roleBreakdown = await db
				.select({
					role: schema.user.role,
					count: count(),
				})
				.from(schema.user)
				.groupBy(schema.user.role);

			const byRole = { admin: 0, pro: 0, free: 0 };
			for (const row of roleBreakdown) {
				const role = row.role;
				if (role === "admin") byRole.admin = row.count;
				else if (role === "pro") byRole.pro = row.count;
				else byRole.free += row.count; // "user", "free", null all count as free
			}

			return {
				totalUsers: userCount?.count ?? 0,
				totalResumes: resumeCount?.count ?? 0,
				usersByRole: byRole,
			};
		}),
};
