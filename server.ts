import express from "express";
import compression from "compression";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Stripe from "stripe";
import dotenv from "dotenv";
import admin from "firebase-admin";

dotenv.config();

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    // In many cloud environments, this works without explicit credentials
    // if the service account has the right roles.
  });
}
const db = admin.firestore();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

let stripe: Stripe | null = null;
const getStripe = () => {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || key === "MY_STRIPE_SECRET_KEY") {
    console.warn("STRIPE_SECRET_KEY is missing or using placeholder.");
    return null;
  }
  if (!stripe) {
    stripe = new Stripe(key);
  }
  return stripe;
};

app.use(compression());
app.use(express.json());

// API Route for Stripe Checkout
app.post("/api/create-checkout-session", async (req, res) => {
  const { userId } = req.body;
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers['host'];
  const origin = `${protocol}://${host}`;

  const stripeClient = getStripe();
  if (!stripeClient) {
    return res.status(400).json({ 
      error: "Stripe is not configured. Please add STRIPE_SECRET_KEY to your Secrets in AI Studio Settings.",
      code: "CONFIG_MISSING" 
    });
  }

  try {
    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ["card", "upi"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "LexCLAT Premium - Full Access",
              description: "Unlimited access to the AI Legal Tutor, Premium Mock Tests, and Study Materials.",
            },
            unit_amount: 499900, // 4999 INR
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      client_reference_id: userId,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}`,
    });

    res.json({ id: session.id });
  } catch (error: any) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// API Route for verifying session and upgrading user
app.post("/api/verify-payment", async (req, res) => {
  const { sessionId } = req.body;
  const stripeClient = getStripe();
  if (!stripeClient) {
    return res.status(400).json({ error: "Stripe not configured" });
  }
  try {
    const session = await stripeClient.checkout.sessions.retrieve(sessionId);
    if (session.payment_status === "paid" && session.client_reference_id) {
      const userId = session.client_reference_id;
      await db.collection("users").doc(userId).update({
        isPremium: true,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      res.json({ success: true });
    } else {
      res.status(400).json({ error: "Payment not verified" });
    }
  } catch (error: any) {
    console.error("Verification Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// API Route for retrieving session
app.get("/api/checkout-session/:id", async (req, res) => {
  const stripeClient = getStripe();
  if (!stripeClient) {
    return res.status(400).json({ error: "Stripe not configured" });
  }
  try {
    const session = await stripeClient.checkout.sessions.retrieve(req.params.id);
    res.json(session);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Vite middleware for development
if (process.env.NODE_ENV !== "production") {
  createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  }).then((vite) => {
    app.use(vite.middlewares);
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  });
} else {
  const distPath = path.join(process.cwd(), "dist");
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
  
  if (!process.env.VERCEL) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
}

export default app;
