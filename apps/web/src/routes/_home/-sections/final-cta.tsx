import { ArrowRight } from "@phosphor-icons/react";
import { useState } from "react";

/**
 * Validates an email address.
 * Returns { valid: true } for valid emails, or { valid: false, error: string } for invalid ones.
 */
export function validateEmail(email: string): { valid: boolean; error?: string } {
	const trimmed = email.trim();
	if (!trimmed) return { valid: false, error: "Email is required" };
	// RFC 5322 simplified pattern
	const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!pattern.test(trimmed)) return { valid: false, error: "Please enter a valid email address" };
	return { valid: true };
}

export function FinalCTA() {
	const [email, setEmail] = useState("");
	const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const result = validateEmail(email);

		if (!result.valid) {
			setStatus("error");
			setErrorMessage(result.error ?? "Please enter a valid email address");
			return;
		}

		// No actual API call — just show success
		setStatus("success");
		setErrorMessage("");
	};

	return (
		<section id="final-cta" className="border-lp-surface-border border-b bg-lp-surface-paper">
			<div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
				<div className="max-w-2xl">
					{/* Label */}
					<p className="section-label mb-6">Start today</p>

					{/* Headline */}
					<h2
						className="mb-6 font-display font-extrabold text-lp-ink-900 leading-tight"
						style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}
					>
						Your dream job is
						<br />
						<span className="text-lp-signal-600">one resume away.</span>
					</h2>

					{/* Subheadline */}
					<p className="mb-10 max-w-lg text-lg text-lp-ink-600 leading-relaxed">
						3,000 professionals have already made the switch. Build your resume free — no credit card, no friction.
					</p>

					{/* Success state */}
					{status === "success" ? (
						<div className="max-w-md rounded border border-lp-signal-500/30 bg-lp-signal-50 px-6 py-5">
							<p className="mb-1 font-semibold text-lp-signal-700 text-sm">You're in.</p>
							<p className="text-lp-ink-600 text-sm">Check your inbox — 5 premium templates are on their way.</p>
						</div>
					) : (
						<>
							{/* Email capture form */}
							<form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-3 sm:flex-row" noValidate>
								<input
									type="email"
									value={email}
									onChange={(e) => {
										setEmail(e.target.value);
										if (status === "error") {
											setStatus("idle");
											setErrorMessage("");
										}
									}}
									placeholder="you@example.com"
									aria-label="Email address"
									aria-invalid={status === "error"}
									aria-describedby={status === "error" ? "final-cta-error" : undefined}
									className="flex-1 rounded-md border border-lp-wire-300 bg-white px-4 py-3 text-lp-ink-900 text-sm placeholder-lp-wire-400 transition-colors duration-150 focus:border-lp-signal-500 focus:outline-none focus:ring-1 focus:ring-lp-signal-500"
								/>
								<button
									type="submit"
									className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-lp-signal-500 px-6 py-3 font-semibold text-sm text-white transition-colors hover:bg-lp-signal-600"
								>
									Get Started Free
									<ArrowRight
										className="size-4 transition-transform group-hover:translate-x-0.5"
										weight="bold"
										aria-hidden="true"
									/>
								</button>
							</form>

							{/* Inline validation error */}
							{status === "error" && errorMessage && (
								<p id="final-cta-error" className="mt-2 text-red-500 text-xs" role="alert">
									{errorMessage}
								</p>
							)}

							{/* Trust note */}
							<p className="mt-3 text-lp-wire-400 text-xs">No credit card · No spam · Unsubscribe anytime</p>
						</>
					)}
				</div>
			</div>
		</section>
	);
}
