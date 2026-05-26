const companies = [
	"Google",
	"Apple",
	"Meta",
	"Amazon",
	"Microsoft",
	"Tesla",
	"Netflix",
	"Spotify",
	"McKinsey",
	"Goldman Sachs",
	"Deloitte",
	"IBM",
	"Salesforce",
	"Adobe",
	"Airbnb",
	"Uber",
	"LinkedIn",
	"Stripe",
	"Atlassian",
	"Razorpay",
];

export function TrustBar() {
	return (
		<section className="overflow-hidden border-lp-surface-border border-y bg-lp-surface-muted">
			<div className="mx-auto max-w-7xl px-5 py-5 sm:px-8">
				<p className="font-mono-lp text-[10px] text-lp-wire-400 uppercase tracking-[0.1em]">Our users work at</p>
			</div>

			<div
				className="relative flex overflow-hidden pb-5"
				style={{
					maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
				}}
			>
				<div className="flex shrink-0 animate-marquee">
					{[...companies, ...companies].map((company, index) => (
						<span
							key={`a-${index}`}
							className="whitespace-nowrap px-7 font-semibold text-lp-wire-400 text-sm tracking-tight"
						>
							{company}
						</span>
					))}
				</div>
				<div className="flex shrink-0 animate-marquee">
					{[...companies, ...companies].map((company, index) => (
						<span
							key={`b-${index}`}
							className="whitespace-nowrap px-7 font-semibold text-lp-wire-400 text-sm tracking-tight"
						>
							{company}
						</span>
					))}
				</div>
			</div>
		</section>
	);
}
