import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_home/pricing/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_home/pricing/"!</div>;
}
