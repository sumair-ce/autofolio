import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BuilderWizard } from "@/components/builder-wizard";
import { SiteHeader } from "@/components/site-header";

export function CreatePageShell() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(240,171,252,0.16),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(125,211,252,0.2),_transparent_26%),linear-gradient(180deg,_#fffdf8,_#f8fbff)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(240,171,252,0.08),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(125,211,252,0.1),_transparent_22%),linear-gradient(180deg,_#08111f,_#0f172a)]">
      <SiteHeader />
      <div className="border-b border-black/5 bg-white/60 dark:border-white/10 dark:bg-slate-950/50">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-5 py-4 text-sm text-slate-700 dark:text-slate-300 sm:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 transition hover:text-slate-950 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <span className="text-slate-300 dark:text-slate-600">/</span>
          <span>Create portfolio</span>
        </div>
      </div>
      <BuilderWizard />
    </div>
  );
}
