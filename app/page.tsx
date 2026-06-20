import Image from "next/image";
import Link from "next/link";

/* ---------- Icons (inline SVG, no extra deps) ---------- */
type IconProps = { className?: string };

const I = {
  home: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <path d="M3 10.5 12 3l9 7.5V21H3v-10.5Z" />
      <path d="M9 21v-7h6v7" />
    </svg>
  ),
  slots: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <line x1="7" y1="9" x2="7" y2="9" /><line x1="12" y1="9" x2="12" y2="9" /><line x1="17" y1="9" x2="17" y2="9" />
      <line x1="7" y1="13" x2="7" y2="13" /><line x1="17" y1="13" x2="17" y2="13" />
      <line x1="7" y1="17" x2="7" y2="17" /><line x1="12" y1="17" x2="12" y2="17" /><line x1="17" y1="17" x2="17" y2="17" />
    </svg>
  ),
  dice: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <circle cx="8" cy="8" r="0.8" fill="currentColor" /><circle cx="16" cy="16" r="0.8" fill="currentColor" />
      <circle cx="16" cy="8" r="0.8" fill="currentColor" /><circle cx="8" cy="16" r="0.8" fill="currentColor" />
      <circle cx="12" cy="12" r="0.8" fill="currentColor" />
    </svg>
  ),
  crash: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <path d="M3 20 9 12l4 4 8-10" />
      <path d="M14 4h7v7" />
    </svg>
  ),
  roulette: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="2" />
      <line x1="12" y1="3" x2="12" y2="10" /><line x1="12" y1="14" x2="12" y2="21" />
      <line x1="3" y1="12" x2="10" y2="12" /><line x1="14" y1="12" x2="21" y2="12" />
      <line x1="5.6" y1="5.6" x2="10.5" y2="10.5" /><line x1="13.5" y1="13.5" x2="18.4" y2="18.4" />
      <line x1="18.4" y1="5.6" x2="13.5" y2="10.5" /><line x1="10.5" y1="13.5" x2="5.6" y2="18.4" />
    </svg>
  ),
  coin: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10M9 10c0-1.1 1.3-2 3-2s3 .9 3 2-1.3 2-3 2-3 .9-3 2 1.3 2 3 2 3-.9 3-2" />
    </svg>
  ),
  vip: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <path d="M3 8 12 3l9 5-9 5-9-5Z" />
      <path d="M3 13l9 5 9-5" />
      <path d="M3 18l9 5 9-5" />
    </svg>
  ),
  gift: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <rect x="3" y="9" width="18" height="11" rx="1.5" />
      <path d="M3 13h18M12 9v11" />
      <path d="M12 9c-1.5-3-5-3-5 0 0 1.5 1.5 2 5 0ZM12 9c1.5-3 5-3 5 0 0 1.5-1.5 2-5 0" />
    </svg>
  ),
  chat: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <path d="M21 12a8 8 0 0 1-11.5 7.2L3 21l1.8-6.5A8 8 0 1 1 21 12Z" />
    </svg>
  ),
  support: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 1 1 4 2c-.7.5-1.5 1-1.5 2" />
      <circle cx="12" cy="16.5" r="0.6" fill="currentColor" />
    </svg>
  ),
  search: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  ),
  bell: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <path d="M6 8a6 6 0 1 1 12 0c0 4 1.5 6 2 7H4c.5-1 2-3 2-7Z" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </svg>
  ),
  arrowUp: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <path d="M12 19V5M6 11l6-6 6 6" />
    </svg>
  ),
  arrowDown: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  ),
  chevronDown: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
};

/* ---------- Data ---------- */
const sidebarItems = [
  { label: "Home", icon: I.home, href: "#", active: true },
  { label: "Slots", icon: I.slots, href: "#" },
  { label: "Dice", icon: I.dice, href: "#" },
  { label: "Crash", icon: I.crash, href: "#" },
  { label: "Roulette", icon: I.roulette, href: "#" },
  { label: "Coin flip", icon: I.coin, href: "#" },
  { label: "VIP", icon: I.vip, href: "#" },
  { label: "Affiliate", icon: I.gift, href: "#" },
  { label: "Chat", icon: I.chat, href: "#" },
  { label: "Support", icon: I.support, href: "#" },
];

