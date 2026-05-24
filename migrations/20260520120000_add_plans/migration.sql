CREATE TABLE IF NOT EXISTS "plan" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL UNIQUE,
	"display_name" text NOT NULL,
	"max_resumes" integer NOT NULL DEFAULT 3,
	"max_ai_requests_per_day" integer NOT NULL DEFAULT 5,
	"allowed_templates" text[] NOT NULL DEFAULT '{}',
	"can_use_ai_agent" boolean NOT NULL DEFAULT false,
	"can_export_pdf" boolean NOT NULL DEFAULT true,
	"can_export_docx" boolean NOT NULL DEFAULT false,
	"can_share_publicly" boolean NOT NULL DEFAULT true,
	"can_use_custom_domain" boolean NOT NULL DEFAULT false,
	"is_default" boolean NOT NULL DEFAULT false,
	"sort_order" integer NOT NULL DEFAULT 0,
	"created_at" timestamp with time zone NOT NULL DEFAULT now(),
	"updated_at" timestamp with time zone NOT NULL DEFAULT now()
);--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "user_plan" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL UNIQUE REFERENCES "user"("id") ON DELETE CASCADE,
	"plan_id" text NOT NULL REFERENCES "plan"("id"),
	"ai_requests_today" integer NOT NULL DEFAULT 0,
	"ai_requests_reset_at" timestamp with time zone NOT NULL DEFAULT now(),
	"created_at" timestamp with time zone NOT NULL DEFAULT now(),
	"updated_at" timestamp with time zone NOT NULL DEFAULT now()
);--> statement-breakpoint

-- Insert default plans
INSERT INTO "plan" ("id", "name", "display_name", "max_resumes", "max_ai_requests_per_day", "allowed_templates", "can_use_ai_agent", "can_export_pdf", "can_export_docx", "can_share_publicly", "can_use_custom_domain", "is_default", "sort_order")
VALUES
	('plan_free', 'free', 'Free', 3, 5, ARRAY['azurill','bronzor','chikorita','ditgar','ditto','gengar','glalie','kakuna'], false, true, false, true, false, true, 0),
	('plan_pro', 'pro', 'Pro', 999, 50, '{}', true, true, true, true, true, false, 1),
	('plan_admin', 'admin', 'Admin', 999, 999, '{}', true, true, true, true, true, false, 2);--> statement-breakpoint

-- Assign existing users to the default (free) plan
INSERT INTO "user_plan" ("id", "user_id", "plan_id")
SELECT
	'up_' || substr(md5(random()::text), 1, 20),
	u."id",
	'plan_free'
FROM "user" u
WHERE NOT EXISTS (SELECT 1 FROM "user_plan" up WHERE up."user_id" = u."id");
