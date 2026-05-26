// @vitest-environment happy-dom

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "./footer";

const renderFooter = () => render(<Footer />);

describe("Footer", () => {
	it("renders the brand logo text", () => {
		const { container } = renderFooter();
		const text = container.textContent ?? "";
		expect(text).toContain("ResumeHub");
	});

	it("renders link column headings", () => {
		renderFooter();
		expect(screen.getByText("Product")).toBeInTheDocument();
		expect(screen.getByText("Resources")).toBeInTheDocument();
		expect(screen.getByText("Company")).toBeInTheDocument();
		expect(screen.getByText("Legal")).toBeInTheDocument();
	});

	it("renders copyright with current year", () => {
		const { container } = renderFooter();
		const text = container.textContent ?? "";
		expect(text).toContain("2026 ResumeHub.in");
	});

	it("renders social media icon links", () => {
		renderFooter();
		expect(screen.getByLabelText("Twitter")).toBeInTheDocument();
		expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
		expect(screen.getByLabelText("Instagram")).toBeInTheDocument();
		expect(screen.getByLabelText("YouTube")).toBeInTheDocument();
	});

	it("renders newsletter signup input", () => {
		renderFooter();
		expect(screen.getByLabelText("Email for newsletter")).toBeInTheDocument();
	});
});
