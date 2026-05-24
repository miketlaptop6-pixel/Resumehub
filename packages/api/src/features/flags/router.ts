import type { FeatureFlags } from "./service";
import z from "zod";
import { publicProcedure } from "../../context";
import { flagsService } from "./service";

export const flagsRouter = {
	get: publicProcedure
		.route({
			method: "GET",
			path: "/flags",
			tags: ["Feature Flags"],
			operationId: "getFeatureFlags",
			summary: "Get feature flags",
			description:
				"Returns the current feature flags for this ResumeHub.in instance. Feature flags control instance-wide settings such as whether new user signups or email-based authentication are disabled. No authentication required.",
			successDescription: "The current feature flags for this instance.",
		})
		.output(
			z.object({
				disableSignups: z.boolean().describe("Whether new user signups are disabled on this instance."),
				disableEmailAuth: z.boolean().describe("Whether email-based authentication is disabled on this instance."),
				maxFreeResumes: z.number().describe("Maximum number of resumes for free users."),
				maxFreeAiRequestsPerDay: z.number().describe("Maximum AI requests per day for free users."),
				proTemplates: z.array(z.string()).describe("List of template IDs that require Pro."),
			}),
		)
		.handler((): FeatureFlags => flagsService.getFlags()),
};
