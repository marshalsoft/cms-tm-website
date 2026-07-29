function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120) || 'post';
}

function uniqueSlug(db, title, id = null) {
  let base = slugify(title);
  let slug = base;
  let i = 1;
  while (true) {
    const row = id
      ? db.prepare('SELECT id FROM blogs WHERE slug = ? AND id != ?').get(slug, id)
      : db.prepare('SELECT id FROM blogs WHERE slug = ?').get(slug);
    if (!row) return slug;
    i += 1;
    slug = `${base}-${i}`;
  }
}

module.exports = { slugify, uniqueSlug };
