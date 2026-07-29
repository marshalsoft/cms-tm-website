import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'About | CMS T&M' };

const milestones = [
  { year: '1966', title: 'Lagos transport heritage begins', body: 'Roots in the CMS corridor bus culture that would become the backbone of city transit.' },
  { year: '2004', title: 'Formal corridor operations', body: 'Structured routes and branded fleets open the door to safer, more predictable public journeys.' },
  { year: '2021', title: 'TMO digitisation partnership', body: 'Cashless payment pilot and app-based passenger tools launched for commuters.' },
  { year: 'Today', title: 'A platform for modern Lagos', body: 'From the Lekki–Ajah Corridor to cross-country corporate travel, TMO runs on structured operations.' }
];

export default function AboutPage() {
  return (
    <div className="bg-paper">
      <section className="hero-radial text-white grain relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-24 sm:py-32 relative">
          <div className="text-xs tracking-[2px] uppercase text-sun font-bold">About CMS T&amp;M</div>
          <h1 className="mt-4 font-display font-extrabold text-4xl sm:text-6xl leading-[1.05] tracking-tight max-w-4xl">
            58 years of Lagos transport, rebuilt as a platform.
          </h1>
          <p className="mt-6 text-white/70 max-w-2xl leading-8">
            CMS T&amp;M combines institutional transport legacy with modern operating systems:
            cashless payments, structured fleet management, and corporate-grade reliability.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-20 grid gap-14 lg:grid-cols-3">
        <div>
          <div className="text-xs tracking-[2px] uppercase text-leaf font-bold">Our mission</div>
          <h2 className="mt-3 font-display font-extrabold text-3xl tracking-tight max-w-sm">
            Mobility every Lagosian can count on.
          </h2>
        </div>
        <div className="lg:col-span-2 grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl bg-white border border-sand p-8 shadow-soft">
            <div className="font-display font-extrabold text-2xl">Safety first</div>
            <p className="mt-3 text-ink/70 leading-7">
              Structured driver vetting, branded fleet vehicles, and passenger support across every route.
            </p>
          </div>
          <div className="rounded-3xl bg-white border border-sand p-8 shadow-soft">
            <div className="font-display font-extrabold text-2xl">Platform native</div>
            <p className="mt-3 text-ink/70 leading-7">
              TMO apps, cashless cards, and dashboards that keep operations, drivers, and passengers in sync.
            </p>
          </div>
          <div className="rounded-3xl bg-white border border-sand p-8 shadow-soft">
            <div className="font-display font-extrabold text-2xl">Corporate trusted</div>
            <p className="mt-3 text-ink/70 leading-7">
              Executive airport transfers and long-term hire fleets for teams across Nigeria and beyond.
            </p>
          </div>
          <div className="rounded-3xl bg-white border border-sand p-8 shadow-soft">
            <div className="font-display font-extrabold text-2xl">Community led</div>
            <p className="mt-3 text-ink/70 leading-7">
              A cooperative model that puts operators, drivers, and commuters on the same side of every trip.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-8 pb-24">
        <div className="text-xs tracking-[2px] uppercase text-leaf font-bold">Milestones</div>
        <h2 className="mt-3 font-display font-extrabold text-3xl sm:text-4xl tracking-tight mb-10">
          Our journey so far.
        </h2>
        <div className="relative border-l-2 border-[#ECE7DA] pl-10 space-y-10">
          {milestones.map((m) => (
            <div key={m.year} className="relative">
              <div className="absolute -left-[62px] top-1.5 w-5 h-5 rounded-full bg-sun border-4 border-white shadow-soft" />
              <div className="text-leaf font-extrabold tracking-wider">{m.year}</div>
              <div className="font-display font-extrabold text-2xl mt-1">{m.title}</div>
              <p className="mt-2 text-ink/70 leading-7 max-w-2xl">{m.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
