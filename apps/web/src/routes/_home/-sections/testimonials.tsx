import { m } from "motion/react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const pullQuotes = [
	{
		quote:
			"I applied to Google three times before using ResumeHub. Fourth time, I sailed past the ATS and got the call within a week.",
		name: "Priya Sharma",
		role: "Software Engineer, Google",
		color: "bg-lp-signal-500",
	},
	{
		quote:
			"The AI rewrote my experience section and it reads like a completely different — and far better — person wrote it.",
		name: "Rahul Mehta",
		role: "Product Manager, Meta",
		color: "bg-blue-500",
	},
	{
		quote:
			"Zero callbacks in three months. Eight interview invitations in two weeks after switching to ResumeHub. The ATS optimizer is the real deal.",
		name: "Sarah Johnson",
		role: "Data Scientist, Amazon",
		color: "bg-purple-500",
	},
];

const starDistribution = [82, 12, 4, 1, 1];

function InitialsAvatar({ name, color }: { name: string; color: string }) {
	const initial = name.charAt(0).toUpperCase();

	return (
		<div
			className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-semibold text-sm text-white ${color}`}
		>
			{initial}
		</div>
	);
}

function PullQuoteCard({ quote, name, role, color, index }: (typeof pullQuotes)[0] & { index: number }) {
	const { ref, isInView } = useScrollReveal<HTMLDivElement>({ threshold: 0.1, once: true });

	return (
		<m.div
			ref={ref}
			className="flex flex-col gap-6 border-lp-surface-border border-b bg-lp-surface-paper px-8 py-10 last:border-b-0 sm:px-10 lg:border-r lg:border-b-0 lg:last:border-r-0"
			animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
			transition={{ duration: 0.45, delay: index * 0.1, ease: "easeOut" }}
			initial={{ opacity: 0, y: 24 }}
		>
			<p className="flex-1 text-lg text-lp-ink-700 italic leading-relaxed sm:text-xl">&ldquo;{quote}&rdquo;</p>
			<div className="mt-auto flex items-center gap-3 border-lp-surface-border border-t pt-6">
				<InitialsAvatar name={name} color={color} />
				<div>
					<p className="font-semibold text-lp-ink-800 text-sm">{name}</p>
					<p className="text-lp-ink-500 text-xs">{role}</p>
				</div>
			</div>
		</m.div>
	);
}

export function Testimonials() {
	const { ref: headerRef, isInView: headerInView } = useScrollReveal<HTMLDivElement>({
		threshold: 0.1,
		once: true,
	});

	const { ref: ratingRef, isInView: ratingInView } = useScrollReveal<HTMLDivElement>({
		threshold: 0.1,
		once: true,
	});

	return (
		<section id="testimonials" className="border-lp-surface-border border-b bg-lp-surface-paper">
			{/* Section header */}
			<m.div
				ref={headerRef}
				className="mx-auto max-w-7xl px-5 pt-20 pb-10 sm:px-8"
				animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
				transition={{ duration: 0.45, ease: "easeOut" }}
				initial={{ opacity: 0, y: 20 }}
			>
				<p className="section-label mb-4">What people say</p>
				<h2
					className="font-bold font-display text-3xl text-lp-ink-900 tracking-tight sm:text-4xl lg:text-5xl"
					style={{ letterSpacing: "-0.02em" }}
				>
					Real hires.
					<br />
					Real words.
				</h2>
			</m.div>

			{/* Three pull quote cards in a bordered grid */}
			<div className="mx-auto max-w-7xl px-5 pb-12 sm:px-8">
				<div className="grid overflow-hidden rounded-sm border border-lp-surface-border shadow-sm lg:grid-cols-3">
					{pullQuotes.map((q, i) => (
						<PullQuoteCard key={q.name} {...q} index={i} />
					))}
				</div>
			</div>

			{/* Rating summary bar */}
			<m.div
				ref={ratingRef}
				className="mx-auto max-w-7xl px-5 pb-20 sm:px-8"
				animate={ratingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
				transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
				initial={{ opacity: 0, y: 20 }}
			>
				<div className="flex flex-col items-start gap-6 rounded-sm border border-lp-surface-border bg-lp-surface-paper p-6 shadow-sm sm:flex-row sm:items-center">
					{/* Score */}
					<div className="shrink-0">
						<span className="font-bold font-mono text-5xl text-lp-ink-900" style={{ letterSpacing: "-0.03em" }}>
							4.9
						</span>
						<span className="ml-2 text-lp-wire-400 text-sm">/ 5.0</span>
					</div>

					{/* Star distribution bars */}
					<div className="flex-1 space-y-1.5">
						{starDistribution.map((pct, i) => (
							<div key={i} className="flex items-center gap-3">
								<span className="w-10 shrink-0 font-mono text-lp-wire-400 text-xs">{5 - i} star</span>
								<div className="h-1 flex-1 overflow-hidden rounded-full bg-lp-wire-200">
									<div className="h-full rounded-full bg-lp-signal-500" style={{ width: `${pct}%` }} />
								</div>
								<span className="w-8 shrink-0 font-mono text-lp-wire-400 text-xs">{pct}%</span>
							</div>
						))}
					</div>

					{/* Review count */}
					<div className="shrink-0 text-right">
						<p className="font-semibold text-lp-ink-800 text-sm">48,000+</p>
						<p className="text-lp-ink-500 text-xs">verified reviews</p>
					</div>
				</div>
			</m.div>
		</section>
	);
}
