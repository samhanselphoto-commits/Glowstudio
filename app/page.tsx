import Image from "next/image";
import Link from "next/link";

const navItems = [
  { label: "Image", href: "#" },
  { label: "Video", href: "#" },
  { label: "Motion", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Docs", href: "#" },
];

const studioDemos = [
  {
    src: "/hero/studio-1.png",
    title: "Product",
    desc: "Cinematic studio lighting, photoreal materials.",
  },
  {
    src: "/hero/studio-2.png",
    title: "Abstract",
    desc: "Flowing forms, refined motion language.",
  },
  {
    src: "/hero/studio-3.png",
    title: "Geometric",
    desc: "Sharp edges, precious metals, deep blacks.",
  },
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Ambient glow */}
      <div className="glow-ambient pointer-events-none absolute inset-0" />

      {/* NavBar */}
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md border border-[color:var(--border-strong)] bg-[color:var(--bg-glass)]">
            <span className="text-sm font-semibold text-[color:var(--text-primary)]">
              G
            </span>
          </div>
          <span className="text-sm font-medium tracking-tight text-[color:var(--text-primary)]">
            Glowstudio
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-sm text-[color:var(--text-secondary)] transition-colors hover:bg-[color:var(--bg-glass)] hover:text-[color:var(--text-primary)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="#"
            className="hidden rounded-md px-3 py-1.5 text-sm text-[color:var(--text-secondary)] transition-colors hover:text-[color:var(--text-primary)] md:inline-block"
          >
            Sign in
          </Link>
          <Link
            href="#"
            className="rounded-md border border-[color:var(--border-strong)] bg-[color:var(--bg-glass-strong)] px-3.5 py-1.5 text-sm font-medium text-[color:var(--text-primary)] backdrop-blur-md transition-colors hover:bg-[color:var(--bg-glass-strong)]"
          >
            Open studio
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-20 md:pt-20 md:pb-28">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--text-tertiary)]">
              Frontier creative studio
            </p>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.05] tracking-tight text-[color:var(--text-primary)] sm:text-6xl lg:text-7xl">
              Design at the
              <br />
              speed of thought.
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-[color:var(--text-secondary)]">
              Image, video, and motion in one quiet canvas. Built for studios
              that ship every day.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <Link
                href="#"
                className="rounded-md bg-[color:var(--accent-silver)] px-5 py-2.5 text-sm font-medium text-[color:var(--bg-base)] transition-opacity hover:opacity-90"
              >
                Start creating
              </Link>
              <Link
                href="#"
                className="rounded-md border border-[color:var(--border-strong)] bg-[color:var(--bg-glass)] px-5 py-2.5 text-sm font-medium text-[color:var(--text-primary)] backdrop-blur-md transition-colors hover:bg-[color:var(--bg-glass-strong)]"
              >
                View pricing
              </Link>
            </div>
          </div>

          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--bg-elevated)]">
            <Image
              src="/hero/hero-1.png"
              alt="Hero visual"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div
              className="absolute inset-0 -z-10"
              style={{
                background:
                  "radial-gradient(ellipse at 70% 30%, rgba(255,255,255,0.06), transparent 60%)",
              }}
            />
          </div>
        </div>
      </section>

      {/* Studio showcase */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-32">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--text-tertiary)]">
              Studio
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[color:var(--text-primary)] sm:text-4xl">
              Three languages.
              <br />
              One canvas.
            </h2>
          </div>
          <Link
            href="#"
            className="hidden text-sm text-[color:var(--text-secondary)] transition-colors hover:text-[color:var(--text-primary)] md:inline-block"
          >
            Explore the studio →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {studioDemos.map((demo) => (
            <div
              key={demo.title}
              className="group relative overflow-hidden rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--bg-elevated)]"
            >
              <div className="relative aspect-square w-full">
                <Image
                  src={demo.src}
                  alt={demo.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="flex items-start justify-between p-5">
                <div>
                  <h3 className="text-sm font-medium text-[color:var(--text-primary)]">
                    {demo.title}
                  </h3>
                  <p className="mt-1 text-xs text-[color:var(--text-tertiary)]">
                    {demo.desc}
                  </p>
                </div>
                <span className="text-[color:var(--text-tertiary)] transition-colors group-hover:text-[color:var(--text-primary)]">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
