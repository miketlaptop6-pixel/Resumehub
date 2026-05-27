import { Check } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_home/templates/")({
  component: TemplatesPage,
});

const categories = ["All", "Professional", "Creative", "Simple", "Executive"];

const templates = [
  { id: "1", name: "Classic Pro", category: "Professional", color: "from-emerald-100 to-emerald-50" },
  { id: "2", name: "Modern Edge", category: "Creative", color: "from-violet-100 to-violet-50" },
  { id: "3", name: "Clean Slate", category: "Simple", color: "from-sky-100 to-sky-50" },
  { id: "4", name: "Executive Suite", category: "Executive", color: "from-amber-100 to-amber-50" },
  { id: "5", name: "Tech Stack", category: "Professional", color: "from-teal-100 to-teal-50" },
  { id: "6", name: "Minimalist", category: "Simple", color: "from-gray-100 to-gray-50" },
  { id: "7", name: "Bold Impact", category: "Creative", color: "from-rose-100 to-rose-50" },
  { id: "8", name: "Corporate", category: "Executive", color: "from-blue-100 to-blue-50" },
  { id: "9", name: "Developer", category: "Professional", color: "from-green-100 to-green-50" },
  { id: "10", name: "Elegant", category: "Creative", color: "from-pink-100 to-pink-50" },
  { id: "11", name: "Starter", category: "Simple", color: "from-orange-100 to-orange-50" },
  { id: "12", name: "Leadership", category: "Executive", color: "from-indigo-100 to-indigo-50" },
];

function TemplatesPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? templates : templates.filter((t) => t.category === active);

  return (
    <main id="main-content" className="bg-lp-surface-base">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-5 pb-12 pt-24 sm:px-8">
        <p className="section-label mb-4">Templates</p>
        <h1
          className="mb-4 max-w-2xl font-display text-4xl font-bold tracking-tight text-lp-ink-900 sm:text-5xl"
          style={{ letterSpacing: "-0.02em" }}
        >
          300+ ATS-safe resume templates
        </h1>
        <p className="mb-10 max-w-xl text-lg leading-relaxed text-lp-ink-500">
          Every template is tested against Workday, Greenhouse, Lever, and Taleo. Pick one, customize it, and download in seconds.
        </p>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-150 ${
                active === cat
                  ? "border-lp-signal-500 bg-lp-signal-500 text-white"
                  : "border-lp-wire-300 bg-white text-lp-ink-600 hover:border-lp-wire-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Template grid */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((template) => (
            <div
              key={template.id}
              className="group overflow-hidden rounded-xl border border-lp-surface-border bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1"
            >
              {/* Preview placeholder */}
              <div className={`aspect-[3/4] bg-gradient-to-b ${template.color} flex items-center justify-center`}>
                <div className="w-3/4 space-y-2 rounded-lg bg-white/80 p-4 shadow-sm backdrop-blur-sm">
                  <div className="h-3 w-2/3 rounded bg-lp-ink-900/20" />
                  <div className="h-2 w-full rounded bg-lp-ink-900/10" />
                  <div className="h-2 w-5/6 rounded bg-lp-ink-900/10" />
                  <div className="mt-3 h-2 w-1/2 rounded bg-lp-signal-500/30" />
                  <div className="h-2 w-full rounded bg-lp-ink-900/10" />
                  <div className="h-2 w-4/5 rounded bg-lp-ink-900/10" />
                </div>
              </div>

              {/* Info */}
              <div className="flex items-center justify-between p-4">
                <div>
                  <h3 className="text-sm font-semibold text-lp-ink-900">{template.name}</h3>
                  <p className="text-xs text-lp-ink-500">{template.category}</p>
                </div>
                <span className="flex items-center gap-1 rounded-full bg-lp-signal-50 px-2 py-0.5 text-[10px] font-medium text-lp-signal-700">
                  <Check size={10} weight="bold" /> ATS
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-lp-surface-border bg-lp-surface-muted">
        <div className="mx-auto max-w-7xl px-5 py-16 text-center sm:px-8">
          <h2 className="mb-4 font-display text-2xl font-bold text-lp-ink-900 sm:text-3xl">
            Ready to build your resume?
          </h2>
          <p className="mb-8 text-lp-ink-500">Pick a template and start customizing in under 5 minutes.</p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg bg-lp-signal-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-lp-signal-600"
          >
            Get Started Free
          </Link>
        </div>
      </section>
    </main>
  );
}
