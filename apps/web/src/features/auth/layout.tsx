import { Link, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";

export function AuthLayout() {
	// Force light mode on auth pages by temporarily removing the dark class
	useEffect(() => {
		const html = document.documentElement;
		const wasDark = html.classList.contains("dark");
		html.classList.remove("dark");

		return () => {
			if (wasDark) html.classList.add("dark");
		};
	}, []);

	return (
		<div className="flex min-h-svh w-dvw flex-col bg-lp-surface-base">
			{/* Minimal navbar */}
			<header className="flex items-center justify-between px-6 py-4 sm:px-10">
				<Link to="/" className="font-bold font-display text-lp-ink-900 text-xl tracking-tight">
					Resume<span className="text-lp-signal-500">Hub</span>
					<span className="font-normal text-lp-ink-500 text-sm">.in</span>
				</Link>
			</header>

			{/* Auth card */}
			<main className="flex flex-1 items-center justify-center px-4 pb-16">
				<div className="w-full max-w-md rounded-xl border border-lp-surface-border bg-white p-8 shadow-sm sm:p-10">
					<Outlet />
				</div>
			</main>

			{/* Minimal footer */}
			<footer className="border-lp-surface-border border-t px-6 py-4 text-center text-lp-ink-500 text-xs">
				© {new Date().getFullYear()} ResumeHub.in · Free &amp; open-source resume builder
			</footer>
		</div>
	);
}
