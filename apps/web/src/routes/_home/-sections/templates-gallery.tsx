import { Link } from "@tanstack/react-router";
import { useState } from "react";

type TemplateCategory = "professional" | "creative" | "simple" | "executive";

interface TemplateItem {
	id: string;
	name: string;
	category: TemplateCategory;
	badge: string;
	uses: string;
	rating: string;
	gradient: string;
}

const categories = ["All", "Professional", "Creative", "Simple", "Executive"] as const;

const templates: TemplateItem[] = [
	{
		id: "atlas",
		name: "Atlas",
		category: "professional",
		badge: "Most Used",
		uses: "284K",
		rating: "4.9",
		gradient: "from-blue-100 to-blue-200",
	},
	{
		id: "nova",
		name: "Nova",
		category: "creative",
		badge: "Editor's Pick",
		uses: "142K",
		rating: "4.8",
		gradient: "from-purple-100 to-purple-200",
	},
	{
		id: "pinnacle",
		name: "Pinnacle",
		category: "executive",
		badge: "ATS-Safe",
		uses: "98K",
		rating: "4.9",
		gradient: "from-amber-100 to-amber-200",
	},
	{
		id: "circuit",
		name: "Circuit",
		category: "simple",
		badge: "New",
		uses: "63K",
		rating: "4.7",
		gradient: "from-emerald-100 to-emerald-200",
	},
	{
		id: "clarity",
		name: "Clarity",
		category: "professional",
		badge: "ATS-Safe",
		uses: "201K",
		rating: "4.8",
		gradient: "from-sky-100 to-sky-200",
	},
	{
		id: "scholar",
		name: "Scholar",
		category: "simple",
		badge: "Most Used",
		uses: "177K",
		rating: "4.9",
		gradient: "from-rose-100 to-rose-200",
	},
	{
		id: "prestige",
		name: "Prestige",
		category: "executive",
		badge: "Premium",
		uses: "54K",
		rating: "4.9",
		gradient: "from-indigo-100 to-indigo-200",
	},
	{
		id: "spark",
		name: "Spark",
		category: "creative",
		badge: "New",
		uses: "29K",
		rating: "4.6",
		gradient: "from-orange-100 to-orange-200",
	},
];

/**
 * Pure function for filtering templates by category.
 * Returns all templates when category is "all" (case-insensitive).
 */
export function filterTemplates(items: TemplateItem[], category: string): TemplateItem[] {
	if (category.toLowerCase() === "all") return items;
	return items.filter((t) => t.category === category.toLowerCase());
}

function TemplateCard({ template }: { template: TemplateItem }) {
	const badgeIsHighlighted = template.badge === "Most Used" || template.badge === "ATS-Safe";

	return (
		<div className="group cursor-pointer overflow-hidden rounded-sm border border-lp-surface-border bg-white shadow-sm transition-all duration-200 hover:border-lp-wire-400 hover:shadow-md">
			{/* Gradient placeholder */}
			<div className={`aspect-[4/5] bg-gradient-to-br ${template.gradient}`} />

			{/* Card info */}
			<div className="flex items-center justify-between border-lp-surface-border border-t px-4 py-3">
				<div>
					<p className="font-display font-semibold text-lp-ink-800 text-sm">{template.name}</p>
					<p className="font-mono text-lp-wire-400 text-xs">{template.uses} uses</p>
				</div>
				<div className="flex items-center gap-1.5">
					<span className="font-mono font-semibold text-lp-signal-600 text-xs">{template.rating}</span>
					<span className="text-lp-signal-500 text-xs">★</span>
					{badgeIsHighlighted ? (
						<span className="ml-1 rounded-sm border border-lp-signal-500/40 px-1.5 py-0.5 font-mono font-semibold text-[9px] text-lp-signal-600">
							{template.badge}
						</span>
					) : (
						<span className="ml-1 rounded-sm border border-lp-wire-300 px-1.5 py-0.5 font-mono font-semibold text-[9px] text-lp-ink-500">
							{template.badge}
						</span>
					)}
				</div>
			</div>
		</div>
	);
}

export function TemplatesGallery() {
	const [activeCategory, setActiveCategory] = useState<string>("All");
	const filtered = filterTemplates(templates, activeCategory);

	return (
		<section id="templates" className="border-lp-surface-border border-b bg-lp-surface-base">
			{/* Header */}
			<div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-5 pt-20 pb-10 sm:flex-row sm:items-end sm:px-8">
				<div>
					<p className="section-label mb-4">Templates</p>
					<h2 className="section-title text-3xl sm:text-4xl lg:text-5xl">
						200+ designs.
						<br />
						All ATS-safe.
					</h2>
				</div>

				{/* Category filter tabs */}
				<div className="flex flex-wrap gap-2">
					{categories.map((cat) => (
						<button
							type="button"
							key={cat}
							onClick={() => setActiveCategory(cat)}
							className={`rounded-sm border px-3 py-1.5 font-medium font-mono text-xs transition-all duration-150 ${
								activeCategory === cat
									? "border-lp-signal-500 bg-lp-signal-500 text-white"
									: "border-lp-wire-300 bg-white text-lp-ink-600 hover:border-lp-wire-400 hover:text-lp-ink-900"
							}`}
						>
							{cat}
						</button>
					))}
				</div>
			</div>

			{/* Template grid */}
			<div className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
				<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
					{filtered.map((t) => (
						<TemplateCard key={t.id} template={t} />
					))}
				</div>

				{/* CTA */}
				<div className="mt-10 flex justify-center">
					<Link
						to="/templates"
						className="rounded-lg border border-lp-surface-border px-8 py-2.5 font-semibold text-lp-ink-700 text-sm transition-colors hover:border-lp-wire-400 hover:text-lp-ink-900"
					>
						Browse All 200+ Templates
					</Link>
				</div>
			</div>
		</section>
	);
}
