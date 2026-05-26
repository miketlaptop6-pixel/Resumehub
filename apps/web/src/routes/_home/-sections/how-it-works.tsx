import { Link } from "@tanstack/react-router";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const steps = [
	{
		n: "01",
		title: "Pick a template",
		desc: "Filter by industry, role level, or style. Every design passes ATS and looks sharp in print.",
		detail: "200+ templates — all free to preview",
	},
	{
		n: "02",
		title: "Let AI fill it in",
		desc: "Import from LinkedIn or start fresh. AI drafts your experience section; you refine, reorder, remove.",
		detail: "Average time to first draft: 4 minutes",
	},
	{
		n: "03",
		title: "Score, fix, download",
		desc: "Check your ATS score, apply the suggested fixes, then export as PDF, Word, or a shareable link.",
		detail: "97% average ATS score after optimization",
	},
];

export function HowItWorks() {
	const { ref, isInView } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

	return (
		<section id="how-it-works" className="border-lp-surface-border border-b bg-lp-surface-paper">
			<div className="mx-auto max-w-7xl px-5 pt-20 pb-10 sm:px-8">
				<p className="section-label mb-4">How it works</p>
				<h2 className="section-title max-w-xl text-3xl sm:text-4xl lg:text-5xl">
					Three steps.
					<br />
					One great resume.
				</h2>
			</div>

			{/* Steps card grid */}
			<div
				ref={ref}
				className="mx-auto max-w-7xl px-5 pb-20 sm:px-8"
				style={{
					opacity: isInView ? 1 : 0,
					transform: isInView ? "translateY(0)" : "translateY(24px)",
					transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
				}}
			>
				<div className="grid divide-y divide-lp-surface-border overflow-hidden rounded-sm border border-lp-surface-border lg:grid-cols-3 lg:divide-x lg:divide-y-0">
					{steps.map((s) => (
						<div key={s.n} className="flex flex-col gap-6 bg-white p-8 sm:p-10">
							<div className="font-bold font-mono text-5xl text-lp-wire-200 leading-none tracking-tighter">{s.n}</div>
							<div>
								<h3 className="mb-2 font-display font-semibold text-lg text-lp-ink-900">{s.title}</h3>
								<p className="text-lp-ink-600 text-sm leading-relaxed">{s.desc}</p>
							</div>
							<div className="mt-auto border-lp-surface-border border-t pt-4">
								<p className="font-mono text-lp-signal-600 text-xs">{s.detail}</p>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Bottom CTA strip */}
			<div className="border-lp-surface-border border-t bg-lp-surface-muted">
				<div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 py-10 sm:flex-row sm:px-8">
					<p className="font-medium text-base text-lp-ink-700">Ready in 5 minutes. No CV writing experience needed.</p>
					<Link
						to="/dashboard"
						className="shrink-0 rounded-lg bg-lp-signal-500 px-8 py-3 font-semibold text-base text-white transition-colors hover:bg-lp-signal-600"
					>
						Start Now — It's Free
					</Link>
				</div>
			</div>
		</section>
	);
}
