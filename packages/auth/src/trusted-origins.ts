export function getTrustedOrigins(appUrl: string): string[] {
	const normalizeOrigin = (origin: string): string => origin.replace(/\/$/, "");
	const trustedOrigins = new Set<string>(["http://localhost:3000", "http://127.0.0.1:3000"]);

	const configuredUrl = new URL(appUrl);
	trustedOrigins.add(normalizeOrigin(configuredUrl.origin));

	// Add both http and https variants for the configured domain
	// This handles Cloudflare proxy scenarios where origin headers may vary
	if (configuredUrl.hostname !== "localhost" && configuredUrl.hostname !== "127.0.0.1") {
		const httpVariant = new URL(appUrl);
		httpVariant.protocol = "http:";
		trustedOrigins.add(normalizeOrigin(httpVariant.origin));

		const httpsVariant = new URL(appUrl);
		httpsVariant.protocol = "https:";
		trustedOrigins.add(normalizeOrigin(httpsVariant.origin));

		// Add www subdomain variants
		if (configuredUrl.hostname.startsWith("www.")) {
			const nonWww = new URL(appUrl);
			nonWww.hostname = nonWww.hostname.replace(/^www\./, "");
			trustedOrigins.add(normalizeOrigin(nonWww.origin));
		} else {
			const withWww = new URL(appUrl);
			withWww.hostname = `www.${withWww.hostname}`;
			trustedOrigins.add(normalizeOrigin(withWww.origin));

			const withWwwHttp = new URL(appUrl);
			withWwwHttp.hostname = `www.${withWwwHttp.hostname}`;
			withWwwHttp.protocol = "http:";
			trustedOrigins.add(normalizeOrigin(withWwwHttp.origin));
		}
	}

	if (configuredUrl.hostname === "localhost" || configuredUrl.hostname === "127.0.0.1") {
		const loopbackAlias = configuredUrl.hostname === "localhost" ? "127.0.0.1" : "localhost";
		configuredUrl.hostname = loopbackAlias;
		trustedOrigins.add(normalizeOrigin(configuredUrl.origin));
	}

	return Array.from(trustedOrigins);
}
