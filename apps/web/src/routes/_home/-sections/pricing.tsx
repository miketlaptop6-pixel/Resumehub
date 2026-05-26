import { Check } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";

interface PricingTier {
	name: string;
	tagline: string;
	price: string;
	period?: string;
	features: string[];
	cta: string;
	popular: boolean;
	note: string;
	ctaStyle: "ghost" | "primary";
}

const PRICING_TIERS: PricingTier[] = [
	{
		name: "Free",
		tagline: "Everything you need to get started.",
		price: "$0",
		features: ["3 resumes", "5 AI requests/day", "Basic templates", "PDF export"],
		cta: "Get Started Free",
		popular: false,
		note: "No credit card required.",
		ctaStyle: "ghost",
	},
	{
		name: "Pro",
		tagline: "For serious job seekers who want it all.",
		price: "₹299",
		period: "/month",
		features: [
			"Unlimited resumes",
			"Unlimited AI",
			"Premium templates",
			"PDF + Word export",
			"LinkedIn import",
			"Cover letter builder",
		],
		cta: "Start Pro",
		popular: true,
		note: "Cancel anytime.",
		ctaStyle: "primary",
	},
];

const TRUST_INDICATORS = ["Cancel anytime", "No hidden fees", "SSL-secured checkout"];

export function Pricing() {
	return (
		<section id="pricing" className="border-lp-surface-border border-b bg-lp-surface-base">
			{/* Section header */}
			<div className="mx-auto max-w-7xl px-5 pt-20 pb-10 sm:px-8">
				<p className="section-label mb-4">Pricing</p>
				<h2
					className="font-bold font-display text-3xl text-lp-ink-900 tracking-tight sm:text-4xl lg:text-5xl"
					style={{ letterSpacing: "-0.02em" }}
				>
					Simple pricing. No surprises.
				</h2>
			</div>

			{/* Pricing cards */}
			<div className="mx-auto max-w-7xl px-5 pb-12 sm:px-8">
				<div className="grid gap-0 overflow-hidden rounded-sm border border-lp-surface-border shadow-sm lg:grid-cols-2">
					{PRICING_TIERS.map((tier) => (
						<div
							key={tier.name}
							className={`flex flex-col border-lp-surface-border border-b p-8 last:border-b-0 lg:border-r lg:border-b-0 lg:last:border-r-0 ${
								tier.popular ? "bg-lp-surface-muted" : "bg-lp-surface-paper"
							}`}
						>
							{/* Plan name + badge */}
							<div className="mb-1 flex items-center gap-2">
								<h3 className="font-bold font-display text-lg text-lp-ink-900">{tier.name}</h3>
								{tier.popular && (
									<span className="rounded-sm border border-lp-signal-500/40 bg-lp-signal-50 px-2 py-0.5 font-mono text-[9px] text-lp-signal-600">
										POPULAR
									</span>
								)}
							</div>

							{/* Tagline */}
							<p className="mb-8 text-lp-ink-500 text-xs">{tier.tagline}</p>

							{/* Price */}
							<div className="mb-8">
								<div className="flex items-end gap-1">
									<span
										className="font-bold font-mono text-lp-ink-900"
										style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", letterSpacing: "-0.03em" }}
									>
										{tier.price}
									</span>
									{tier.period && <span className="mb-2 text-lp-ink-500 text-sm">{tier.period}</span>}
								</div>
							</div>

							{/* CTA button */}
							<Link
								to="/dashboard"
								className={`mb-8 block rounded-md py-3 text-center font-semibold text-sm transition-all duration-150 ${
									tier.ctaStyle === "primary"
										? "bg-lp-signal-500 text-white hover:bg-lp-signal-600"
										: "border border-lp-wire-300 text-lp-ink-700 hover:border-lp-wire-400 hover:bg-lp-surface-muted"
								}`}
							>
								{tier.cta}
							</Link>

							{/* Features list */}
							<ul className="flex-1 space-y-3">
								{tier.features.map((feature) => (
									<li key={feature} className="flex items-start gap-3">
										<Check className="mt-0.5 size-3.5 shrink-0 text-lp-signal-500" weight="bold" />
										<span className="text-lp-ink-600 text-sm">{feature}</span>
									</li>
								))}
							</ul>

							{/* Note */}
							<p className="mt-6 border-lp-surface-border border-t pt-4 text-lp-wire-400 text-xs">{tier.note}</p>
						</div>
					))}
				</div>

				{/* Trust indicators */}
				<div className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-2">
					{TRUST_INDICATORS.map((indicator) => (
						<span key={indicator} className="flex items-center gap-1.5 text-lp-ink-500 text-xs">
							<Check className="size-3 shrink-0 text-lp-signal-600" weight="bold" />
							{indicator}
						</span>
					))}
				</div>
			</div>
		</section>
	);
}
