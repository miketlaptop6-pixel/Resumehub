/**
 * Template tier definitions for RBAC gating.
 * Pro templates require a "pro" or "admin" role.
 * Free templates are available to all users.
 */

export const PRO_TEMPLATES = ["gengar", "scizor", "lapras", "rhyhorn", "ditgar"] as const;

export const FREE_TEMPLATES = [
	"azurill",
	"bronzor",
	"chikorita",
	"ditto",
	"glalie",
	"kakuna",
	"leafish",
	"meowth",
	"onyx",
	"pikachu",
] as const;

export type ProTemplate = (typeof PRO_TEMPLATES)[number];
export type FreeTemplate = (typeof FREE_TEMPLATES)[number];

export function isProTemplate(template: string): boolean {
	return (PRO_TEMPLATES as readonly string[]).includes(template);
}

export function isFreeTemplate(template: string): boolean {
	return (FREE_TEMPLATES as readonly string[]).includes(template);
}
