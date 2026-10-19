const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const client = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017', {
  dbName: process.env.MONGODB_DB || 'portfolio',
});
const db = client.db(process.env.MONGODB_DB || 'portfolio');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
const TOKEN_TTL = '7d';

function signToken(user) {
  // ponytail: token JWT berisi userId saja; add roles/permissions when needed
  return jwt.sign({ userId: user._id.toString() }, JWT_SECRET, { expiresIn: TOKEN_TTL });
}

function authMiddleware(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Token tidak ditemukan' });
  try {
    req.userId = jwt.verify(token, JWT_SECRET).userId;
    next();
  } catch {
    return res.status(401).json({ error: 'Token tidak valid atau kedaluwarsa' });
  }
}

const users = () => db.collection('users');

async function getUserByCredentials(email) {
  return users().findOne({ email: String(email).toLowerCase().trim() });
}

async function registerUser({ name, email, password }) {
  const exists = await getUserByCredentials(email);
  if (exists) return { error: 'Email sudah terdaftar' };
  const hash = await bcrypt.hash(password, 10);
  const result = await users().insertOne({
    name: String(name).trim(),
    email: String(email).toLowerCase().trim(),
    passwordHash: hash,
    createdAt: new Date(),
  });
  return { user: { _id: result.insertedId, name, email } };
}

async function loginUser({ email, password }) {
  const user = await getUserByCredentials(email);
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return null;
  return user;
}

function publicUser(user) {
  return { id: user._id.toString(), name: user.name, email: user.email };
}

const profileCol = () => db.collection('profile');
const skillsCol = () => db.collection('skills');
const projectsCol = () => db.collection('projects');
const messagesCol = () => db.collection('messages');

const DEFAULT_PROFILE = {
  name: 'John Doe',
  role: 'Full Stack Developer',
  bio: 'Saya adalah seorang developer yang passionate dalam membangun website modern.',
  email: 'johndoe@email.com',
  location: 'Jakarta, Indonesia',
  social: {
    github: 'https://github.com/johndoe',
    linkedin: 'https://linkedin.com/in/johndoe',
  },
};

const DEFAULT_SKILLS = [
  { id: 1, name: 'HTML & CSS', level: 90 },
  { id: 2, name: 'JavaScript', level: 85 },
  { id: 3, name: 'React / Next.js', level: 80 },
  { id: 4, name: 'Node.js / Express', level: 75 },
  { id: 5, name: 'Tailwind CSS', level: 88 },
];

const DEFAULT_PROJECTS = [
  {
    id: 1,
    title: 'Website E-Commerce',
    description: 'Toko online sederhana dengan fitur keranjang belanja.',
    tech: ['Next.js', 'Express', 'MongoDB'],
  },
  {
    id: 2,
    title: 'Aplikasi Todo List',
    description: 'Aplikasi pencatat tugas harian dengan autentikasi.',
    tech: ['React', 'Node.js', 'PostgreSQL'],
  },
  {
    id: 3,
    title: 'Landing Page Company',
    description: 'Landing page responsif untuk perusahaan startup.',
    tech: ['Next.js', 'Tailwind CSS'],
  },
];

/** Seed data default sekali saat DB kosong, supaya frontend langsung punya konten. */
async function seedIfEmpty() {
  const seeded = await db.collection('meta').findOne({ key: 'seeded' });
  if (seeded) return;
  await profileCol().insertOne({ key: 'main', ...DEFAULT_PROFILE });
  await skillsCol().insertMany(DEFAULT_SKILLS.map(({ id, name, level }) => ({ key: 'main', id, name, level })));
  await projectsCol().insertMany(DEFAULT_PROJECTS.map((p) => ({ key: 'main', ...p })));
  await db.collection('meta').insertOne({ key: 'seeded', at: new Date() });
}

async function connectDb() {
  await client.connect();
  await seedIfEmpty();
  return db;
}

module.exports = {
  connectDb,
  client,
  registerUser,
  loginUser,
  publicUser,
  signToken,
  authMiddleware,
  getUserByCredentials,
  profileCol,
  skillsCol,
  projectsCol,
  messagesCol,
};
