export function getTrustedOrigins(appUrl: string): string[] {
	const normalizeOrigin = (origin: string): string => origin.replace(/\/$/, "");
	const trustedOrigins = new Set<string>(["http://localhost:3000", "http://127.0.0.1:3000"]);

	const configuredUrl = new URL(appUrl);
	trustedOrigins.add(normalizeOrigin(configuredUrl.origin));

	// Add www subdomain variant for production domains
	if (configuredUrl.hostname !== "localhost" && configuredUrl.hostname !== "127.0.0.1") {
		if (configuredUrl.hostname.startsWith("www.")) {
			const nonWww = new URL(appUrl);
			nonWww.hostname = nonWww.hostname.replace(/^www\./, "");
			trustedOrigins.add(normalizeOrigin(nonWww.origin));
		} else {
			const withWww = new URL(appUrl);
			withWww.hostname = `www.${withWww.hostname}`;
			trustedOrigins.add(normalizeOrigin(withWww.origin));
		}
	}

	if (configuredUrl.hostname === "localhost" || configuredUrl.hostname === "127.0.0.1") {
		const loopbackAlias = configuredUrl.hostname === "localhost" ? "127.0.0.1" : "localhost";
		configuredUrl.hostname = loopbackAlias;
		trustedOrigins.add(normalizeOrigin(configuredUrl.origin));
	}

	return Array.from(trustedOrigins);
}
