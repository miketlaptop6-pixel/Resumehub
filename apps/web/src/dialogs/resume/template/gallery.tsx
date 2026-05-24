import type { Template } from "@reactive-resume/schema/templates";
import type { DialogProps } from "@/dialogs/store";
import type { TemplateMetadata } from "./data";
import { useLingui } from "@lingui/react";
import { Trans } from "@lingui/react/macro";
import { SlideshowIcon, LockSimpleIcon } from "@phosphor-icons/react";
import { Badge } from "@reactive-resume/ui/components/badge";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@reactive-resume/ui/components/dialog";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@reactive-resume/ui/components/hover-card";
import { ScrollArea } from "@reactive-resume/ui/components/scroll-area";
import { cn } from "@reactive-resume/utils/style";
import { toast } from "sonner";
import { PRO_TEMPLATES } from "@reactive-resume/schema/template-tiers";
import { CometCard } from "@/components/animation/comet-card";
import { useDialogStore } from "@/dialogs/store";
import { useCurrentResume, useUpdateResumeData } from "@/features/resume/builder/draft";
import { authClient } from "@/libs/auth/client";
import { templates } from "./data";

function isProTemplate(template: string): boolean {
	return (PRO_TEMPLATES as readonly string[]).includes(template);
}

export function TemplateGalleryDialog(_: DialogProps<"resume.template.gallery">) {
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const resume = useCurrentResume();
	const selectedTemplate = resume.data.metadata.template;
	const updateResumeData = useUpdateResumeData();
	const { data: session } = authClient.useSession();

	const userRole = session?.user?.role ?? "free";
	const isFreeUser = userRole === "free" || userRole === "user" || !userRole;

	function onSelectTemplate(template: Template) {
		if (isFreeUser && isProTemplate(template)) {
			toast.error("Upgrade to Pro to use this template");
			return;
		}

		updateResumeData((draft) => {
			draft.metadata.template = template;
		});

		closeDialog();
	}

	return (
		<DialogContent className="lg:max-w-5xl">
			<DialogHeader className="gap-2">
				<DialogTitle className="flex items-center gap-3 text-xl">
					<SlideshowIcon size={20} />
					<Trans>Template Gallery</Trans>
				</DialogTitle>
				<DialogDescription className="leading-relaxed">
					<Trans>
						Here's a range of resume templates for different professions and personalities. Whether you prefer modern or
						classic, bold or simple, there is a design to match you. Look through the options below and choose a
						template that fits your style.
					</Trans>
				</DialogDescription>
			</DialogHeader>

			<ScrollArea className="max-h-[80svh] pb-8">
				<div className="grid grid-cols-2 gap-6 p-4 md:grid-cols-3 lg:grid-cols-4">
					{Object.entries(templates).map(([template, metadata]) => (
						<TemplateCard
							key={template}
							metadata={metadata}
							id={template as Template}
							isActive={template === selectedTemplate}
							isPro={isProTemplate(template)}
							isFreeUser={isFreeUser}
							onSelect={onSelectTemplate}
						/>
					))}
				</div>
			</ScrollArea>
		</DialogContent>
	);
}

type TemplateCardProps = {
	id: Template;
	isActive?: boolean;
	isPro?: boolean;
	isFreeUser?: boolean;
	metadata: TemplateMetadata;
	onSelect: (template: Template) => void;
};

function TemplateCard({ id, metadata, isActive, isPro, isFreeUser, onSelect }: TemplateCardProps) {
	const { i18n } = useLingui();

	return (
		<HoverCard>
			<CometCard translateDepth={3} rotateDepth={6} glareOpacity={0}>
				<HoverCardTrigger
					render={
						<button
							type="button"
							tabIndex={-1}
							onClick={() => onSelect(id)}
							className={cn(
								"relative block aspect-page size-full cursor-pointer overflow-hidden rounded-md bg-popover outline-none",
								isActive && "ring-2 ring-ring ring-offset-4 ring-offset-background",
							)}
						>
							<img src={metadata.imageUrl} alt={metadata.name} className="size-full object-cover" />

							{/* PRO badge overlay */}
							{isPro && (
								<div className="absolute top-2 right-2 flex items-center gap-1 rounded-sm bg-amber-500/90 px-1.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
									<LockSimpleIcon size={10} weight="bold" />
									PRO
								</div>
							)}
						</button>
					}
				/>

				<div className="flex items-center justify-center gap-1.5">
					<span className="font-bold leading-loose tracking-tight">{metadata.name}</span>
					{isPro && (
						<span className="rounded-sm bg-amber-500/90 px-1 py-0.5 text-[9px] font-bold text-white">PRO</span>
					)}
				</div>

				<HoverCardContent
					side="right"
					sideOffset={-32}
					align="start"
					alignOffset={32}
					className="pointer-events-none! flex w-80 flex-col justify-between gap-y-6 rounded-md bg-background/80 p-4 pb-6"
				>
					<div className="space-y-1">
						<h3 className="font-semibold text-lg">{metadata.name}</h3>
						<p className="text-muted-foreground">{i18n.t(metadata.description)}</p>
					</div>

					{metadata.tags.length > 0 && (
						<div className="flex flex-wrap gap-2">
							{isPro && (
								<Badge variant="default" className="bg-amber-500 text-white">
									Pro
								</Badge>
							)}
							{metadata.tags
								.sort((a, b) => a.localeCompare(b))
								.map((tag) => (
									<Badge key={tag} variant="default">
										{tag}
									</Badge>
								))}
						</div>
					)}
				</HoverCardContent>
			</CometCard>
		</HoverCard>
	);
}
