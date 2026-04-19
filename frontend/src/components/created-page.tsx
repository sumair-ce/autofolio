"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Copy, ExternalLink, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button, Card, Shell } from "@/components/ui";
import { getShareUrl } from "@/lib/utils";

export function CreatedPage({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const sharePath = getShareUrl(code);

  async function handleCopy() {
    const fullUrl = sharePath.startsWith("/")
      ? `${window.location.origin}${sharePath}`
      : sharePath;
    await navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(125,211,252,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(251,191,36,0.18),_transparent_24%),linear-gradient(180deg,_#fbfffe,_#f8fbff)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(125,211,252,0.08),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(251,191,36,0.08),_transparent_20%),linear-gradient(180deg,_#08111f,_#0f172a)]">
      <div className="flex justify-end px-5 pt-5 sm:px-8">
        <ThemeToggle />
      </div>
      <Shell className="flex min-h-screen items-center py-8">
        <Card className="mx-auto w-full max-w-3xl bg-white/86 p-8 sm:p-10 dark:bg-slate-900/82">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
            <Check className="h-7 w-7" />
          </div>
          <div className="mt-6 space-y-4 text-center">
            <p className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">
              <Sparkles className="h-4 w-4" />
              Portfolio published
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
              Your share code is ready.
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-7 text-slate-700 dark:text-slate-300 sm:text-lg">
              Send the public link anywhere. The portfolio is live now and your backend will render
              the chosen template based on the saved `template_id`.
            </p>
          </div>

          <div className="mt-8 rounded-[30px] border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-slate-950/70">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-600 dark:text-slate-300">
              Share code
            </p>
            <p className="mt-3 text-4xl font-semibold tracking-[0.24em] text-slate-950 dark:text-white">{code}</p>
            <p className="mt-4 break-all text-sm text-slate-600 dark:text-slate-300">{sharePath}</p>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button className="gap-2" onClick={handleCopy}>
              <Copy className="h-4 w-4" />
              {copied ? "Copied" : "Copy public link"}
            </Button>
            <Link href={sharePath}>
              <Button variant="secondary" className="gap-2">
                Open portfolio
                <ExternalLink className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/create">
              <Button variant="ghost">Create another</Button>
            </Link>
          </div>
        </Card>
      </Shell>
    </div>
  );
}