const liveBets = [
  { game: "Dice", user: "Mikołaj G.", time: "00:12", bet: "0.0240", multiplier: "2.10×", payout: "0.0504", up: true },
  { game: "Crash", user: "eth_whale", time: "00:08", bet: "1.2500", multiplier: "1.84×", payout: "2.3000", up: true },
  { game: "Roulette", user: "lucky_777", time: "00:05", bet: "0.5000", multiplier: "—", payout: "0.0000", up: false },
  { game: "Slots", user: "neon_pulse", time: "00:03", bet: "0.1000", multiplier: "12.40×", payout: "1.2400", up: true },
  { game: "Coin flip", user: "satoshi_99", time: "00:02", bet: "0.0500", multiplier: "1.96×", payout: "0.0980", up: true },
  { game: "Dice", user: "raven_x", time: "00:01", bet: "0.2000", multiplier: "—", payout: "0.0000", up: false },
];

const games = [
  { src: "hero/game-slots.png", title: "Lucky 7s", category: "Slots", popular: true },
  { src: "hero/game-roulette.png", title: "Royal Roulette", category: "Live", popular: true },
  { src: "hero/game-dice.png", title: "High Roller Dice", category: "Dice", popular: false },
  { src: "hero/game-cards.png", title: "Blackjack Pro", category: "Cards", popular: true },
  { src: "hero/game-coin.png", title: "Gold Flip", category: "Coin flip", popular: false },
  { src: "hero/game-chip.png", title: "Stack Attack", category: "Casino", popular: false },
];

