const path = require('path');
const Database = require('better-sqlite3');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const dataDir = path.resolve(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const db = new Database(path.join(dataDir, 'app.db'));
db.pragma('journal_mode = WAL');

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  name TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS blogs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_url TEXT,
  author TEXT DEFAULT 'CMS T&M',
  tag TEXT,
  published INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
`);

function seed() {
  const userRow = db.prepare('SELECT id FROM users LIMIT 1').get();
  if (!userRow) {
    const email = process.env.ADMIN_EMAIL || 'admin@cmstnm.com';
    const plain = process.env.ADMIN_PASSWORD || 'admin123';
    const hash = bcrypt.hashSync(plain, 10);
    db.prepare('INSERT INTO users (email,password_hash,role,name) VALUES (?,?,?,?)').run(
      email,
      hash,
      'admin',
      'Administrator'
    );
  }
  const blogCount = db.prepare('SELECT COUNT(*) as c FROM blogs').get().c;
  if (blogCount === 0) {
    const insert = db.prepare(`
      INSERT INTO blogs (title,slug,excerpt,content,cover_url,tag,published,author)
      VALUES (?,?,?,?,?,?,1,?)
    `);
    insert.run(
      'How CMS T&M is digitising 1.6m Lagos commutes',
      'how-cms-tm-digitises-lagos-commutes',
      'Cashless cards, app tracking, and structured headways are turning corridor transport into a predictable public service.',
      '<p>Oyster-style payments and driver rosters are finally bringing long-term reliability to the Lekki–Ajah corridor.</p>',
      '/images/screenshot.png',
      'Partnership',
      'BusinessDay'
    );
    insert.run(
      'Introducing the TMO Rider app',
      'introducing-tmo-rider-app',
      'Live ETA, trip history, and cashless top-ups in one pocket-sized companion for Lagos commuters.',
      '<p>Search routes, buy credit, and board without cash — the TMO Rider app makes it simple.</p>',
      '/images/screenshot.png',
      'Product',
      'CMS T&M'
    );
    insert.run(
      'Corporate travel made stress-free',
      'corporate-travel-made-stress-free',
      'Why Lagos finance, tech, and professional services teams now run transfers through a single CMS T&M account.',
      '<p>Executive airport transfers, event fleets, and central billing are now one email away.</p>',
      '/images/screenshot.png',
      'Enterprise',
      'CMS T&M'
    );
  }
}
seed();

module.exports = db;
