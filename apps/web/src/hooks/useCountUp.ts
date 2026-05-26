import { useEffect, useRef, useState } from "react";

/** easeOutCubic: decelerating curve */
const easeOutCubic = (t: number): number => 1 - (1 - t) ** 3;

export interface CountUpOptions {
	/** Animation duration in ms (default: 1800) */
	duration?: number;
	/** IntersectionObserver threshold (default: 0.4) */
	threshold?: number;
	/** Easing function (default: easeOutCubic) */
	easing?: (t: number) => number;
}

export interface CountUpReturn {
	ref: React.RefObject<HTMLSpanElement | null>;
	/** Current animated value (integer) */
	value: number;
}

/**
 * Hook that animates a number from 0 to `target` using requestAnimationFrame.
 * Animation triggers once when the element enters the viewport.
 */
export function useCountUp(target: number, options: CountUpOptions = {}): CountUpReturn {
	const { duration = 1800, threshold = 0.4, easing = easeOutCubic } = options;

	const ref = useRef<HTMLSpanElement>(null);
	const [value, setValue] = useState(0);
	const started = useRef(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !started.current) {
					started.current = true;
					observer.unobserve(el);

					const startTime = performance.now();

					const tick = (now: number) => {
						const elapsed = now - startTime;
						const progress = Math.min(elapsed / duration, 1);
						const eased = easing(progress);
						const current = Math.floor(eased * target);

						setValue(current);

						if (progress < 1) {
							requestAnimationFrame(tick);
						} else {
							// Ensure we land exactly on target
							setValue(target);
						}
					};

					requestAnimationFrame(tick);
				}
			},
			{ threshold },
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, [target, duration, threshold, easing]);

	return { ref, value };
}