const chatMessages = [
  { user: "Mikołaj G.", msg: "Just hit 12.4× on slots 🎰", color: "#fbbf24", time: "2s" },
  { user: "eth_whale", msg: "Crash @ 1.84 — easy", color: "#60a5fa", time: "14s" },
  { user: "lucky_777", msg: "Ruletka ruletka 🇵🇱", color: "#a78bfa", time: "32s" },
  { user: "neon_pulse", msg: "gg everyone", color: "#34d399", time: "1m" },
  { user: "satoshi_99", msg: "flipping 0.05", color: "#f472b6", time: "2m" },
];

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen">
      <div className="glow-ambient pointer-events-none fixed inset-0" />

      {/* ---------- Sidebar ---------- */}
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-[color:var(--border-subtle)] bg-[color:var(--bg-elevated)]/60 backdrop-blur-xl md:flex">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 px-5 py-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[color:var(--border-strong)] bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 shadow-lg shadow-amber-500/20">
            <span className="text-sm font-bold text-black">G</span>
          </div>
          <span className="text-sm font-semibold tracking-tight text-[color:var(--text-primary)]">
            Glowstudio
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-2">
          <ul className="space-y-0.5">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors " +
                      (item.active
                        ? "bg-[color:var(--bg-glass-strong)] text-[color:var(--text-primary)]"
                        : "text-[color:var(--text-secondary)] hover:bg-[color:var(--bg-glass)] hover:text-[color:var(--text-primary)]")
                    }
                  >
                    <Icon className="h-[18px] w-[18px]" />
                    {item.label}
                    {item.label === "VIP" && (
                      <span className="ml-auto rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-medium text-amber-300">
                        PRO
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User */}
        <div className="border-t border-[color:var(--border-subtle)] p-3">
          <button className="flex w-full items-center gap-3 rounded-lg p-2 transition-colors hover:bg-[color:var(--bg-glass)]">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold text-black"
              style={{ background: "linear-gradient(135deg,#fbbf24,#f59e0b)" }}
            >
              MG
            </div>
            <div className="flex-1 overflow-hidden text-left">
              <div className="truncate text-sm font-medium text-[color:var(--text-primary)]">
                Mikołaj G.
              </div>
              <div className="truncate text-xs text-[color:var(--text-tertiary)]">
                ₿ 0.0421
              </div>
            </div>
            <I.chevronDown className="h-4 w-4 text-[color:var(--text-tertiary)]" />
          </button>
        </div>
      </aside>

      {/* ---------- Main ---------- */}
      <main className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-[color:var(--border-subtle)] bg-[color:var(--bg-base)]/70 px-6 py-3.5 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md border border-[color:var(--border-strong)] bg-[color:var(--bg-glass)] md:hidden">
              <span className="text-sm font-semibold text-[color:var(--text-primary)]">G</span>
            </div>
            <div className="relative">
              <I.search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--text-tertiary)]" />
              <input
                type="text"
                placeholder="Search games, users…"
                className="w-64 rounded-md border border-[color:var(--border-subtle)] bg-[color:var(--bg-elevated)] py-1.5 pl-9 pr-3 text-sm text-[color:var(--text-primary)] placeholder-[color:var(--text-tertiary)] outline-none focus:border-[color:var(--border-strong)] md:w-80"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-md border border-[color:var(--border-subtle)] bg-[color:var(--bg-elevated)] px-3 py-1.5 text-sm sm:flex">
              <span className="text-[color:var(--text-tertiary)]">Balance</span>
              <span className="font-medium text-[color:var(--text-primary)]">₿ 0.0421</span>
              <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-medium text-emerald-300">+12.4%</span>
            </div>
            <button className="flex h-9 w-9 items-center justify-center rounded-md border border-[color:var(--border-subtle)] bg-[color:var(--bg-elevated)] text-[color:var(--text-secondary)] transition-colors hover:text-[color:var(--text-primary)]">
              <I.bell className="h-4 w-4" />
            </button>
            <button className="rounded-md bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 px-4 py-1.5 text-sm font-semibold text-black shadow-lg shadow-amber-500/20 transition-opacity hover:opacity-90">
              Deposit
            </button>
          </div>
        </header>

        {/* Hero */}
        <section className="mx-auto max-w-7xl px-6 pt-8 pb-12">
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs text-amber-200">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                Live · 1,284 players online
              </div>
              <h1 className="mt-5 text-5xl font-semibold leading-[1.05] tracking-tight text-[color:var(--text-primary)] sm:text-6xl">
                Win on every
                <br />
                <span className="bg-gradient-to-r from-amber-200 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                  spin.
                </span>
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-[color:var(--text-secondary)]">
                Provably fair games, instant payouts, no KYC for small wins. Slots, dice, crash, roulette — all in one quiet room.
              </p>
              <div className="mt-7 flex items-center gap-3">
                <Link
                  href="#"
                  className="rounded-md bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 px-5 py-2.5 text-sm font-semibold text-black shadow-lg shadow-amber-500/20 transition-opacity hover:opacity-90"
                >
                  Play now
                </Link>
                <Link
                  href="#"
                  className="rounded-md border border-[color:var(--border-strong)] bg-[color:var(--bg-glass)] px-5 py-2.5 text-sm font-medium text-[color:var(--text-primary)] backdrop-blur-md transition-colors hover:bg-[color:var(--bg-glass-strong)]"
                >
                  All games
                </Link>
              </div>

              <div className="mt-8 flex items-center gap-6 text-xs text-[color:var(--text-tertiary)]">
                <div>
                  <div className="text-lg font-semibold text-[color:var(--text-primary)]">$24.8M</div>
                  wagered today
                </div>
                <div className="h-8 w-px bg-[color:var(--border-subtle)]" />
                <div>
                  <div className="text-lg font-semibold text-[color:var(--text-primary)]">98.4%</div>
                  RTP
                </div>
                <div className="h-8 w-px bg-[color:var(--border-subtle)]" />
                <div>
                  <div className="text-lg font-semibold text-[color:var(--text-primary)]">~3s</div>
                  avg payout
                </div>
              </div>
            </div>

            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--bg-elevated)]">
              <Image
                src="hero/casino-hero.png"
                alt="Casino hero"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>
        </section>

        {/* Live bets table */}
        <section className="mx-auto max-w-7xl px-6 pb-12">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--text-tertiary)]">Live</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[color:var(--text-primary)]">All bets</h2>
            </div>
            <Link href="#" className="text-sm text-[color:var(--text-secondary)] transition-colors hover:text-[color:var(--text-primary)]">
              See all →
            </Link>
          </div>

          <div className="overflow-hidden rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--bg-elevated)]">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-[color:var(--border-subtle)] text-xs uppercase tracking-wider text-[color:var(--text-tertiary)]">
                <tr>
                  <th className="px-5 py-3 font-medium">Game</th>
                  <th className="px-5 py-3 font-medium">User</th>
                  <th className="px-5 py-3 font-medium">Time</th>
                  <th className="px-5 py-3 font-medium text-right">Bet</th>
                  <th className="px-5 py-3 font-medium text-right">Multiplier</th>
                  <th className="px-5 py-3 font-medium text-right">Payout</th>
                </tr>
              </thead>
              <tbody>
                {liveBets.map((b, i) => (
                  <tr
                    key={i}
                    className="border-b border-[color:var(--border-subtle)]/50 transition-colors last:border-0 hover:bg-[color:var(--bg-glass)]"
                  >
                    <td className="px-5 py-3.5">
                      <span className="rounded-md border border-[color:var(--border-subtle)] bg-[color:var(--bg-glass)] px-2 py-0.5 text-xs text-[color:var(--text-primary)]">
                        {b.game}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="h-7 w-7 rounded-full text-[10px] font-semibold text-black"
                          style={{
                            background: `linear-gradient(135deg, ${["#fbbf24", "#60a5fa", "#a78bfa", "#34d399", "#f472b6", "#fb923c"][i % 6]}, #000)`,
                          }}
                        />
                        <span className="text-[color:var(--text-primary)]">{b.user}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-[color:var(--text-tertiary)]">{b.time}</td>
                    <td className="px-5 py-3.5 text-right font-mono text-[color:var(--text-secondary)]">₿ {b.bet}</td>
                    <td className="px-5 py-3.5 text-right">
                      <span className={"inline-flex items-center gap-1 font-mono " + (b.up ? "text-emerald-400" : "text-rose-400")}>
                        {b.up ? <I.arrowUp className="h-3 w-3" /> : <I.arrowDown className="h-3 w-3" />}
                        {b.multiplier}
                      </span>
                    </td>
                    <td className={"px-5 py-3.5 text-right font-mono " + (b.up ? "text-emerald-400" : "text-[color:var(--text-tertiary)]")}>
                      ₿ {b.payout}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Popular games */}
        <section className="mx-auto max-w-7xl px-6 pb-12">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--text-tertiary)]">Casino</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[color:var(--text-primary)]">Popular games</h2>
            </div>
            <Link href="#" className="text-sm text-[color:var(--text-secondary)] transition-colors hover:text-[color:var(--text-primary)]">
              All games →
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {games.map((g) => (
              <Link
                key={g.title}
                href="#"
                className="group relative overflow-hidden rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--bg-elevated)] transition-all hover:border-[color:var(--border-strong)] hover:shadow-2xl hover:shadow-amber-500/5"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={g.src}
                    alt={g.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {g.popular && (
                    <span className="absolute left-3 top-3 rounded-full bg-amber-500/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-black">
                      Popular
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between p-4">
                  <div>
                    <h3 className="text-sm font-medium text-[color:var(--text-primary)]">{g.title}</h3>
                    <p className="mt-0.5 text-xs text-[color:var(--text-tertiary)]">{g.category}</p>
                  </div>
                  <span className="text-[color:var(--text-tertiary)] transition-colors group-hover:text-amber-300">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Live chat */}
        <section className="mx-auto max-w-7xl px-6 pb-20">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1 overflow-hidden rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--bg-elevated)]">
              <div className="flex items-center justify-between border-b border-[color:var(--border-subtle)] px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <h3 className="text-sm font-medium text-[color:var(--text-primary)]">Live chat</h3>
                </div>
                <span className="text-xs text-[color:var(--text-tertiary)]">1,284</span>
              </div>
              <div className="space-y-3 p-4">
                {chatMessages.map((m, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div
                      className="h-7 w-7 shrink-0 rounded-full text-[10px] font-semibold text-black"
                      style={{ background: m.color }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs font-medium text-[color:var(--text-primary)]">{m.user}</span>
                        <span className="text-[10px] text-[color:var(--text-tertiary)]">{m.time}</span>
                      </div>
                      <p className="text-xs text-[color:var(--text-secondary)]">{m.msg}</p>
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-2 rounded-md border border-[color:var(--border-subtle)] bg-[color:var(--bg-base)] px-3 py-2">
                  <input
                    type="text"
                    placeholder="Say something…"
                    className="flex-1 bg-transparent text-xs text-[color:var(--text-primary)] placeholder-[color:var(--text-tertiary)] outline-none"
                  />
                  <button className="text-xs font-medium text-amber-300 transition-colors hover:text-amber-200">Send</button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {[
                { label: "VIP", desc: "Exclusive tables", icon: I.vip },
                { label: "Tournaments", desc: "Win the pool", icon: I.gift },
                { label: "Provably fair", desc: "Verify each roll", icon: I.support },
              ].map((f) => {
                const Icon = f.icon;
                return (
                  <Link
                    key={f.label}
                    href="#"
                    className="group rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--bg-elevated)] p-5 transition-all hover:border-[color:var(--border-strong)]"
                  >
                    <Icon className="h-5 w-5 text-amber-300" />
                    <div className="mt-3 text-sm font-medium text-[color:var(--text-primary)]">{f.label}</div>
                    <div className="mt-0.5 text-xs text-[color:var(--text-tertiary)]">{f.desc}</div>
                    <div className="mt-3 text-xs text-[color:var(--text-tertiary)] transition-colors group-hover:text-amber-300">Explore →</div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
