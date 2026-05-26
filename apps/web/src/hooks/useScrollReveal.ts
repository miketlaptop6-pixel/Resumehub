import { useInView } from "motion/react";
import { useRef } from "react";

export interface UseScrollRevealOptions {
	/** IntersectionObserver threshold / amount visible (default: 0.1) */
	threshold?: number;
	/** Trigger only once (default: true) */
	once?: boolean;
	/** Delay in ms before reporting as in-view (default: 0) */
	delay?: number;
}

export interface UseScrollRevealReturn<T extends HTMLElement = HTMLElement> {
	ref: React.RefObject<T | null>;
	isInView: boolean;
}

/**
 * Hook that detects when an element enters the viewport using motion/react's useInView.
 * Returns a ref to attach to the target element and a boolean indicating visibility.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(
	options: UseScrollRevealOptions = {},
): UseScrollRevealReturn<T> {
	const { threshold = 0.1, once = true } = options;
	const ref = useRef<T>(null);

	const isInView = useInView(ref, {
		amount: threshold,
		once,
	});

	return { ref, isInView };
}
