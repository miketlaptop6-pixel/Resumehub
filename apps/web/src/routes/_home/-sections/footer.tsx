import { ArrowUp, InstagramLogo, LinkedinLogo, TwitterLogo, YoutubeLogo } from "@phosphor-icons/react";
import { useState } from "react";

const LINK_COLUMNS: Record<string, { label: string; href: string }[]> = {
	Product: [
		{ label: "Resume Builder", href: "/" },
		{ label: "Cover Letter", href: "/" },
		{ label: "LinkedIn Optimizer", href: "/" },
		{ label: "Templates", href: "/templates" },
		{ label: "ATS Checker", href: "/" },
		{ label: "AI Writing", href: "/" },
	],
	Resources: [
		{ label: "Career Blog", href: "/blog" },
		{ label: "Resume Examples", href: "/resume-examples" },
		{ label: "Interview Tips", href: "/blog" },
		{ label: "Salary Guide", href: "/blog" },
		{ label: "Job Search Tips", href: "/blog" },
		{ label: "Free Tools", href: "/" },
	],
	Company: [
		{ label: "About Us", href: "/" },
		{ label: "Careers", href: "/" },
		{ label: "Press Kit", href: "/" },
		{ label: "Partners", href: "/" },
		{ label: "Contact", href: "/" },
		{ label: "Investors", href: "/" },
	],
	Legal: [
		{ label: "Privacy Policy", href: "/" },
		{ label: "Terms of Service", href: "/" },
		{ label: "Cookie Policy", href: "/" },
		{ label: "GDPR", href: "/" },
		{ label: "Accessibility", href: "/" },
	],
};

const SOCIAL_LINKS = [
	{ label: "Twitter", href: "https://twitter.com", icon: TwitterLogo },
	{ label: "LinkedIn", href: "https://linkedin.com", icon: LinkedinLogo },
	{ label: "Instagram", href: "https://instagram.com", icon: InstagramLogo },
	{ label: "YouTube", href: "https://youtube.com", icon: YoutubeLogo },
];

export function Footer() {
	const [email, setEmail] = useState("");
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!email.trim()) return;
		setSubmitted(true);
		setEmail("");
	};

	return (
		<footer id="footer" className="border-lp-ink-800 border-t bg-lp-surface-dark">
			<div className="mx-auto max-w-7xl px-5 sm:px-8">
				{/* Main grid */}
				<div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16 md:grid-cols-3 lg:grid-cols-6">
					{/* Brand + newsletter */}
					<div className="col-span-2 space-y-6 md:col-span-3 lg:col-span-2">
						<div>
							<a href="/" className="font-bold font-display text-white text-xl tracking-tight">
								Resume<span className="text-lp-signal-400">Hub</span>
								<span className="font-normal text-lp-wire-500 text-sm">.in</span>
							</a>
							<p className="mt-3 max-w-xs text-lp-wire-500 text-xs leading-relaxed">
								AI-powered resume builder. ATS-optimized. Career-transforming. Built in India, used worldwide.
							</p>
						</div>

						{/* Newsletter signup */}
						{submitted ? (
							<p className="font-medium text-lp-signal-400 text-sm">Thanks for subscribing!</p>
						) : (
							<form onSubmit={handleSubmit} className="flex gap-2">
								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="Your email"
									aria-label="Email for newsletter"
									className="flex-1 rounded-sm border border-lp-ink-600 bg-lp-ink-800 px-3 py-2 text-white text-xs placeholder-lp-wire-600 transition-colors focus:border-lp-signal-500 focus:outline-none"
								/>
								<button
									type="submit"
									className="shrink-0 rounded-sm bg-lp-signal-500 px-4 py-2 font-semibold text-white text-xs transition-colors hover:bg-lp-signal-400"
								>
									Join
								</button>
							</form>
						)}

						{/* Social media icons */}
						<div className="flex items-center gap-3">
							{SOCIAL_LINKS.map((social) => (
								<a
									key={social.label}
									href={social.href}
									aria-label={social.label}
									className="text-lp-wire-500 transition-colors duration-150 hover:text-white"
								>
									<social.icon size={20} weight="regular" aria-hidden="true" />
								</a>
							))}
						</div>
					</div>

					{/* Link columns */}
					{Object.entries(LINK_COLUMNS).map(([section, items]) => (
						<div key={section}>
							<p className="mb-4 font-mono text-[10px] text-lp-wire-500 uppercase tracking-widest">{section}</p>
							<ul className="space-y-2">
								{items.map((item) => (
									<li key={item.label}>
										<a
											href={item.href}
											className="text-lp-wire-500 text-xs transition-colors duration-150 hover:text-lp-wire-200"
										>
											{item.label}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* Bottom bar */}
				<div className="flex flex-col items-center justify-between gap-4 border-lp-ink-700 border-t py-5 sm:flex-row">
					<div className="flex items-center gap-3 text-lp-wire-600 text-xs">
						<span>© 2026 ResumeHub.in</span>
						<span>·</span>
						<span>Made in India</span>
					</div>

					<div className="flex items-center gap-4 font-mono text-lp-wire-600 text-xs">
						<span>SOC 2</span>
						<span>·</span>
						<span>GDPR</span>
						<span>·</span>
						<span>TLS 1.3</span>
					</div>

					<button
						type="button"
						onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
						aria-label="Scroll to top"
						className="flex h-7 w-7 items-center justify-center rounded-sm border border-lp-ink-600 text-lp-wire-600 transition-all duration-150 hover:border-lp-wire-500 hover:text-white"
					>
						<ArrowUp className="h-3.5 w-3.5" />
					</button>
				</div>
			</div>
		</footer>
	);
}
