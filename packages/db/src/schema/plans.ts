import * as pg from "drizzle-orm/pg-core";
import { generateId } from "@reactive-resume/utils/string";
import { user } from "./auth";

export const plan = pg.pgTable("plan", {
	id: pg
		.text("id")
		.notNull()
		.primaryKey()
		.$defaultFn(() => generateId()),
	name: pg.text("name").notNull().unique(),
	displayName: pg.text("display_name").notNull(),
	maxResumes: pg.integer("max_resumes").notNull().default(3),
	maxAiRequestsPerDay: pg.integer("max_ai_requests_per_day").notNull().default(5),
	allowedTemplates: pg.text("allowed_templates").array().notNull().default([]),
	canUseAiAgent: pg.boolean("can_use_ai_agent").notNull().default(false),
	canExportPdf: pg.boolean("can_export_pdf").notNull().default(true),
	canExportDocx: pg.boolean("can_export_docx").notNull().default(false),
	canSharePublicly: pg.boolean("can_share_publicly").notNull().default(true),
	canUseCustomDomain: pg.boolean("can_use_custom_domain").notNull().default(false),
	isDefault: pg.boolean("is_default").notNull().default(false),
	sortOrder: pg.integer("sort_order").notNull().default(0),
	createdAt: pg.timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
	updatedAt: pg
		.timestamp("updated_at", { withTimezone: true })
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date()),
});

export const userPlan = pg.pgTable("user_plan", {
	id: pg
		.text("id")
		.notNull()
		.primaryKey()
		.$defaultFn(() => generateId()),
	userId: pg
		.text("user_id")
		.notNull()
		.unique()
		.references(() => user.id, { onDelete: "cascade" }),
	planId: pg
		.text("plan_id")
		.notNull()
		.references(() => plan.id),
	aiRequestsToday: pg.integer("ai_requests_today").notNull().default(0),
	aiRequestsResetAt: pg.timestamp("ai_requests_reset_at", { withTimezone: true }).notNull().defaultNow(),
	createdAt: pg.timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
	updatedAt: pg
		.timestamp("updated_at", { withTimezone: true })
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date()),
});
