import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory store for board broadcast messages
  let activeBroadcast = {
    id: 1,
    active: true,
    admin: 'AxzyeDev',
    verified: true,
    emoji: '🔥',
    message: 'Server aktivasi Alight Motion VIP v5.2 online & stabil. Silakan aktifkan akun kamu sekarang!'
  };

  // In-memory mailbox database for temporary/user emails
  const mailboxes = new Map<string, Array<{
    id: string;
    sender: string;
    subject: string;
    body: string;
    magicLink: string;
    timestamp: string;
  }>>();

  // API endpoint for board messages
  app.get('/api/v1/board-message-api', (req, res) => {
    res.json(activeBroadcast);
  });

  app.post('/api/v1/board-message-api', (req, res) => {
    const { message, emoji, admin } = req.body;
    if (message) {
      activeBroadcast = {
        id: Date.now(),
        active: true,
        admin: admin || 'AxzyeDev',
        verified: true,
        emoji: emoji || '🔥',
        message
      };
    }
    res.json({ success: true, activeBroadcast });
  });

  // API endpoint for Inbox
  app.get('/api/v1/inbox', (req, res) => {
    const email = (req.query.email as string || '').toLowerCase().trim();
    if (!email) {
      return res.json({ success: false, messages: [] });
    }
    const msgs = mailboxes.get(email) || [];
    res.json({ success: true, email, messages: msgs });
  });

  // API endpoint for web-magic (Alight Motion Premium activation flow)
  app.post('/api/v1/web-magic', (req, res) => {
    const { action, email, rawLink } = req.body;

    if (action === 'send-magiclink') {
      const targetEmail = (email || 'user@gmail.com').toLowerCase().trim();
      const magicCode = 'am_vip_' + Math.random().toString(36).substring(2, 10) + '_' + Date.now();
      const magicLink = `https://alightmotion.com/auth/action?mode=signIn&oobCode=${magicCode}&continueUrl=https://axzyedev.biz.id/amprem`;

      const userMsgs = mailboxes.get(targetEmail) || [];
      const newMail = {
        id: 'mail_' + Date.now(),
        sender: 'no-reply@alightmotion.com',
        subject: 'Tautan Masuk (Magic Link) Alight Motion',
        body: `Halo, Seseorang telah meminta tautan masuk ke akun Alight Motion Anda (${targetEmail}). Klik tautan di bawah ini untuk mengaktifkan status Premium VIP.`,
        magicLink,
        timestamp: new Date().toLocaleTimeString('id-ID')
      };
      userMsgs.unshift(newMail);
      mailboxes.set(targetEmail, userMsgs);

      return res.json({
        success: true,
        message: 'Magic link berhasil dikirim ke ' + targetEmail,
        magicLink // Return magicLink directly so UI can auto-fill or display it instantly
      });
    }

    if (action === 'verify-account') {
      return res.json({
        success: true,
        uid: 'am_vip_' + Math.random().toString(36).substring(7),
        profile: { email: email || 'user@gmail.com' },
        idToken: 'mock_token_' + Date.now(),
        isNewUser: false
      });
    }

    if (action === 'apply-premium') {
      return res.json({
        success: true,
        orderId: 'AM-VIP-' + Math.floor(100000 + Math.random() * 900000),
        message: 'Alight Motion Premium berhasil diaktifkan!',
        quota: {
          used: 1,
          limit: 5,
          remaining: 4
        }
      });
    }

    return res.status(400).json({ success: false, message: 'Invalid action' });
  });

  // Serve static files from public directory
  app.use(express.static(path.resolve(__dirname, 'public')));

  // Create Vite server in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  app.use(vite.middlewares);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
