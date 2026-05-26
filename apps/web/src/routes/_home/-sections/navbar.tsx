import { List, X } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

interface NavLink {
	label: string;
	href: string;
	scroll: boolean;
}

const NAV_LINKS: NavLink[] = [
	{ label: "Features", href: "#features", scroll: true },
	{ label: "Templates", href: "/templates", scroll: false },
	{ label: "Pricing", href: "#pricing", scroll: true },
	{ label: "Blog", href: "/blog", scroll: false },
	{ label: "FAQ", href: "#faq", scroll: true },
];

export function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [drawerOpen, setDrawerOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 32);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	// Lock body scroll when drawer is open
	useEffect(() => {
		if (drawerOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [drawerOpen]);

	const handleAnchorClick = (href: string) => {
		setDrawerOpen(false);
		const target = document.querySelector(href);
		if (target) {
			target.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<>
			<nav
				className={`fixed inset-x-0 top-0 z-50 transition-all duration-200 ${
					scrolled
						? "border-lp-surface-border border-b bg-lp-surface-paper/95 shadow-sm backdrop-blur-md"
						: "border-transparent border-b bg-lp-surface-paper/80 backdrop-blur-sm"
				}`}
				aria-label="Main navigation"
			>
				<div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 sm:px-8">
					{/* Brand Logo */}
					<Link to="/" className="font-[var(--font-display)] font-bold text-lg tracking-tight">
						<span className="text-lp-ink-900">Resume</span>
						<span className="text-lp-signal-500">Hub</span>
						<span className="font-normal text-lp-wire-400 text-sm">.in</span>
					</Link>

					{/* Desktop Nav Links */}
					<div className="hidden items-center gap-7 lg:flex">
						{NAV_LINKS.map((link) =>
							link.scroll ? (
								<button
									key={link.href}
									type="button"
									onClick={() => handleAnchorClick(link.href)}
									className="font-medium text-lp-ink-600 text-sm transition-colors duration-150 hover:text-lp-ink-900"
								>
									{link.label}
								</button>
							) : (
								<Link
									key={link.href}
									to={link.href}
									className="font-medium text-lp-ink-600 text-sm transition-colors duration-150 hover:text-lp-ink-900"
								>
									{link.label}
								</Link>
							),
						)}
					</div>

					{/* Desktop Action Buttons */}
					<div className="hidden items-center gap-3 lg:flex">
						<Link
							to="/auth/login"
							className="px-3 py-1.5 font-medium text-lp-ink-600 text-sm transition-colors duration-150 hover:text-lp-ink-900"
						>
							Sign In
						</Link>
						<Link
							to="/dashboard"
							className="rounded-lg bg-lp-signal-500 px-4 py-2 font-semibold text-sm text-white shadow-sm transition-colors duration-150 hover:bg-lp-signal-600"
						>
							Get Started Free
						</Link>
					</div>

					{/* Mobile Hamburger Button */}
					<button
						type="button"
						onClick={() => setDrawerOpen(!drawerOpen)}
						className="p-2 text-lp-ink-600 transition-colors hover:text-lp-ink-900 lg:hidden"
						aria-label={drawerOpen ? "Close menu" : "Open menu"}
						aria-expanded={drawerOpen}
					>
						{drawerOpen ? <X className="size-5" /> : <List className="size-5" />}
					</button>
				</div>
			</nav>

			{/* Mobile Drawer */}
			{drawerOpen && (
				<div className="fixed inset-0 z-40 lg:hidden">
					{/* Backdrop Overlay */}
					<div className="absolute inset-0 bg-lp-ink-900/40" onClick={() => setDrawerOpen(false)} aria-hidden="true" />

					{/* Drawer Panel */}
					<div className="absolute top-0 right-0 bottom-0 flex w-64 flex-col border-lp-surface-border border-l bg-lp-surface-paper p-6 shadow-xl">
						{/* Drawer Header */}
						<div className="mb-8 flex items-center justify-between">
							<span className="font-[var(--font-display)] font-bold text-lp-ink-900">
								Resume<span className="text-lp-signal-500">Hub</span>
							</span>
							<button
								type="button"
								onClick={() => setDrawerOpen(false)}
								className="text-lp-ink-500 hover:text-lp-ink-900"
								aria-label="Close menu"
							>
								<X className="size-4" />
							</button>
						</div>

						{/* Drawer Nav Links */}
						<nav className="flex flex-1 flex-col gap-0.5" aria-label="Mobile navigation">
							{NAV_LINKS.map((link) =>
								link.scroll ? (
									<button
										key={link.href}
										type="button"
										onClick={() => handleAnchorClick(link.href)}
										className="rounded px-3 py-2.5 text-left font-medium text-lp-ink-700 text-sm transition-all hover:bg-lp-surface-muted hover:text-lp-ink-900"
									>
										{link.label}
									</button>
								) : (
									<Link
										key={link.href}
										to={link.href}
										onClick={() => setDrawerOpen(false)}
										className="rounded px-3 py-2.5 text-left font-medium text-lp-ink-700 text-sm transition-all hover:bg-lp-surface-muted hover:text-lp-ink-900"
									>
										{link.label}
									</Link>
								),
							)}
						</nav>

						{/* Drawer Action Buttons */}
						<div className="space-y-2 border-lp-surface-border border-t pt-4">
							<Link
								to="/auth/login"
								onClick={() => setDrawerOpen(false)}
								className="block w-full rounded-lg py-2.5 text-center font-medium text-lp-ink-700 text-sm transition-colors hover:bg-lp-surface-muted hover:text-lp-ink-900"
							>
								Sign In
							</Link>
							<Link
								to="/dashboard"
								onClick={() => setDrawerOpen(false)}
								className="block w-full rounded-lg bg-lp-signal-500 py-2.5 text-center font-semibold text-sm text-white shadow-sm transition-colors hover:bg-lp-signal-600"
							>
								Get Started Free
							</Link>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
