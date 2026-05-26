import { createFileRoute } from "@tanstack/react-router";
import { createRootStructuredDataScript, getCanonicalRootUrl } from "@/libs/seo";
import { ATSSpotlight } from "./-sections/ats-spotlight";
import { FAQ } from "./-sections/faq";
import { Features } from "./-sections/features";
import { FinalCTA } from "./-sections/final-cta";
import { Footer } from "./-sections/footer";
import { Hero } from "./-sections/hero";
import { HowItWorks } from "./-sections/how-it-works";
import { Press } from "./-sections/press";
import { Pricing } from "./-sections/pricing";
import { Stats } from "./-sections/stats";
import { TemplatesGallery } from "./-sections/templates-gallery";
import { Testimonials } from "./-sections/testimonials";
import { TrustBar } from "./-sections/trust-bar";

export const Route = createFileRoute("/_home/")({
	component: RouteComponent,
	head: () => {
		const appUrl = typeof window !== "undefined" ? window.location.origin : "https://resumehub.in";
		const canonicalUrl = getCanonicalRootUrl(appUrl);

		return {
			links: [{ rel: "canonical", href: canonicalUrl }],
			scripts: [createRootStructuredDataScript(canonicalUrl)],
		};
	},
});

function RouteComponent() {
	return (
		<main id="main-content" className="relative">
			<Hero />
			<TrustBar />
			<Stats />
			<Features />
			<HowItWorks />
			<ATSSpotlight />
			<TemplatesGallery />
			<Testimonials />
			<Press />
			<Pricing />
			<FAQ />
			<FinalCTA />
			<Footer />
		</main>
	);
}
