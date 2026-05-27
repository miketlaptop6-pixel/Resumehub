import { ArrowRight } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_home/blog/")({
  component: BlogPage,
});

const posts = [
  {
    id: "1",
    title: "How to Write a Resume That Gets Past ATS in 2026",
    excerpt: "97% of Fortune 500 companies use ATS. Here's how to make sure your resume doesn't get filtered out before a human ever sees it.",
    category: "Resume Tips",
    date: "May 20, 2026",
    readTime: "8 min read",
    color: "from-emerald-100 to-emerald-50",
  },
  {
    id: "2",
    title: "10 Action Verbs That Make Your Resume Stand Out",
    excerpt: "Replace weak verbs like 'responsible for' with powerful alternatives that showcase your impact and achievements.",
    category: "Writing",
    date: "May 15, 2026",
    readTime: "5 min read",
    color: "from-violet-100 to-violet-50",
  },
  {
    id: "3",
    title: "The Perfect Resume Format for 2026: A Complete Guide",
    excerpt: "Chronological, functional, or hybrid? We break down which format works best for your career stage and industry.",
    category: "Guides",
    date: "May 10, 2026",
    readTime: "12 min read",
    color: "from-sky-100 to-sky-50",
  },
  {
    id: "4",
    title: "How to Quantify Achievements on Your Resume",
    excerpt: "Numbers speak louder than words. Learn how to turn vague responsibilities into impressive, measurable accomplishments.",
    category: "Resume Tips",
    date: "May 5, 2026",
    readTime: "6 min read",
    color: "from-amber-100 to-amber-50",
  },
  {
    id: "5",
    title: "Resume Mistakes That Cost You the Interview",
    excerpt: "Hiring managers spend 7 seconds on your resume. Don't waste them with these common mistakes that instantly disqualify candidates.",
    category: "Career",
    date: "Apr 28, 2026",
    readTime: "7 min read",
    color: "from-rose-100 to-rose-50",
  },
  {
    id: "6",
    title: "AI in Job Search: How to Use It Without Getting Caught",
    excerpt: "AI tools can supercharge your job search, but recruiters are getting better at spotting AI-generated content. Here's the balance.",
    category: "AI & Tech",
    date: "Apr 22, 2026",
    readTime: "9 min read",
    color: "from-teal-100 to-teal-50",
  },
];

function BlogPage() {
  return (
    <main id="main-content" className="bg-lp-surface-base">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-5 pb-12 pt-24 sm:px-8">
        <p className="section-label mb-4">Blog</p>
        <h1
          className="mb-4 max-w-2xl font-display text-4xl font-bold tracking-tight text-lp-ink-900 sm:text-5xl"
          style={{ letterSpacing: "-0.02em" }}
        >
          Career tips & resume advice
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-lp-ink-500">
          Expert guides on resume writing, job searching, and career growth from the ResumeHub team.
        </p>
      </section>

      {/* Blog grid */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group overflow-hidden rounded-xl border border-lp-surface-border bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1"
            >
              {/* Image placeholder */}
              <div className={`aspect-[16/9] bg-gradient-to-br ${post.color} flex items-end p-5`}>
                <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-lp-ink-700 backdrop-blur-sm">
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="mb-3 flex items-center gap-2 text-xs text-lp-ink-500">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="mb-2 text-base font-semibold leading-snug text-lp-ink-900 transition-colors group-hover:text-lp-signal-600">
                  {post.title}
                </h2>
                <p className="mb-4 text-sm leading-relaxed text-lp-ink-500 line-clamp-2">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-lp-signal-600 transition-colors group-hover:text-lp-signal-700">
                  Read more <ArrowRight size={12} weight="bold" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="border-t border-lp-surface-border bg-lp-surface-muted">
        <div className="mx-auto max-w-7xl px-5 py-16 text-center sm:px-8">
          <h2 className="mb-4 font-display text-2xl font-bold text-lp-ink-900 sm:text-3xl">
            Get career tips in your inbox
          </h2>
          <p className="mb-8 text-lp-ink-500">Weekly resume tips, job search strategies, and career advice. No spam.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg bg-lp-signal-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-lp-signal-600"
          >
            Subscribe to Newsletter
          </Link>
        </div>
      </section>
    </main>
  );
}
