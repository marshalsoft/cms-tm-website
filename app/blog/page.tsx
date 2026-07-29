import type { Metadata } from 'next';
import Link from 'next/link';
import { listBlogs, type Blog } from '@/lib/api';

export const metadata: Metadata = { title: 'Blog | CMS T&M' };

export const revalidate = 60;

export default async function BlogPage() {
  let blogs: Blog[] = [];
  try {
    const res = await listBlogs();
    blogs = res.blogs;
  } catch (e) {}

  return (
    <div className="bg-paper min-h-screen">
      <section className="hero-radial text-white grain relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-24 sm:py-32 relative">
          <div className="text-xs tracking-[2px] uppercase text-sun font-bold">TMO Journal</div>
          <h1 className="mt-4 font-display font-extrabold text-4xl sm:text-6xl leading-[1.05] tracking-tight max-w-4xl">
            Stories from the corridors of Lagos mobility.
          </h1>
          <p className="mt-6 text-white/70 max-w-2xl leading-8">
            Partnerships, product updates, and operator insights from CMS T&amp;M — the operator running
            the Lekki–Ajah corridor and corporate travel across the continent.
          </p>
          <div className="mt-8 text-sm text-white/70">
            <Link href="/admin" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/15 hover:bg-white/5">
              <span>Editor login</span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16 -mt-10">
        {blogs.length === 0 ? (
          <div className="rounded-3xl bg-white border border-sand p-10 text-center shadow-soft">
            <div className="font-display font-extrabold text-2xl">No stories yet.</div>
            <p className="mt-2 text-ink/60">
              Check back soon, or sign in as an editor to publish the first post.
            </p>
            <div className="mt-6">
              <Link href="/admin" className="inline-flex px-5 py-3 rounded-2xl bg-ink text-white font-extrabold">
                Go to Admin
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {blogs.map((b, idx) =>
              idx === 0 ? (
                <Link
                  key={b.id}
                  href={`/blog/${b.slug}`}
                  className="md:col-span-2 group rounded-[32px] overflow-hidden border border-sand bg-white shadow-soft hover:-translate-y-0.5 transition"
                >
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative min-h-[320px] bg-gradient-to-br from-[#0F4C3A] to-[#0A2A1F]">
                      {b.cover_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={b.cover_url} alt={b.title} className="absolute inset-0 w-full h-full object-cover" />
                      ) : null}
                      <div className="absolute top-5 left-5 px-3 py-1 rounded-full bg-white/15 backdrop-blur text-white text-xs font-bold tracking-wider uppercase">
                        {b.tag || 'Featured'}
                      </div>
                    </div>
                    <div className="p-10 flex flex-col justify-center">
                      <div className="text-xs tracking-[2px] uppercase text-leaf font-bold">{b.author || 'CMS T&M'} · {new Date(b.created_at).toLocaleDateString()}</div>
                      <h2 className="mt-4 font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-ink">{b.title}</h2>
                      <p className="mt-4 text-ink/70 leading-8 text-lg">{b.excerpt || b.content.replace(/<[^>]+>/g, ' ').slice(0, 240)}</p>
                      <div className="mt-6 text-ink font-extrabold inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                        Read story <span aria-hidden>→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                <Link
                  key={b.id}
                  href={`/blog/${b.slug}`}
                  className="group rounded-[28px] overflow-hidden border border-sand bg-white shadow-soft hover:-translate-y-0.5 transition"
                >
                  <div className="relative h-52 bg-gradient-to-br from-[#0F4C3A] to-[#0A2A1F]">
                    {b.cover_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={b.cover_url} alt={b.title} className="absolute inset-0 w-full h-full object-cover" />
                    ) : null}
                    {b.tag ? (
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/15 backdrop-blur text-white text-xs font-bold tracking-wider uppercase">
                        {b.tag}
                      </div>
                    ) : null}
                  </div>
                  <div className="p-7">
                    <div className="text-xs tracking-[2px] uppercase text-leaf font-bold">{b.author || 'CMS T&M'} · {new Date(b.created_at).toLocaleDateString()}</div>
                    <h3 className="mt-3 font-display font-extrabold text-2xl tracking-tight text-ink">{b.title}</h3>
                    <p className="mt-3 text-ink/70 leading-7">{b.excerpt || b.content.replace(/<[^>]+>/g, ' ').slice(0, 160)}</p>
                    <div className="mt-5 text-ink font-extrabold inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                      Read <span aria-hidden>→</span>
                    </div>
                  </div>
                </Link>
              )
            )}
          </div>
        )}
      </section>
    </div>
  );
}
