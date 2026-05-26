import { m } from "motion/react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const features = [
	{
		n: "01",
		title: "AI Writing Assistant",
		desc: "Paste your job title and years of experience. Our model generates achievement-driven bullet points that read like a senior recruiter wrote them — because it learned from millions that got people hired.",
	},
	{
		n: "02",
		title: "Real-Time ATS Scorer",
		desc: "Every major ATS parses your resume differently. We test yours against Workday, Greenhouse, Lever, and Taleo simultaneously and surface the exact changes that lift your score above the threshold.",
	},
	{
		n: "03",
		title: "200+ Expert Templates",
		desc: "Designed with typographers, tested by ex-recruiters at Google, McKinsey, and Goldman Sachs. Every template is ATS-safe, PDF-perfect, and available in light and dark variants.",
	},
	{
		n: "04",
		title: "LinkedIn Import",
		desc: "Authorize once and your entire work history, education, and skills populate automatically. Restructured, de-jargoned, and ready to edit in under 60 seconds.",
	},
	{
		n: "05",
		title: "Cover Letter Builder",
		desc: "One click converts your resume into a tailored cover letter for any job description. The AI matches tone and language to the company culture so it never reads as copy-paste.",
	},
	{
		n: "06",
		title: "Live Preview & Export",
		desc: "Every keystroke updates the formatted document in real time. When you're done: PDF, Word, or a shareable link — formatted identically across all three.",
	},
];

function FeatureRow({ n, title, desc, index }: (typeof features)[0] & { index: number }) {
	const { ref, isInView } = useScrollReveal<HTMLDivElement>({ threshold: 0.1, once: true });

	return (
		<m.div
			ref={ref}
			className="grid gap-4 border-lp-surface-border border-b py-8 last:border-b-0 sm:grid-cols-[80px_1fr] sm:gap-8"
			animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
			transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
			initial={{ opacity: 0, y: 24 }}
		>
			<div className="pt-0.5 font-mono text-lp-wire-300 text-sm">{n}</div>
			<div className="grid gap-4 sm:grid-cols-[1fr_2fr] sm:gap-12">
				<h3 className="font-display font-semibold text-base text-lp-ink-900 leading-snug">{title}</h3>
				<p className="text-lp-ink-600 text-sm leading-relaxed">{desc}</p>
			</div>
		</m.div>
	);
}

export function Features() {
	const { ref: headerRef, isInView: headerInView } = useScrollReveal<HTMLDivElement>({
		threshold: 0.1,
		once: true,
	});

	const { ref: demoRef, isInView: demoInView } = useScrollReveal<HTMLDivElement>({
		threshold: 0.1,
		once: true,
	});

	return (
		<section id="features" className="border-lp-surface-border border-b bg-lp-surface-base">
			{/* Section header */}
			<m.div
				ref={headerRef}
				className="mx-auto grid max-w-7xl items-end gap-8 px-5 pt-20 pb-10 sm:grid-cols-2 sm:px-8"
				animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
				transition={{ duration: 0.45, ease: "easeOut" }}
				initial={{ opacity: 0, y: 20 }}
			>
				<div>
					<p className="section-label mb-4">What's inside</p>
					<h2
						className="font-bold font-display text-3xl text-lp-ink-900 tracking-tight sm:text-4xl lg:text-5xl"
						style={{ letterSpacing: "-0.02em" }}
					>
						Every tool a
						<br />
						serious job seeker needs.
					</h2>
				</div>
				<p className="text-base text-lp-ink-500 leading-relaxed sm:ml-auto sm:max-w-xs sm:text-right">
					Built by people who've sat on both sides of the hiring table. No filler features, no fluff.
				</p>
			</m.div>

			{/* Feature list */}
			<div className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
				{features.map((f, i) => (
					<FeatureRow key={f.n} {...f} index={i} />
				))}
			</div>

			{/* AI before/after — full-width band */}
			<m.div
				ref={demoRef}
				className="grid border-lp-surface-border border-t lg:grid-cols-2"
				animate={demoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
				transition={{ duration: 0.5, ease: "easeOut" }}
				initial={{ opacity: 0, y: 20 }}
			>
				{/* Left side — copy + CTA */}
				<div className="border-lp-surface-border border-b px-8 py-14 sm:px-12 lg:border-r lg:border-b-0">
					<p className="section-label mb-5">AI in action</p>
					<h3
						className="mb-4 font-bold font-display text-2xl text-lp-ink-900 leading-tight sm:text-3xl"
						style={{ letterSpacing: "-0.02em" }}
					>
						From vague to remarkable
						<br />
						in one click.
					</h3>
					<p className="mb-8 max-w-sm text-lp-ink-500 text-sm leading-relaxed">
						The difference between getting screened out and getting called back is often a single well-written line. Our
						AI finds that line every time.
					</p>
					<a
						href="/dashboard"
						className="inline-flex items-center justify-center rounded-lg bg-lp-signal-500 px-6 py-3 font-semibold text-sm text-white transition-colors hover:bg-lp-signal-600"
					>
						Try AI Writing Free
					</a>
				</div>

				{/* Right side — dark contrast panel */}
				<div className="flex flex-col justify-center space-y-4 bg-lp-surface-dark px-8 py-14 sm:px-12">
					{/* Before card */}
					<div className="rounded border border-lp-ink-700 p-5">
						<p className="mb-2 font-mono text-[10px] text-lp-wire-400 uppercase tracking-widest">Before</p>
						<p className="text-lp-wire-400 text-sm italic leading-relaxed">
							"Worked on backend systems and helped with database stuff."
						</p>
					</div>

					{/* Arrow divider */}
					<div className="flex items-center gap-3">
						<div className="h-px flex-1 bg-lp-ink-700" />
						<span className="font-mono text-lp-signal-400 text-xs">AI →</span>
						<div className="h-px flex-1 bg-lp-ink-700" />
					</div>

					{/* After card */}
					<div className="rounded border border-lp-signal-500/30 bg-lp-signal-500/10 p-5">
						<p className="mb-2 font-mono text-[10px] text-lp-signal-400 uppercase tracking-widest">After</p>
						<p className="text-lp-wire-200 text-sm leading-relaxed">
							"Architected PostgreSQL schemas handling 2M+ daily active users, reducing average query latency by 67%
							through strategic indexing and query optimization."
						</p>
					</div>
				</div>
			</m.div>
		</section>
	);
}
