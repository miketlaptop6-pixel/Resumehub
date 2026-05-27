// @vitest-environment happy-dom

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Copyright } from "./copyright";

describe("Copyright", () => {
	it("renders the ResumeHub.in brand name", () => {
		render(<Copyright />);
		expect(screen.getByText(/ResumeHub\.in/)).toBeInTheDocument();
	});

	it("renders the tagline", () => {
		render(<Copyright />);
		expect(screen.getByText(/AI-powered resume builder/)).toBeInTheDocument();
	});
});
