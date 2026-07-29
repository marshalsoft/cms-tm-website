import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Leadership | CMS T&M' };

const leaders = [
  { name: 'Alh. Ayinde Omotara Mudashiru', role: 'Chairman', photo: '/images/ALH-AYINDE-OMOTARA-MUDASHIRU.jpeg', c1: '#0F4C3A', c2: '#FBC02D' },
  { name: 'Andy Akhigbe', role: 'Chief Executive Officer', photo: '/images/ANDY-AKHIGBE.jpeg', c1: '#0A2A1F', c2: '#3CB371' },
  { name: 'Mr. Animashaun Waheed Sholagbade', role: 'Operations Director', photo: '/images/MR-ANIMASHAUN-WAHEED-SHOLAGBADE.jpeg', c1: '#3CB371', c2: '#0A2A1F' },
  { name: 'Mr. Arowosaye Kareem', role: 'Fleet Manager', photo: '/images/MR-AROWOSAYE-KAREEM.jpeg', c1: '#FBC02D', c2: '#0F4C3A' },
  { name: 'Mr. Omotayo Olatunde Solomon', role: 'Commercial Manager', photo: '/images/MR-OMOTAYO-OLATUNDE-SOLOMON.jpeg', c1: '#15573F', c2: '#FBC02D' },
  { name: 'Mr. Sikirulahi Tafa', role: 'Corridor Supervisor', photo: '/images/MR-SIKIRU-TAFA.jpeg', c1: '#3CB371', c2: '#FBC02D' },
  { name: 'R. Tijani Kareem', role: 'Driver Operations Lead', photo: '/images/R-TIJANI-KAREEM.jpeg', c1: '#0A2A1F', c2: '#FFD84D' }
];

export default function LeadershipPage() {
  return (
    <div className="bg-paper">
      <section className="hero-radial text-white grain relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-24 sm:py-32 relative">
          <div className="text-xs tracking-[2px] uppercase text-sun font-bold">Leadership</div>
          <h1 className="mt-4 font-display font-extrabold text-4xl sm:text-6xl leading-[1.05] tracking-tight max-w-4xl">
            The people who keep Lagos moving.
          </h1>
          <p className="mt-6 text-white/70 max-w-2xl leading-8">
            A team of operators, fleet managers, and transport leaders running TMO across the
            Lekki–Ajah corridor and enterprise travel products.
          </p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 -mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {leaders.map((l) => (
          <div key={l.name} className="rounded-[28px] overflow-hidden shadow-soft border border-sand bg-white">
            <div className="relative h-56" style={{ background: `linear-gradient(135deg, ${l.c1}, ${l.c2})` }}>
              <div className="absolute inset-0 opacity-90">
                <div className="w-full h-full bg-[radial-gradient(circle_at_70%_0%,rgba(255,255,255,0.25),transparent_55%)]" />
              </div>
              {l.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={l.photo} alt={l.name} className="absolute inset-0 w-full h-full object-cover mix-blend-multiply" />
              ) : null}
            </div>
            <div className="p-6">
              <h3 className="font-display font-extrabold text-2xl tracking-tight">{l.name}</h3>
              <p className="mt-1 text-sm text-ink/60">{l.role}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
