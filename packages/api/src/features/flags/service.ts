import { env } from "@reactive-resume/env/server";
import { PRO_TEMPLATES } from "@reactive-resume/schema/template-tiers";

export type FeatureFlags = {
	disableSignups: boolean;
	disableEmailAuth: boolean;
	maxFreeResumes: number;
	maxFreeAiRequestsPerDay: number;
	proTemplates: string[];
};

export const flagsService = {
	getFlags: (): FeatureFlags => ({
		disableSignups: env.FLAG_DISABLE_SIGNUPS,
		disableEmailAuth: env.FLAG_DISABLE_EMAIL_AUTH,
		maxFreeResumes: 3,
		maxFreeAiRequestsPerDay: 5,
		proTemplates: [...PRO_TEMPLATES],
	}),
};
