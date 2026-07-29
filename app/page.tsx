import AppDownloadCTA from '@/components/AppDownloadCTA';
import Link from 'next/link';

const stats = [
  { k: '6+', v: 'Countries served' },
  { k: '58 yrs', v: 'Lagos transport heritage' },
  { k: '1.6M+', v: 'Commuters annually' },
  { k: '24/7', v: 'Support & operations' }
];

const pillars = [
  {
    title: 'Safe & regulated',
    body: 'Structured operator oversight, branded vehicles, and trained drivers on every corridor.',
    accent: '#3CB371'
  },
  {
    title: 'Cashless & card-first',
    body: 'Oyster-style payments, trip plans, and corporate expense controls powered by the TMO Card.',
    accent: '#FBC02D'
  },
  {
    title: 'Corporate ready',
    body: 'Executive airport transfers, event fleets, and hire-vehicle packages for teams and clients.',
    accent: '#0A2A1F'
  }
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative hero-radial text-white overflow-hidden grain">
        <div className="absolute -top-16 right-[-80px] w-[520px] h-[520px] rounded-full bg-[#3CB371]/25 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 w-[420px] h-[420px] rounded-full bg-[#FBC02D]/20 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-24 pb-28 grid gap-14 lg:grid-cols-2 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-[11px] tracking-[2px] uppercase text-white/80">
              <span className="w-1.5 h-1.5 rounded-full bg-sun" />
              Operator of the Lekki–Ajah Corridor
            </div>
            <h1 className="mt-6 font-display font-extrabold tracking-tight text-[44px] sm:text-[58px] leading-[1.02]">
              Lagos moves on <span className="text-sun">CMS T&amp;M.</span>
              <br />
              Our digital mobility platform.
            </h1>
            <p className="mt-5 text-[16px] sm:text-lg leading-8 text-white/75 max-w-xl">
              Safe, regulated transport for residents, corporates, and visitors — from daily corridor commutes
              to executive airport transfers, all running on one structured, reliable system.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="px-6 py-3.5 rounded-2xl bg-sun text-ink font-extrabold shadow-soft hover:brightness-105"
              >
                Explore the TMO Platform
              </Link>
              <a
                href="https://cmstnm.com/register"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-2xl border border-white/20 font-semibold hover:bg-white/5"
              >
                Drive for TMO
              </a>
            </div>
            <AppDownloadCTA />
          </div>

          <div className="relative min-h-[420px]">
            <div className="absolute w-[340px] h-[60px] left-1/2 -translate-x-1/2 bottom-6 rounded-full bg-[radial-gradient(ellipse,rgba(60,179,113,0.45),transparent_70%)] blur-2xl" />
            <div className="relative w-full max-w-[560px] mx-auto h-[420px] rounded-[32px] border border-white/15 bg-gradient-to-br from-[#0F4C3A] via-[#0A2A1F] to-[#050505] overflow-hidden shadow-soft">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(251,192,45,0.25),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(60,179,113,0.35),transparent_55%)]" />
              <div className="relative h-full grid place-items-center p-8">
                <div className="w-full">
                  <div className="flex items-center justify-between text-white/70 text-xs tracking-[2px] uppercase">
                    <span>TMO Ride</span>
                    <span>Now Boarding</span>
                  </div>
                  <div className="mt-8 space-y-4">
                    <div className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur">
                      <div className="text-white/60 text-xs uppercase tracking-[2px]">Next departure</div>
                      <div className="mt-2 flex items-end justify-between">
                        <div className="font-display font-extrabold text-3xl">CMS → Ajah</div>
                        <div className="text-sun font-extrabold text-xl">08:35</div>
                      </div>
                      <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full w-2/3 bg-gradient-to-r from-leaf via-sun to-[#FF5252]" />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                        <div className="text-[10px] tracking-[2px] uppercase text-white/60">Card</div>
                        <div className="mt-1 font-display font-extrabold text-xl text-white">TMO</div>
                      </div>
                      <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                        <div className="text-[10px] tracking-[2px] uppercase text-white/60">Trips</div>
                        <div className="mt-1 font-display font-extrabold text-xl text-white">12,421</div>
                      </div>
                      <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                        <div className="text-[10px] tracking-[2px] uppercase text-white/60">On-time</div>
                        <div className="mt-1 font-display font-extrabold text-xl text-leaf">98%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-paper border-y border-sand">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.v} className="rounded-3xl bg-white border border-sand p-6 shadow-soft">
              <div className="font-display font-extrabold text-4xl text-ink tracking-tight">{s.k}</div>
              <div className="mt-2 text-sm text-ink/60">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pillars */}
      <section className="py-24 bg-paper">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid gap-14 lg:grid-cols-[1fr_1.4fr] items-start">
          <div className="sticky top-24">
            <div className="text-xs tracking-[2px] uppercase text-leaf font-bold">Why TMO</div>
            <h2 className="mt-3 font-display font-extrabold text-[36px] sm:text-[44px] leading-[1.05] text-ink tracking-tight">
              Built for a city that never slows down.
            </h2>
            <p className="mt-5 text-[16px] leading-8 text-ink/70 max-w-lg">
              From high-frequency corridor routes to executive transport, CMS T&amp;M combines Lagos transport
              heritage with a modern, platform-first operating model.
            </p>
          </div>
          <div className="grid gap-6">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="rounded-3xl bg-white border border-sand p-8 shadow-soft flex gap-6 items-start hover:-translate-y-0.5 transition"
              >
                <div className="w-12 h-12 rounded-2xl grid place-items-center text-white font-bold" style={{ background: p.accent }}>
                  ✓
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-2xl text-ink tracking-tight">{p.title}</h3>
                  <p className="mt-3 text-[15px] leading-7 text-ink/70">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
          <div className="relative rounded-[32px] overflow-hidden border border-white/10 shadow-soft p-10 sm:p-16 text-white hero-radial grain">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(251,192,45,0.25),transparent_55%)]" />
            <div className="relative grid gap-8 md:grid-cols-2 items-center">
              <div>
                <div className="text-xs tracking-[2px] uppercase text-sun font-bold">Get started</div>
                <h2 className="mt-3 font-display font-extrabold text-4xl sm:text-5xl leading-[1.05] tracking-tight">
                  Install the TMO Rider app
                </h2>
                <p className="mt-4 text-white/70 leading-8 max-w-lg">
                  Tap in for contactless rides across the Lekki–Ajah corridor, corporate bookings, and
                  executive transfers.
                </p>
              </div>
              <div className="md:justify-self-end">
                <AppDownloadCTA />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
