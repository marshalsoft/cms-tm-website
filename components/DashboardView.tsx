'use client';

import { useEffect, useState } from 'react';
import {
  createBlog,
  deleteBlog,
  listBlogs,
  updateBlog,
  type Blog
} from '@/lib/api';
import { useSession } from '@/lib/session';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const empty: Omit<Blog, 'id' | 'created_at' | 'updated_at'> = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  cover_url: '',
  author: 'CMS T&M',
  tag: '',
  published: 1
};

export default function DashboardView() {
  const router = useRouter();
  const { session, loaded, logout } = useSession();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [editing, setEditing] = useState<Blog | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  async function refresh(token?: string) {
    const tok = token || session?.token;
    if (!tok) return;
    try {
      const res = await listBlogs({ includeDraft: true, token: tok });
      setBlogs(res.blogs);
    } catch (e: any) {
      setStatus({ type: 'err', text: e?.message || 'Could not load blogs.' });
    }
  }

  useEffect(() => {
    if (!loaded) return;
    if (!session) {
      router.replace('/admin');
      return;
    }
    refresh();
  }, [loaded, session]);

  function startCreate() {
    setCreating(true);
    setEditing(null);
    setForm(empty);
  }

  function startEdit(b: Blog) {
    setEditing(b);
    setCreating(false);
    setForm({
      title: b.title,
      slug: b.slug,
      excerpt: b.excerpt || '',
      content: b.content,
      cover_url: b.cover_url || '',
      author: b.author || 'CMS T&M',
      tag: b.tag || '',
      published: b.published
    });
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!session) return;
    setStatus(null);
    try {
      if (creating) {
        const { blog } = await createBlog(form, session.token);
        setBlogs((arr) => [blog, ...arr]);
        setCreating(false);
      } else if (editing) {
        const { blog } = await updateBlog(editing.id, form, session.token);
        setBlogs((arr) => arr.map((x) => (x.id === blog.id ? blog : x)));
        setEditing(null);
      }
      setForm(empty);
      setStatus({ type: 'ok', text: 'Blog saved.' });
    } catch (e: any) {
      setStatus({ type: 'err', text: e?.message || 'Save failed.' });
    }
  }

  async function remove(blog: Blog) {
    if (!session) return;
    if (!confirm(`Delete "${blog.title}"?`)) return;
    try {
      await deleteBlog(blog.id, session.token);
      setBlogs((arr) => arr.filter((x) => x.id !== blog.id));
      if (editing?.id === blog.id) setEditing(null);
      setStatus({ type: 'ok', text: 'Blog deleted.' });
    } catch (e: any) {
      setStatus({ type: 'err', text: e?.message || 'Delete failed.' });
    }
  }

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs tracking-[2px] uppercase text-leaf font-bold">Admin dashboard</div>
            <h1 className="mt-3 font-display font-extrabold text-4xl tracking-tight">Blogs</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/blog" target="_blank" className="px-4 py-2.5 rounded-xl border border-sand font-semibold hover:bg-white">
              View site →
            </Link>
            <button onClick={startCreate} className="px-5 py-2.5 rounded-xl bg-ink text-white font-extrabold">
              + New post
            </button>
            <button
              onClick={() => {
                logout();
                router.replace('/admin');
              }}
              className="px-4 py-2.5 rounded-xl text-ink/70 hover:text-ink"
            >
              Sign out
            </button>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-sand bg-white shadow-soft overflow-hidden">
          <div className="grid grid-cols-[1.6fr_auto_1fr_auto] gap-4 px-6 py-4 border-b border-sand text-xs uppercase tracking-[2px] font-bold text-ink/60">
            <div>Title</div>
            <div>Status</div>
            <div>Created</div>
            <div>Actions</div>
          </div>
          <ul>
            {blogs.length === 0 && (
              <li className="p-8 text-center text-ink/60">No posts yet. Create the first one.</li>
            )}
            {blogs.map((b) => (
              <li
                key={b.id}
                className="grid grid-cols-[1.6fr_auto_1fr_auto] items-center gap-4 px-6 py-4 border-b border-sand last:border-b-0 hover:bg-paper/40"
              >
                <div className="min-w-0">
                  <div className="font-display font-extrabold text-lg text-ink truncate">{b.title}</div>
                  <div className="text-sm text-ink/60 truncate">{b.slug} · {b.tag || 'Untagged'}</div>
                </div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide ${b.published ? 'bg-[#E7F6EC] text-[#0F4C3A]' : 'bg-[#FDEBD2] text-[#7A5A13]'}`}>
                    {b.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <div className="text-sm text-ink/60">
                  {new Date(b.created_at).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/blog/${b.slug}`}
                    target="_blank"
                    className="px-3 py-2 rounded-lg text-sm font-semibold text-ink/70 hover:text-ink"
                  >
                    View
                  </Link>
                  <button onClick={() => startEdit(b)} className="px-3 py-2 rounded-lg text-sm font-semibold text-ink border border-sand hover:bg-white">
                    Edit
                  </button>
                  <button onClick={() => remove(b)} className="px-3 py-2 rounded-lg text-sm font-semibold text-red-700 border border-red-200 hover:bg-red-50">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="lg:sticky lg:top-24 h-fit">
        <form onSubmit={save} className="rounded-3xl border border-sand bg-white p-6 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-extrabold text-2xl tracking-tight">
              {creating ? 'Create post' : editing ? `Edit · ${editing.title.slice(0, 30)}` : 'Select a post'}
            </h2>
            {(creating || editing) && (
              <button
                type="button"
                onClick={() => {
                  setCreating(false);
                  setEditing(null);
                  setForm(empty);
                }}
                className="text-sm text-ink/60 hover:text-ink"
              >
                Close
              </button>
            )}
          </div>
          {status ? (
            <div className={`rounded-xl px-4 py-3 text-sm ${status.type === 'ok' ? 'bg-[#E7F6EC] text-[#0F4C3A]' : 'bg-[#FDE7E7] text-[#7A1F1F]'}`}>
              {status.text}
            </div>
          ) : null}
          {!creating && !editing ? (
            <p className="text-ink/60 text-sm leading-6">
              Click <span className="font-semibold">+ New post</span> to create, or select a post from the list on the left to edit.
            </p>
          ) : (
            <>
              <label className="block">
                <span className="text-xs uppercase tracking-[2px] text-ink/60 font-bold">Title</span>
                <input value={form.title} onChange={(e) => set('title', e.target.value)} required className="mt-1 w-full px-4 py-3 rounded-2xl bg-paper border border-sand focus:border-leaf outline-none" />
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-xs uppercase tracking-[2px] text-ink/60 font-bold">Slug</span>
                  <input value={form.slug} onChange={(e) => set('slug', e.target.value)} placeholder="leave empty to auto-generate" className="mt-1 w-full px-4 py-3 rounded-2xl bg-paper border border-sand focus:border-leaf outline-none" />
                </label>
                <label className="block">
                  <span className="text-xs uppercase tracking-[2px] text-ink/60 font-bold">Tag</span>
                  <input value={form.tag || ''} onChange={(e) => set('tag', e.target.value)} placeholder="Partnership, Product…" className="mt-1 w-full px-4 py-3 rounded-2xl bg-paper border border-sand focus:border-leaf outline-none" />
                </label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-xs uppercase tracking-[2px] text-ink/60 font-bold">Author</span>
                  <input value={form.author || ''} onChange={(e) => set('author', e.target.value)} className="mt-1 w-full px-4 py-3 rounded-2xl bg-paper border border-sand focus:border-leaf outline-none" />
                </label>
                <label className="block">
                  <span className="text-xs uppercase tracking-[2px] text-ink/60 font-bold">Status</span>
                  <select value={form.published} onChange={(e) => set('published', Number(e.target.value) ? 1 : 0)} className="mt-1 w-full px-4 py-3 rounded-2xl bg-paper border border-sand focus:border-leaf outline-none">
                    <option value={1}>Published</option>
                    <option value={0}>Draft</option>
                  </select>
                </label>
              </div>
              <label className="block">
                <span className="text-xs uppercase tracking-[2px] text-ink/60 font-bold">Cover image URL</span>
                <input value={form.cover_url || ''} onChange={(e) => set('cover_url', e.target.value)} className="mt-1 w-full px-4 py-3 rounded-2xl bg-paper border border-sand focus:border-leaf outline-none" />
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-[2px] text-ink/60 font-bold">Excerpt</span>
                <textarea value={form.excerpt || ''} onChange={(e) => set('excerpt', e.target.value)} rows={2} className="mt-1 w-full px-4 py-3 rounded-2xl bg-paper border border-sand focus:border-leaf outline-none" />
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-[2px] text-ink/60 font-bold">Content (HTML allowed)</span>
                <textarea value={form.content} onChange={(e) => set('content', e.target.value)} required rows={10} className="mt-1 w-full px-4 py-3 rounded-2xl bg-paper border border-sand focus:border-leaf outline-none font-mono text-[13px] leading-6" />
              </label>
              <button type="submit" className="w-full px-5 py-3 rounded-2xl bg-ink text-white font-extrabold">
                {creating ? 'Create blog' : 'Save changes'}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
