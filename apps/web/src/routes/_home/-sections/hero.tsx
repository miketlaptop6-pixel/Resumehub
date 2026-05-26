import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";

const resumeLines = [
	{ type: "name", text: "Priya Sharma" },
	{ type: "title", text: "Senior Product Manager" },
	{ type: "contact", text: "priya@email.com  ·  linkedin.com/in/priya  ·  +91 98765 43210" },
	{ type: "divider" },
	{ type: "section", text: "EXPERIENCE" },
	{ type: "company", text: "Google  ·  2021–Present" },
	{ type: "role", text: "Lead Product Manager, Search" },
	{ type: "bullet", text: "Led cross-functional team of 14 to ship 3 major features reaching 400M+ users" },
	{ type: "bullet", text: "Increased search engagement by 23% through personalization initiative" },
	{ type: "bullet", text: "Managed $4.2M product roadmap; delivered 100% on time, 8% under budget" },
	{ type: "divider" },
	{ type: "company", text: "Flipkart  ·  2018–2021" },
	{ type: "role", text: "Product Manager, Checkout" },
	{ type: "bullet", text: "Reduced cart abandonment by 31% through UX redesign and A/B testing" },
	{ type: "divider" },
	{ type: "section", text: "EDUCATION" },
	{ type: "company", text: "IIM Ahmedabad  ·  MBA, 2018" },
	{ type: "company", text: "IIT Bombay  ·  B.Tech Computer Science, 2016" },
];

function ResumePreview() {
	return (
		<div className="relative mx-auto w-full max-w-sm select-none">
			{/* Shadow for depth */}
			<div className="absolute -inset-2 rounded-lg bg-lp-signal-500/8 blur-2xl" />

			{/* The resume document */}
			<div className="relative overflow-hidden rounded border border-lp-surface-border bg-lp-surface-paper shadow-2xl">
				<div className="space-y-1 p-6">
					{resumeLines.map((line, i) => {
						if (line.type === "divider") return <div key={i} className="my-2 border-lp-surface-border border-t" />;
						if (line.type === "name")
							return (
								<p key={i} className="font-bold text-lg text-lp-ink-900 leading-tight tracking-tight">
									{line.text}
								</p>
							);
						if (line.type === "title")
							return (
								<p key={i} className="mb-1 font-medium text-lp-ink-600 text-xs">
									{line.text}
								</p>
							);
						if (line.type === "contact")
							return (
								<p key={i} className="text-[9px] text-lp-wire-400 leading-relaxed">
									{line.text}
								</p>
							);
						if (line.type === "section")
							return (
								<p key={i} className="pt-1 font-bold text-[8px] text-lp-ink-900 tracking-widest">
									{line.text}
								</p>
							);
						if (line.type === "company")
							return (
								<p key={i} className="mt-1 font-semibold text-[9px] text-lp-ink-700">
									{line.text}
								</p>
							);
						if (line.type === "role")
							return (
								<p key={i} className="text-[8px] text-lp-ink-500 italic">
									{line.text}
								</p>
							);
						if (line.type === "bullet")
							return (
								<div key={i} className="flex gap-1.5">
									<span className="mt-0.5 shrink-0 text-[8px] text-lp-wire-400">—</span>
									<p className="text-[8px] text-lp-ink-500 leading-relaxed">{line.text}</p>
								</div>
							);
						return null;
					})}
				</div>

				{/* ATS badge overlaid */}
				<div className="absolute top-3 right-3 rounded bg-lp-signal-500 px-1.5 py-0.5 font-bold font-mono text-[7px] text-white">
					ATS 97
				</div>
			</div>

			{/* Floating tag */}
			<div className="absolute -bottom-4 -left-4 rounded border border-lp-ink-700 bg-lp-surface-dark px-3 py-2 text-xs shadow-xl">
				<span className="font-mono font-semibold text-lp-signal-400">3x</span>
				<span className="ml-1 text-lp-wire-300">more callbacks</span>
			</div>
		</div>
	);
}

export function Hero() {
	return (
		<section id="hero" className="relative flex min-h-screen items-center overflow-hidden bg-lp-surface-base pt-14">
			{/* Subtle dot grid texture */}
			<div
				className="absolute inset-0 opacity-40"
				aria-hidden="true"
				style={{
					backgroundImage: "radial-gradient(circle, #D4D4D4 1px, transparent 1px)",
					backgroundSize: "32px 32px",
				}}
			/>

			{/* Soft green radial wash at top-right */}
			<div
				className="pointer-events-none absolute top-0 right-0 h-[700px] w-[700px] rounded-full bg-lp-signal-500/5 blur-[160px]"
				aria-hidden="true"
			/>
			{/* Warm tint at bottom-left */}
			<div
				className="pointer-events-none absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-amber-50 opacity-60 blur-[120px]"
				aria-hidden="true"
			/>

			<div className="relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
				<div className="grid items-center gap-16 lg:grid-cols-2">
					{/* Left — copy */}
					<div>
						{/* Category labels */}
						<div className="mb-8 flex items-center gap-2">
							<span className="section-label">Resume Builder</span>
							<span className="text-lp-wire-300">·</span>
							<span className="section-label">AI-Powered</span>
							<span className="text-lp-wire-300">·</span>
							<span className="section-label">ATS-Optimized</span>
						</div>

						{/* Headline */}
						<h1
							className="mb-6 font-display font-extrabold text-lp-ink-900 leading-[1.02]"
							style={{ fontSize: "clamp(2.5rem, 6vw, 4.75rem)", letterSpacing: "-0.03em" }}
						>
							The last resume
							<br />
							you'll ever write.
						</h1>

						{/* Subheadline */}
						<p className="mb-10 max-w-lg text-lg text-lp-ink-600 leading-relaxed">
							AI that writes like a top recruiter. Templates that pass every ATS. Land more interviews — in under five
							minutes.
						</p>

						{/* CTA Buttons */}
						<div className="mb-10 flex flex-col gap-3 sm:flex-row">
							<Link
								to="/dashboard"
								className="group inline-flex items-center justify-center gap-2 rounded-lg bg-lp-signal-500 px-7 py-3.5 font-semibold text-base text-white transition-colors hover:bg-lp-signal-600"
							>
								Build My Resume Free
								<ArrowRight
									className="size-4 transition-transform group-hover:translate-x-0.5"
									weight="bold"
									aria-hidden="true"
								/>
							</Link>
							<a
								href="#templates"
								className="inline-flex items-center justify-center rounded-lg border border-lp-surface-border px-7 py-3.5 font-semibold text-base text-lp-ink-900 transition-colors hover:bg-lp-surface-muted"
							>
								See Templates
							</a>
						</div>

						{/* Proof points */}
						<div className="flex flex-col gap-4 sm:flex-row">
							{["No credit card required", "3,000+ resumes created", "98% ATS pass rate"].map((text) => (
								<div key={text} className="flex items-center gap-2">
									<CheckCircle className="size-3.5 shrink-0 text-lp-signal-500" weight="fill" aria-hidden="true" />
									<span className="text-lp-ink-600 text-sm">{text}</span>
								</div>
							))}
						</div>
					</div>

					{/* Right — resume preview */}
					<div className="flex justify-center lg:justify-end">
						<ResumePreview />
					</div>
				</div>
			</div>

			{/* Bottom rule */}
			<div className="absolute inset-x-0 bottom-0 h-px bg-lp-surface-border" aria-hidden="true" />
		</section>
	);
}
