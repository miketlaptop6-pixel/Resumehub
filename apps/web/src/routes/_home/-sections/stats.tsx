import { useCountUp } from "@/hooks/useCountUp";

const STATS = [
	{ value: 3000, suffix: "+", label: "Resumes Created", description: "by professionals worldwide" },
	{ value: 98, suffix: "%", label: "ATS Pass Rate", description: "across all major systems" },
	{ value: 5, suffix: " min", label: "Average Build Time", description: "from start to download" },
];

function StatItem({ value, suffix, label, description }: (typeof STATS)[0]) {
	const { ref, value: animatedValue } = useCountUp(value);

	const displayValue =
		value >= 1000
			? `${Math.floor(animatedValue / 1000)},${String(animatedValue % 1000).padStart(3, "0")}`
			: String(animatedValue);

	return (
		<div className="flex flex-col px-6 py-10 sm:px-8">
			<div
				className="mb-3 flex items-baseline gap-0.5 font-[var(--font-mono-lp)] font-bold text-lp-ink-900 leading-none"
				style={{ fontSize: "clamp(2.25rem, 4vw, 4rem)", letterSpacing: "-0.03em" }}
			>
				<span ref={ref}>{displayValue}</span>
				<span className="text-lp-signal-500">{suffix}</span>
			</div>
			<p className="mb-1 font-semibold text-lp-ink-800 text-sm">{label}</p>
			<p className="text-lp-ink-500 text-xs leading-snug">{description}</p>
		</div>
	);
}

export function Stats() {
	return (
		<section id="stats" className="border-lp-surface-border border-t bg-lp-surface-paper">
			<div className="mx-auto max-w-7xl border-lp-surface-border border-b px-5 py-6 sm:px-8">
				<p className="section-label">By the numbers</p>
			</div>
			<div className="mx-auto max-w-7xl px-5 sm:px-8">
				<div className="grid grid-cols-2 divide-lp-surface-border lg:grid-cols-3 lg:divide-x">
					{STATS.map((stat) => (
						<StatItem key={stat.label} {...stat} />
					))}
				</div>
			</div>
		</section>
	);
}
