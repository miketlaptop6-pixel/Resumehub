import { Minus, Plus } from "@phosphor-icons/react";
import { AnimatePresence, m } from "motion/react";
import { useState } from "react";

interface FAQItem {
	question: string;
	answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
	{
		question: "Is ResumeHub really free to use?",
		answer:
			"Yes. The Free plan lets you build and download 3 resumes using basic templates and ATS checking — no credit card required. Upgrade to Pro for unlimited downloads and premium templates.",
	},
	{
		question: "Will my resume pass ATS systems?",
		answer:
			"Every template is tested against Workday, Greenhouse, Lever, and Taleo. Our real-time ATS scorer shows your score before you download and tells you exactly what to fix.",
	},
	{
		question: "Can I export to Word as well as PDF?",
		answer:
			"Yes — Pro users can export as both PDF and Word (.docx). PDF is recommended for online applications; Word is useful when employers specifically request an editable file.",
	},
	{
		question: "How does the AI writing assistant work?",
		answer:
			"You provide your job title, company, and rough notes. The AI generates achievement-driven bullet points trained on millions of successful resumes. You keep full control — edit, reorder, or regenerate any line.",
	},
	{
		question: "Can I import from LinkedIn?",
		answer:
			"Yes. One authorized connection pulls your full profile — work history, education, skills, and headline — into any template. Our AI restructures and de-jargons the copy automatically.",
	},
	{
		question: "Is my data private?",
		answer:
			"Your resume data is encrypted at rest and in transit. We never sell it, never share it, and never use it to train models. Delete everything anytime.",
	},
	{
		question: "What is your refund policy?",
		answer: "Full refund within 30 days on any paid plan — no questions asked.",
	},
];

export function FAQ() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggle = (index: number) => {
		setOpenIndex((prev) => (prev === index ? null : index));
	};

	return (
		<section id="faq" className="border-lp-surface-border border-b bg-lp-surface-base">
			{/* Section header */}
			<div className="mx-auto max-w-7xl px-5 pt-20 pb-10 sm:px-8">
				<p className="section-label mb-4">FAQ</p>
				<h2
					className="max-w-sm font-bold font-display text-3xl text-lp-ink-900 tracking-tight sm:text-4xl"
					style={{ letterSpacing: "-0.02em" }}
				>
					Common questions.
				</h2>
			</div>

			{/* Two-column layout */}
			<div className="mx-auto grid max-w-7xl gap-12 px-5 pb-20 sm:px-8 lg:grid-cols-[1fr_2fr]">
				{/* Left column */}
				<p className="max-w-xs text-lp-ink-500 text-sm leading-relaxed">
					Can't find what you're looking for?{" "}
					<button
						type="button"
						className="text-lp-signal-600 underline underline-offset-2 transition-colors hover:text-lp-signal-700"
					>
						Chat with us
					</button>
				</p>

				{/* Right column — Accordion */}
				<div className="overflow-hidden rounded-sm border border-lp-surface-border shadow-sm">
					{FAQ_ITEMS.map((item, index) => {
						const isOpen = openIndex === index;
						const panelId = `faq-panel-${index}`;
						const triggerId = `faq-trigger-${index}`;

						return (
							<div
								key={item.question}
								className={`border-lp-surface-border border-b transition-colors duration-150 last:border-b-0 ${
									isOpen ? "bg-lp-surface-muted" : "bg-white"
								}`}
							>
								<button
									type="button"
									id={triggerId}
									onClick={() => toggle(index)}
									aria-expanded={isOpen}
									aria-controls={panelId}
									className="group flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
								>
									<span className="font-medium text-lp-ink-800 text-sm leading-snug transition-colors duration-150 group-hover:text-lp-ink-900">
										{item.question}
									</span>
									{isOpen ? (
										<Minus className="size-4 shrink-0 text-lp-signal-500" weight="bold" />
									) : (
										<Plus
											className="size-4 shrink-0 text-lp-wire-400 transition-colors group-hover:text-lp-ink-700"
											weight="bold"
										/>
									)}
								</button>

								<AnimatePresence initial={false}>
									{isOpen && (
										<m.div
											id={panelId}
											role="region"
											aria-labelledby={triggerId}
											initial={{ height: 0, opacity: 0 }}
											animate={{ height: "auto", opacity: 1 }}
											exit={{ height: 0, opacity: 0 }}
											transition={{ duration: 0.25, ease: "easeInOut" }}
											className="overflow-hidden"
										>
											<p className="px-6 pb-5 text-lp-ink-600 text-sm leading-relaxed">{item.answer}</p>
										</m.div>
									)}
								</AnimatePresence>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
