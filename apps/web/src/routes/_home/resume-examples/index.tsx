import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_home/resume-examples/")({
	component: ResumeExamplesPage,
});

function ResumeExamplesPage() {
	return (
		<main id="main-content" className="flex min-h-[60vh] items-center justify-center bg-lp-surface-base px-5">
			<div className="mx-auto max-w-lg text-center">
				<p className="section-label mb-4">Resume Examples</p>
				<h1
					className="mb-4 font-bold font-display text-3xl text-lp-ink-900 tracking-tight sm:text-4xl"
					style={{ letterSpacing: "-0.02em" }}
				>
					Real resume examples that got hired
				</h1>
				<p className="mb-8 text-base text-lp-ink-500 leading-relaxed">
					Browse sample resumes by industry and role. See exactly how top candidates structure their experience. Coming
					soon.
				</p>
				<div className="inline-flex items-center gap-2 rounded-full border border-lp-signal-500/30 bg-lp-signal-50 px-4 py-2 font-medium text-lp-signal-700 text-sm">
					<span className="inline-block size-2 animate-pulse rounded-full bg-lp-signal-500" />
					Coming Soon
				</div>
			</div>
		</main>
	);
}
