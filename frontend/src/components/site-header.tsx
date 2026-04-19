import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button, Shell } from "@/components/ui";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-black/5 bg-[color:var(--color-background)]/75 backdrop-blur dark:border-white/10">
      <Shell className="flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3 text-slate-950 dark:text-white">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
            <Sparkles className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-sm font-semibold tracking-[0.24em] text-slate-600 uppercase dark:text-slate-300">
              Instant Share
            </span>
            <span className="block text-lg font-semibold">Portfolio</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-slate-700 dark:text-slate-300 md:flex">
          <a href="#features" className="transition hover:text-slate-950 dark:hover:text-white">
            Features
          </a>
          <a href="#templates" className="transition hover:text-slate-950 dark:hover:text-white">
            Templates
          </a>
          <a href="#workflow" className="transition hover:text-slate-950 dark:hover:text-white">
            Workflow
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/create">
            <Button className="gap-2">
              Start building
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Shell>
    </header>
  );
}
