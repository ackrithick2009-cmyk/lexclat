import { getDb } from '../_utils/firebase-admin.js';
import Stripe from 'stripe';

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { sessionId } = req.body || {};
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || key === 'MY_STRIPE_SECRET_KEY') {
    return res.status(400).json({ error: 'Stripe not configured', code: 'CONFIG_MISSING' });
  }

  const stripe = new Stripe(key);
  const db = getDb();

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status === 'paid' && session.client_reference_id) {
      const userId = session.client_reference_id;
      if (db) {
        await db.collection('users').doc(userId).update({
          isPremium: true,
          updatedAt: new Date().toISOString(),
        });
      }
      res.json({ success: true });
    } else {
      res.status(400).json({ error: 'Payment not verified' });
    }
  } catch (error) {
    console.error('Verification Error:', error);
    res.status(500).json({ error: error.message });
  }
}
