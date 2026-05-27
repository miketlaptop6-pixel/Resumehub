import { Trans } from "@lingui/react/macro";
import { RocketIcon } from "@phosphor-icons/react";
import { Button } from "@reactive-resume/ui/components/button";
import { SectionBase } from "../shared/section-base";

export function InformationSectionBuilder() {
	return (
		<SectionBase type="information" className="space-y-4">
			<div className="space-y-2 rounded-md border bg-emerald-600 p-5 text-white dark:bg-emerald-700">
				<h4 className="font-medium tracking-tight">
					<Trans>Tips for a great resume</Trans>
				</h4>

				<div className="space-y-2 text-xs leading-normal">
					<p>
						<Trans>
							Use action verbs, quantify achievements, and tailor your resume to each job. Our AI assistant can help
							you write compelling bullet points.
						</Trans>
					</p>
				</div>

				<Button
					size="sm"
					variant="default"
					nativeButton={false}
					className="mt-2 whitespace-normal px-4! text-xs"
					render={
						<a href="https://resumehub.in/blog" target="_blank" rel="noopener">
							<RocketIcon />
							<span className="truncate">
								<Trans>Resume Tips</Trans>
							</span>
						</a>
					}
				/>
			</div>

			<div className="flex flex-wrap gap-0.5">
				<Button
					size="sm"
					variant="link"
					className="text-xs"
					nativeButton={false}
					render={
						<a href="https://resumehub.in/blog" target="_blank" rel="noopener">
							<Trans>Career Blog</Trans>
						</a>
					}
				/>

				<Button
					size="sm"
					variant="link"
					className="text-xs"
					nativeButton={false}
					render={
						<a href="https://resumehub.in/templates" target="_blank" rel="noopener">
							<Trans>Templates</Trans>
						</a>
					}
				/>

				<Button
					size="sm"
					variant="link"
					className="text-xs"
					nativeButton={false}
					render={
						<a href="mailto:support@resumehub.in">
							<Trans>Contact Support</Trans>
						</a>
					}
				/>
			</div>
		</SectionBase>
	);
}
