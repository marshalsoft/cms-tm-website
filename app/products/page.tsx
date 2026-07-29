import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Products | CMS T&M' };

const products = [
  {
    title: 'TMO Card',
    body: 'A reusable cashless card for corridor buses, partner taxis, and in-app top-ups with trip history and spend limits.',
    cta: 'https://cmstnm.com/request-card',
    ctaLabel: 'Apply for Card',
    color: 'from-[#0F4C3A] to-[#0A2A1F]',
    tag: 'Payments'
  },
  {
    title: 'Hire Vehicles',
    body: 'Hourly, daily, and weekly hires — sedans, SUVs, vans, and buses for events, weddings, and production shoots.',
    cta: '/products#contact',
    ctaLabel: 'Request a quote',
    color: 'from-[#3CB371] to-[#0F4C3A]',
    tag: 'Fleet'
  },
  {
    title: 'Corporate Travel',
    body: 'Central billing, driver rosters, and airport transfers for executives across 6+ countries.',
    cta: '/products#contact',
    ctaLabel: 'Talk to sales',
    color: 'from-[#FBC02D] to-[#D9A61A]',
    tag: 'Enterprise'
  },
  {
    title: 'Event Packages',
    body: 'Shuttles and premium transfers for conferences, weddings, and destination events.',
    cta: '/products#contact',
    ctaLabel: 'Plan an event',
    color: 'from-[#FF5252] to-[#B23A3A]',
    tag: 'Experiences'
  }
];

export default function ProductsPage() {
  return (
    <div className="bg-paper">
      <section className="hero-radial text-white grain relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-24 sm:py-32 relative">
          <div className="text-xs tracking-[2px] uppercase text-sun font-bold">Products</div>
          <h1 className="mt-4 font-display font-extrabold text-4xl sm:text-6xl leading-[1.05] tracking-tight max-w-4xl">
            Mobility products built for every kind of Lagos journey.
          </h1>
          <p className="mt-6 text-white/70 max-w-2xl leading-8">
            From daily commuters on the Lekki–Ajah corridor to executive transfers and event logistics,
            TMO’s product line covers every passenger segment.
          </p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-5 sm:px-8 -mt-10 mb-20 grid gap-6 sm:grid-cols-2">
        {products.map((p) => (
          <div key={p.title} className="rounded-[28px] bg-white border border-sand overflow-hidden shadow-soft">
            <div className={`h-40 bg-gradient-to-br ${p.color} relative`}>
              <div className="absolute top-5 left-5 px-3 py-1 rounded-full bg-white/15 backdrop-blur text-white text-xs font-bold tracking-wider uppercase">
                {p.tag}
              </div>
            </div>
            <div className="p-8">
              <h2 className="font-display font-extrabold text-2xl tracking-tight">{p.title}</h2>
              <p className="mt-3 text-ink/70 leading-7">{p.body}</p>
              <div className="mt-6">
                <a
                  href={p.cta}
                  target={p.cta.startsWith('http') ? '_blank' : undefined}
                  rel={p.cta.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="inline-flex px-5 py-3 rounded-2xl bg-ink text-white font-extrabold hover:bg-[#0F4C3A]"
                >
                  {p.ctaLabel}
                </a>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
