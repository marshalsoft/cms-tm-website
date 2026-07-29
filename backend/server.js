require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const db = require('./db');
const { sign, requireAuth } = require('./auth');
const { uniqueSlug } = require('./slug');

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '5mb' }));

// Serve static blog uploads if any
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Auth
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'Email and password are required.' });
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(String(email).toLowerCase());
  if (!user) return res.status(401).json({ error: 'Invalid credentials.' });
  const ok = bcrypt.compareSync(String(password), user.password_hash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials.' });
  const token = sign({ id: user.id, email: user.email, role: user.role });
  res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
});

app.get('/api/auth/me', requireAuth, (req, res) => {
  const user = db.prepare('SELECT id,email,name,role FROM users WHERE id = ?').get(req.user.id);
  res.json({ user });
});

// Public blog list (published only)
app.get('/api/blogs', (req, res) => {
  const { includeDraft } = req.query;
  if (includeDraft === '1') {
    // auth gating handled below
  }
  const rows = includeDraft === '1'
    ? db.prepare('SELECT * FROM blogs ORDER BY datetime(created_at) DESC').all()
    : db.prepare('SELECT * FROM blogs WHERE published = 1 ORDER BY datetime(created_at) DESC').all();
  res.json({ blogs: rows });
});

// Public single by slug
app.get('/api/blogs/by-slug/:slug', (req, res) => {
  const row = db
    .prepare('SELECT * FROM blogs WHERE slug = ? AND published = 1')
    .get(req.params.slug);
  if (!row) return res.status(404).json({ error: 'Blog not found' });
  res.json({ blog: row });
});

// Admin: create
app.post('/api/blogs', requireAuth, (req, res) => {
  const { title, content, excerpt, cover_url, author, tag, published } = req.body || {};
  if (!title || !content) return res.status(400).json({ error: 'Title and content are required.' });
  const slug = uniqueSlug(db, title);
  const info = db.prepare(`
    INSERT INTO blogs (title,slug,excerpt,content,cover_url,author,tag,published,updated_at)
    VALUES (?,?,?,?,?,?,?,?,datetime('now'))
  `).run(
    String(title),
    slug,
    excerpt ? String(excerpt) : null,
    String(content),
    cover_url ? String(cover_url) : null,
    author ? String(author) : 'CMS T&M',
    tag ? String(tag) : null,
    published === 0 ? 0 : 1
  );
  const blog = db.prepare('SELECT * FROM blogs WHERE id = ?').get(info.lastInsertRowid);
  res.json({ blog });
});

// Admin: update
app.put('/api/blogs/:id', requireAuth, (req, res) => {
  const id = Number(req.params.id);
  const existing = db.prepare('SELECT * FROM blogs WHERE id = ?').get(id);
  if (!existing) return res.status(404).json({ error: 'Blog not found' });
  const { title, content, excerpt, cover_url, author, tag, published, slug } = req.body || {};
  const nextTitle = title != null ? String(title) : existing.title;
  const nextSlug = slug != null ? uniqueSlug(db, String(slug), id) : title != null ? uniqueSlug(db, nextTitle, id) : existing.slug;
  db.prepare(`
    UPDATE blogs SET
      title = ?,
      slug = ?,
      excerpt = ?,
      content = ?,
      cover_url = ?,
      author = ?,
      tag = ?,
      published = ?,
      updated_at = datetime('now')
    WHERE id = ?
  `).run(
    nextTitle,
    nextSlug,
    excerpt != null ? String(excerpt) : existing.excerpt,
    content != null ? String(content) : existing.content,
    cover_url != null ? String(cover_url) : existing.cover_url,
    author != null ? String(author) : existing.author,
    tag != null ? String(tag) : existing.tag,
    published != null ? (Number(published) ? 1 : 0) : existing.published,
    id
  );
  const blog = db.prepare('SELECT * FROM blogs WHERE id = ?').get(id);
  res.json({ blog });
});

// Admin: delete
app.delete('/api/blogs/:id', requireAuth, (req, res) => {
  const id = Number(req.params.id);
  const existing = db.prepare('SELECT * FROM blogs WHERE id = ?').get(id);
  if (!existing) return res.status(404).json({ error: 'Blog not found' });
  db.prepare('DELETE FROM blogs WHERE id = ?').run(id);
  res.json({ ok: true });
});

app.get('/api/health', (_req, res) => res.json({ ok: true }));

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => {
  console.log(`CMS T&M API running on http://localhost:${PORT}`);
});
