import { getDb } from '../_utils/firebase-admin.js';
import Stripe from 'stripe';

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { userId } = req.body || {};
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['host'];
  const origin = `${protocol}://${host}`;

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || key === 'MY_STRIPE_SECRET_KEY') {
    return res.status(400).json({ error: 'Stripe is not configured.', code: 'CONFIG_MISSING' });
  }

  const stripe = new Stripe(key);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'upi'],
      line_items: [{
        price_data: {
          currency: 'inr',
          product_data: {
            name: 'LexCLAT Premium - Full Access',
            description: 'Unlimited access to AI Legal Tutor, Premium Mocks, and Study Materials.',
          },
          unit_amount: 499900,
        },
        quantity: 1,
      }],
      mode: 'payment',
      client_reference_id: userId,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: origin,
    });
    res.json({ id: session.id });
  } catch (error) {
    console.error('Stripe Error:', error);
    res.status(500).json({ error: error.message });
  }
}
