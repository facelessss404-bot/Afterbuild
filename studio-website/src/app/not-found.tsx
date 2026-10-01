import Link from "next/link";
import { siteConfig } from "@/data/site";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-charcoal flex flex-col items-center justify-center px-6 text-center">
      <p className="text-stone text-[10px] tracking-[0.3em] uppercase font-mono mb-6">
        404 — Page Not Found
      </p>
      <h1 className="font-display text-[clamp(4rem,12vw,10rem)] text-ivory font-normal leading-none mb-6">
        Lost
      </h1>
      <p className="text-stone text-sm max-w-md leading-relaxed mb-10">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back on track.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="px-6 py-3 bg-ivory text-charcoal text-[10px] tracking-[0.2em] uppercase font-mono rounded-full hover:bg-bronze transition-colors"
        >
          Go Home
        </Link>
        <Link
          href="/work"
          className="px-6 py-3 border border-ivory/15 text-ivory/70 text-[10px] tracking-[0.2em] uppercase font-mono rounded-full hover:border-ivory/30 hover:text-ivory transition-all"
        >
          View Work
        </Link>
      </div>
    </div>
  );
}
