import Stripe from 'stripe';

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { id } = req.query;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || key === 'MY_STRIPE_SECRET_KEY') {
    return res.status(400).json({ error: 'Stripe not configured', code: 'CONFIG_MISSING' });
  }

  const stripe = new Stripe(key);
  try {
    const session = await stripe.checkout.sessions.retrieve(id);
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
