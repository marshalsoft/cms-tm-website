import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Routes | CMS T&M' };

const routes = [
  { from: 'CMS', to: 'Ajah', note: 'High-frequency corridor route', minutes: 35, color: 'from-[#3CB371] to-[#0F4C3A]' },
  { from: 'Ajah', to: 'CMS', note: 'Return service with morning rush scheduling', minutes: 35, color: 'from-[#FBC02D] to-[#D9A61A]' },
  { from: 'Lekki Phase 1', to: 'Victoria Island', note: 'Executive transfer routes', minutes: 22, color: 'from-[#0F4C3A] to-[#0A2A1F]' },
  { from: 'Airport', to: 'Lekki', note: 'Premium airport pickup packages', minutes: 55, color: 'from-[#FF5252] to-[#B23A3A]' }
];

export default function RoutesPage() {
  return (
    <div className="bg-paper">
      <section className="hero-radial text-white grain relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-24 sm:py-32 relative">
          <div className="text-xs tracking-[2px] uppercase text-sun font-bold">Routes</div>
          <h1 className="mt-4 font-display font-extrabold text-4xl sm:text-6xl leading-[1.05] tracking-tight max-w-4xl">
            Structured routes, every day of the week.
          </h1>
          <p className="mt-6 text-white/70 max-w-2xl leading-8">
            From the iconic CMS corridor to premium airport transfers, TMO runs a fixed network with
            predictable pricing, reliable headways, and corporate-grade extras.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-8 -mt-10 pb-24 grid gap-6">
        {routes.map((r) => (
          <div key={r.from + r.to} className="rounded-[28px] bg-white border border-sand shadow-soft overflow-hidden">
            <div className="grid gap-0 md:grid-cols-[180px_1fr_auto]">
              <div className={`h-full min-h-[140px] bg-gradient-to-br ${r.color} p-6 text-white`}>
                <div className="text-xs uppercase tracking-[2px] font-bold text-white/70">Route</div>
                <div className="mt-3 font-display font-extrabold text-3xl leading-tight">
                  {r.from}
                  <div className="text-white/70 my-1.5 text-sm">↔</div>
                  {r.to}
                </div>
              </div>
              <div className="p-8">
                <div className="font-display font-extrabold text-2xl">{r.note}</div>
                <p className="mt-3 text-ink/70 leading-7 max-w-2xl">
                  Scheduled departures with live in-app ETA updates. Vehicles depart on-time with
                  corridor-trained drivers and cashless fare support.
                </p>
              </div>
              <div className="px-8 py-8 md:border-l border-sand grid place-items-center">
                <div>
                  <div className="text-xs uppercase tracking-[2px] font-bold text-leaf">Travel time</div>
                  <div className="font-display font-extrabold text-4xl text-ink mt-1">{r.minutes}<span className="text-xl text-ink/60 ml-1">min</span></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
