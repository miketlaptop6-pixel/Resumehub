import { ORPCError } from "@orpc/client";
import { eq, and, count } from "drizzle-orm";
import { db } from "@reactive-resume/db/client";
import { plan, userPlan, resume, user } from "@reactive-resume/db/schema";

export interface UserPlanInfo {
	planId: string;
	planName: string;
	maxResumes: number;
	maxAiRequestsPerDay: number;
	allowedTemplates: string[];
	canUseAiAgent: boolean;
	canExportPdf: boolean;
	canExportDocx: boolean;
	canSharePublicly: boolean;
	canUseCustomDomain: boolean;
	aiRequestsToday: number;
	aiRequestsResetAt: Date;
	userPlanId: string;
}

export async function getUserPlan(userId: string): Promise<UserPlanInfo> {
	const [result] = await db
		.select({
			planId: plan.id,
			planName: plan.name,
			maxResumes: plan.maxResumes,
			maxAiRequestsPerDay: plan.maxAiRequestsPerDay,
			allowedTemplates: plan.allowedTemplates,
			canUseAiAgent: plan.canUseAiAgent,
			canExportPdf: plan.canExportPdf,
			canExportDocx: plan.canExportDocx,
			canSharePublicly: plan.canSharePublicly,
			canUseCustomDomain: plan.canUseCustomDomain,
			aiRequestsToday: userPlan.aiRequestsToday,
			aiRequestsResetAt: userPlan.aiRequestsResetAt,
			userPlanId: userPlan.id,
		})
		.from(userPlan)
		.innerJoin(plan, eq(userPlan.planId, plan.id))
		.where(eq(userPlan.userId, userId))
		.limit(1);

	if (!result) {
		// User has no plan assigned — assign the default plan
		const [defaultPlan] = await db
			.select()
			.from(plan)
			.where(eq(plan.isDefault, true))
			.limit(1);

		if (!defaultPlan) {
			// Fallback: get the "free" plan
			const [freePlan] = await db
				.select()
				.from(plan)
				.where(eq(plan.name, "free"))
				.limit(1);

			if (!freePlan) {
				// No plans exist at all — allow everything (first-run scenario)
				return {
					planId: "",
					planName: "unlimited",
					maxResumes: 999,
					maxAiRequestsPerDay: 999,
					allowedTemplates: [],
					canUseAiAgent: true,
					canExportPdf: true,
					canExportDocx: true,
					canSharePublicly: true,
					canUseCustomDomain: true,
					aiRequestsToday: 0,
					aiRequestsResetAt: new Date(),
					userPlanId: "",
				};
			}

			// Assign free plan to user
			const [newUserPlan] = await db
				.insert(userPlan)
				.values({ userId, planId: freePlan.id })
				.returning();

			return {
				planId: freePlan.id,
				planName: freePlan.name,
				maxResumes: freePlan.maxResumes,
				maxAiRequestsPerDay: freePlan.maxAiRequestsPerDay,
				allowedTemplates: freePlan.allowedTemplates,
				canUseAiAgent: freePlan.canUseAiAgent,
				canExportPdf: freePlan.canExportPdf,
				canExportDocx: freePlan.canExportDocx,
				canSharePublicly: freePlan.canSharePublicly,
				canUseCustomDomain: freePlan.canUseCustomDomain,
				aiRequestsToday: newUserPlan!.aiRequestsToday,
				aiRequestsResetAt: newUserPlan!.aiRequestsResetAt,
				userPlanId: newUserPlan!.id,
			};
		}

		// Assign default plan to user
		const [newUserPlan] = await db
			.insert(userPlan)
			.values({ userId, planId: defaultPlan.id })
			.returning();

		return {
			planId: defaultPlan.id,
			planName: defaultPlan.name,
			maxResumes: defaultPlan.maxResumes,
			maxAiRequestsPerDay: defaultPlan.maxAiRequestsPerDay,
			allowedTemplates: defaultPlan.allowedTemplates,
			canUseAiAgent: defaultPlan.canUseAiAgent,
			canExportPdf: defaultPlan.canExportPdf,
			canExportDocx: defaultPlan.canExportDocx,
			canSharePublicly: defaultPlan.canSharePublicly,
			canUseCustomDomain: defaultPlan.canUseCustomDomain,
			aiRequestsToday: newUserPlan!.aiRequestsToday,
			aiRequestsResetAt: newUserPlan!.aiRequestsResetAt,
			userPlanId: newUserPlan!.id,
		};
	}

	return result;
}

export async function checkResumeLimit(userId: string): Promise<void> {
	const userPlanInfo = await getUserPlan(userId);

	const [resumeCount] = await db
		.select({ count: count() })
		.from(resume)
		.where(eq(resume.userId, userId));

	if (resumeCount && resumeCount.count >= userPlanInfo.maxResumes) {
		throw new ORPCError("FORBIDDEN", {
			message: `Resume limit reached. Your "${userPlanInfo.planName}" plan allows a maximum of ${userPlanInfo.maxResumes} resumes.`,
		});
	}
}

export async function checkAiLimit(userId: string): Promise<void> {
	const userPlanInfo = await getUserPlan(userId);

	// Check if we need to reset the daily counter
	const now = new Date();
	const resetAt = new Date(userPlanInfo.aiRequestsResetAt);
	const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

	let currentRequests = userPlanInfo.aiRequestsToday;

	if (resetAt < startOfToday) {
		// Reset the counter
		await db
			.update(userPlan)
			.set({ aiRequestsToday: 0, aiRequestsResetAt: now })
			.where(eq(userPlan.userId, userId));
		currentRequests = 0;
	}

	if (currentRequests >= userPlanInfo.maxAiRequestsPerDay) {
		throw new ORPCError("FORBIDDEN", {
			message: `AI request limit reached. Your "${userPlanInfo.planName}" plan allows ${userPlanInfo.maxAiRequestsPerDay} AI requests per day.`,
		});
	}
}

export async function incrementAiUsage(userId: string): Promise<void> {
	const userPlanInfo = await getUserPlan(userId);
	const now = new Date();
	const resetAt = new Date(userPlanInfo.aiRequestsResetAt);
	const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

	if (resetAt < startOfToday) {
		// Reset and set to 1
		await db
			.update(userPlan)
			.set({ aiRequestsToday: 1, aiRequestsResetAt: now })
			.where(eq(userPlan.userId, userId));
	} else {
		// Increment
		await db
			.update(userPlan)
			.set({ aiRequestsToday: userPlanInfo.aiRequestsToday + 1 })
			.where(eq(userPlan.userId, userId));
	}
}

export async function checkAgentAccess(userId: string): Promise<void> {
	const userPlanInfo = await getUserPlan(userId);

	if (!userPlanInfo.canUseAiAgent) {
		throw new ORPCError("FORBIDDEN", {
			message: `AI Agent is not available on your "${userPlanInfo.planName}" plan. Please upgrade to use this feature.`,
		});
	}
}

export async function checkTemplateAccess(userId: string, template: string): Promise<void> {
	const userPlanInfo = await getUserPlan(userId);

	// Empty array means all templates are allowed
	if (userPlanInfo.allowedTemplates.length === 0) return;

	if (!userPlanInfo.allowedTemplates.includes(template)) {
		throw new ORPCError("FORBIDDEN", {
			message: `Template "${template}" is not available on your "${userPlanInfo.planName}" plan.`,
		});
	}
}
