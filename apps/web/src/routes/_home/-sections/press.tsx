const press = [
	{ name: "Forbes", quote: "The most intuitive resume builder we've tested." },
	{ name: "TechCrunch", quote: "Disrupting the $12B career services market." },
	{ name: "Wired", quote: "AI that writes better resumes than most humans." },
	{ name: "Business Insider", quote: "We tried 10 resume builders. ResumeHub won by a mile." },
	{ name: "Product Hunt", quote: "#1 Product of the Day." },
	{ name: "The Guardian", quote: "Helping millions navigate the modern job market." },
];

export function Press() {
	return (
		<section id="press" className="border-lp-surface-border border-b bg-lp-surface-muted">
			<div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
				<p className="mb-8 font-mono-lp text-[10px] text-lp-wire-400 uppercase tracking-widest">As featured in</p>

				<div className="grid grid-cols-2 gap-0 overflow-hidden rounded-sm border border-lp-surface-border sm:grid-cols-3 lg:grid-cols-6">
					{press.map((p) => (
						<div
							key={p.name}
							className="group flex cursor-pointer flex-col gap-2 border-lp-surface-border border-r border-b bg-white px-5 py-6 transition-colors duration-150 last:border-r-0 lg:border-b-0 lg:[&:last-child]:border-r-0 sm:[&:nth-child(3n)]:border-r-0 lg:[&:nth-child(3n)]:border-r"
						>
							<p className="font-bold font-display text-lp-wire-400 transition-colors duration-150 group-hover:text-lp-ink-800">
								{p.name}
							</p>
							<p className="text-[10px] text-lp-wire-300 italic leading-snug transition-colors duration-150 group-hover:text-lp-ink-500">
								&ldquo;{p.quote}&rdquo;
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
