const express = require('express');
const cors = require('cors');
const {
  connectDb,
  client,
  registerUser,
  loginUser,
  publicUser,
  signToken,
  authMiddleware,
  profileCol,
  skillsCol,
  projectsCol,
  messagesCol,
} = require('./db');
const { ObjectId } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ---------- Auth ----------
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Nama, email, dan password wajib diisi' });
    }
    if (String(password).length < 8) {
      return res.status(400).json({ error: 'Password minimal 8 karakter' });
    }
    const result = await registerUser({ name, email, password });
    if (result.error) return res.status(409).json({ error: result.error });
    return res.status(201).json({
      success: true,
      token: signToken(result.user),
      user: publicUser(result.user),
    });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: 'Email dan password wajib diisi' });
    }
    const user = await loginUser({ email, password });
    if (!user) return res.status(401).json({ error: 'Email atau password salah' });
    return res.json({
      success: true,
      token: signToken(user),
      user: publicUser(user),
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
});

app.get('/api/auth/me', authMiddleware, async (req, res) => {
  if (!ObjectId.isValid(req.userId)) return res.status(401).json({ error: 'Token tidak valid' });
  const user = await client.db().collection('users').findOne({ _id: new ObjectId(req.userId) });
  if (!user) return res.status(401).json({ error: 'User tidak ditemukan' });
  return res.json({ user: publicUser(user) });
});

// ---------- Konten portofolio (public, sumber MongoDB) ----------
app.get('/api/profile', async (req, res) => {
  try {
    const doc = await profileCol().findOne({ key: 'main' });
    if (!doc) return res.status(404).json({ error: 'Profile belum tersedia' });
    const { _id, key, ...profile } = doc;
    return res.json(profile);
  } catch (err) {
    console.error('Profile error:', err);
    return res.status(500).json({ error: 'Gagal memuat profile' });
  }
});

app.get('/api/skills', async (req, res) => {
  try {
    const docs = await skillsCol().find({ key: 'main' }, { projection: { _id: 0, key: 0 } }).toArray();
    return res.json(docs);
  } catch (err) {
    console.error('Skills error:', err);
    return res.status(500).json({ error: 'Gagal memuat skills' });
  }
});

app.get('/api/projects', async (req, res) => {
  try {
    const docs = await projectsCol().find({ key: 'main' }, { projection: { _id: 0, key: 0 } }).toArray();
    return res.json(docs);
  } catch (err) {
    console.error('Projects error:', err);
    return res.status(500).json({ error: 'Gagal memuat projects' });
  }
});

// ---------- Contact ----------
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Semua field wajib diisi' });
    }
    await messagesCol().insertOne({
      name: String(name).trim(),
      email: String(email).trim(),
      message: String(message).trim(),
      createdAt: new Date(),
    });
    return res.json({ success: true, message: 'Pesan berhasil dikirim!' });
  } catch (err) {
    console.error('Contact error:', err);
    return res.status(500).json({ error: 'Gagal mengirim pesan' });
  }
});

// ---------- Pesan (proteksi token) ----------
app.get('/api/messages', authMiddleware, async (req, res) => {
  try {
    const docs = await messagesCol().find().sort({ createdAt: -1 }).toArray();
    return res.json(docs);
  } catch (err) {
    console.error('Messages error:', err);
    return res.status(500).json({ error: 'Gagal memuat pesan' });
  }
});

app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API is running 🚀' });
});

// 404 JSON konsisten
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint tidak ditemukan' });
});

// Error handler JSON (Express 5 async errors dilempar ke sini)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  if (res.headersSent) return next(err);
  return res.status(500).json({ error: 'Terjadi kesalahan server' });
});

async function start() {
  try {
    await connectDb();
    console.log('✅ MongoDB terhubung:', process.env.MONGODB_DB || 'portfolio');
    app.listen(PORT, () => {
      console.log(`✅ Backend berjalan di http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Gagal terhubung ke MongoDB:', err.message);
    process.exit(1);
  }
}

start();
