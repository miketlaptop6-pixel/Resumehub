import { cn } from "@reactive-resume/utils/style";

type Props = React.ComponentProps<"div">;

export function Copyright({ className, ...props }: Props) {
	return (
		<div className={cn("text-muted-foreground/80 text-xs leading-relaxed", className)} {...props}>
			<p>© {new Date().getFullYear()} ResumeHub.in</p>
			<p>AI-powered resume builder. Built in India.</p>
		</div>
	);
}
