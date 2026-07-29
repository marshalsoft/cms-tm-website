export type Blog = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  cover_url?: string | null;
  author?: string | null;
  tag?: string | null;
  published: number;
  created_at: string;
  updated_at: string;
};

const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

async function req<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${base}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {})
    }
  });
  if (!res.ok) {
    let msg = `Request failed: ${res.status}`;
    try {
      const j = await res.json();
      if (j?.error) msg = j.error;
    } catch {}
    throw new Error(msg);
  }
  return (await res.json()) as T;
}

function authHeader(token: string) {
  return { Authorization: `Bearer ${token}` };
}

export async function listBlogs(opts?: { includeDraft?: boolean; token?: string }) {
  const q = opts?.includeDraft ? '?includeDraft=1' : '';
  return req<{ blogs: Blog[] }>(
    `/api/blogs${q}`,
    opts?.token ? { headers: authHeader(opts.token) } : undefined
  );
}

export async function getBlogBySlug(slug: string) {
  return req<{ blog: Blog }>(`/api/blogs/by-slug/${encodeURIComponent(slug)}`);
}

export async function login(email: string, password: string) {
  return req<{ token: string; user: { id: number; email: string; name?: string; role: string } }>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
}

export async function createBlog(data: Partial<Blog>, token: string) {
  return req<{ blog: Blog }>('/api/blogs', {
    method: 'POST',
    headers: authHeader(token),
    body: JSON.stringify(data)
  });
}

export async function updateBlog(id: number, data: Partial<Blog>, token: string) {
  return req<{ blog: Blog }>(`/api/blogs/${id}`, {
    method: 'PUT',
    headers: authHeader(token),
    body: JSON.stringify(data)
  });
}

export async function deleteBlog(id: number, token: string) {
  return req<{ ok: boolean }>(`/api/blogs/${id}`, {
    method: 'DELETE',
    headers: authHeader(token)
  });
}
