import type { Metadata } from 'next';
import Link from 'next/link';
import { getBlogBySlug, listBlogs, type Blog } from '@/lib/api';

type Params = { slug: string };

export async function generateStaticParams() {
  try {
    const { blogs } = await listBlogs();
    return blogs.map((b) => ({ slug: b.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  try {
    const { blog } = await getBlogBySlug(params.slug);
    return {
      title: `${blog.title} | CMS T&M Blog`,
      description: blog.excerpt || blog.content.replace(/<[^>]+>/g, ' ').slice(0, 160),
      openGraph: blog.cover_url ? { images: [{ url: blog.cover_url }] } : undefined,
      twitter: blog.cover_url ? { images: [blog.cover_url] } : undefined
    };
  } catch {
    return { title: 'Blog | CMS T&M' };
  }
}

export const revalidate = 60;

export default async function BlogPostPage({ params }: { params: Params }) {
  let blog: Blog | null = null;
  let err: string | null = null;
  try {
    const data = await getBlogBySlug(params.slug);
    blog = data.blog;
  } catch (e: any) {
    err = e?.message || 'Not found';
  }
  return (
    <div className="bg-paper min-h-screen">
      <section className="hero-radial text-white grain relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-20 sm:py-24 relative">
          <Link href="/blog" className="inline-flex items-center gap-2 text-white/70 hover:text-white">
            <span aria-hidden>←</span> Back to blog
          </Link>
          {blog ? (
            <>
              {blog.tag ? (
                <div className="mt-8 inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-bold tracking-[2px] uppercase text-sun">
                  {blog.tag}
                </div>
              ) : null}
              <h1 className="mt-4 font-display font-extrabold text-4xl sm:text-5xl leading-[1.05] tracking-tight">
                {blog.title}
              </h1>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-white/70 text-sm">
                <div>{blog.author || 'CMS T&M'}</div>
                <div>·</div>
                <div>{new Date(blog.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</div>
              </div>
            </>
          ) : (
            <div className="mt-10">
              <div className="font-display font-extrabold text-3xl">Story not found.</div>
              <p className="mt-3 text-white/70">{err || 'The blog post could not be loaded.'}</p>
            </div>
          )}
        </div>
        {blog?.cover_url ? (
          <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pb-10">
            <div className="rounded-[28px] overflow-hidden border border-white/10 shadow-soft aspect-[16/9] bg-[#0F4C3A]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={blog.cover_url} alt={blog.title} className="w-full h-full object-cover" />
            </div>
          </div>
        ) : null}
      </section>

      {blog ? (
        <article className="max-w-3xl mx-auto px-5 sm:px-8 py-16 pb-28">
          {blog.excerpt ? (
            <div className="font-display font-semibold text-2xl leading-9 text-ink/80 mb-8">
              {blog.excerpt}
            </div>
          ) : null}
          <div
            className="prose prose-lg prose-ink max-w-none text-[17px] leading-8 text-ink/85"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </article>
      ) : null}
    </div>
  );
}
