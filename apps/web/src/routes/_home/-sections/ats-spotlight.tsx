import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const metrics = [
	{ label: "Keyword Match", score: 97 },
	{ label: "Format Compatibility", score: 100 },
	{ label: "Section Structure", score: 95 },
	{ label: "Quantified Achievements", score: 88 },
	{ label: "Action Verb Strength", score: 92 },
	{ label: "Contact Completeness", score: 100 },
];

function ScoreBar({ label, score, active }: { label: string; score: number; active: boolean }) {
	return (
		<div className="border-lp-surface-border border-b py-4 last:border-b-0">
			<div className="mb-2 flex items-center justify-between">
				<span className="text-lp-ink-700 text-sm">{label}</span>
				<span className="font-mono font-semibold text-lp-signal-600 text-sm">{score}%</span>
			</div>
			<div className="h-1.5 overflow-hidden rounded-full bg-lp-wire-200">
				<div
					className="h-full rounded-full bg-lp-signal-500"
					style={{
						width: active ? `${score}%` : "0%",
						transition: "width 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
					}}
				/>
			</div>
		</div>
	);
}

export function ATSSpotlight() {
	const [active, setActive] = useState(false);
	const { ref: headerRef, isInView: headerInView } = useScrollReveal<HTMLDivElement>({
		threshold: 0.1,
	});
	const { ref: panelRef, isInView: panelInView } = useScrollReveal<HTMLDivElement>({
		threshold: 0.2,
	});

	// Trigger bar animations when panel enters viewport
	if (panelInView && !active) {
		setTimeout(() => setActive(true), 300);
	}

	return (
		<section id="ats" className="border-lp-surface-border border-b bg-lp-surface-muted">
			{/* Section header */}
			<div
				ref={headerRef}
				className="mx-auto grid max-w-7xl items-end gap-12 px-5 pt-20 pb-14 sm:px-8 lg:grid-cols-2"
				style={{
					opacity: headerInView ? 1 : 0,
					transform: headerInView ? "translateY(0)" : "translateY(24px)",
					transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
				}}
			>
				<div>
					<p className="section-label mb-4">ATS Optimization</p>
					<h2 className="section-title text-3xl sm:text-4xl lg:text-5xl">
						75% of resumes are
						<br />
						rejected by a bot.
					</h2>
				</div>
				<p className="text-base text-lp-ink-600 leading-relaxed lg:ml-auto lg:max-w-sm">
					Applicant Tracking Systems filter out resumes before a human ever sees them. ResumeHub scores and fixes yours
					so you make it through — every time.
				</p>
			</div>

			{/* Score breakdown panel */}
			<div ref={panelRef} className="mx-auto grid max-w-7xl items-start gap-8 px-5 pb-20 sm:px-8 lg:grid-cols-2">
				{/* Left — big score + comparison stats */}
				<div className="space-y-8">
					<div className="rounded-sm border border-lp-surface-border bg-white p-8 shadow-sm">
						<div className="mb-4 flex items-end gap-3">
							<span
								className="font-bold font-mono text-lp-ink-900 leading-none"
								style={{
									fontSize: "clamp(4rem, 10vw, 7rem)",
									letterSpacing: "-0.04em",
								}}
							>
								{active ? "97" : "—"}
							</span>
							<span className="mb-3 font-bold font-mono text-3xl text-lp-signal-500">%</span>
						</div>
						<p className="mb-1 font-medium text-base text-lp-ink-800">Average ATS score</p>
						<p className="text-lp-ink-500 text-sm">for resumes built with ResumeHub</p>
						<div className="mt-6 h-2 overflow-hidden rounded-full bg-lp-wire-200">
							<div
								className="h-full rounded-full bg-gradient-to-r from-lp-signal-600 to-lp-signal-400"
								style={{
									width: active ? "97%" : "0%",
									transition: "width 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
								}}
							/>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div className="rounded-sm border border-lp-surface-border bg-white p-5 shadow-sm">
							<div
								className="mb-2 font-bold font-mono text-3xl text-red-500 leading-none"
								style={{ letterSpacing: "-0.03em" }}
							>
								43%
							</div>
							<p className="text-lp-ink-500 text-xs leading-snug">Typical resume ATS score</p>
						</div>
						<div className="rounded-sm border border-lp-surface-border bg-white p-5 shadow-sm">
							<div
								className="mb-2 font-bold font-mono text-3xl text-lp-signal-500 leading-none"
								style={{ letterSpacing: "-0.03em" }}
							>
								3×
							</div>
							<p className="text-lp-ink-500 text-xs leading-snug">More callbacks than average</p>
						</div>
					</div>
				</div>

				{/* Right — metric bars */}
				<div className="overflow-hidden rounded-sm border border-lp-surface-border bg-white shadow-sm">
					<div className="flex items-center justify-between border-lp-surface-border border-b bg-lp-surface-muted px-6 py-4">
						<span className="font-mono text-lp-ink-500 text-xs uppercase tracking-widest">Score Breakdown</span>
						<span className="font-mono font-semibold text-lp-signal-600 text-xs">Overall: 97%</span>
					</div>
					<div className="px-6 py-2">
						{metrics.map((m) => (
							<ScoreBar key={m.label} label={m.label} score={m.score} active={active} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
