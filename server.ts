import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory data store for contacts, orders, and newsletter subscribers
let orders = [
  {
    id: "ORD-9281",
    serviceName: "Professional YouTube Video Editing & Motion Graphics",
    amount: 1499,
    currency: "USD",
    status: "Completed",
    gateway: "Stripe",
    createdAt: "2026-07-01T10:00:00Z",
    invoiceUrl: "#"
  },
  {
    id: "ORD-9282",
    serviceName: "SaaS Full-Stack Web Development & Dashboard",
    amount: 3499,
    currency: "USD",
    status: "In Progress",
    gateway: "Razorpay",
    createdAt: "2026-07-05T14:30:00Z",
    invoiceUrl: "#"
  }
];

let messages = [
  {
    id: "m-1",
    name: "Sarah Jenkins",
    email: "sarah@techcorp.io",
    phone: "+1 555-019-2834",
    subject: "Custom AI Automation Workflow",
    message: "We need an advanced AI automation agent integrated into our Discord and Web platform.",
    createdAt: "2026-07-08T09:15:00Z",
    status: "Unread"
  }
];

let newsletterSubscribers = [
  { id: "n-1", email: "subscriber@example.com", subscribedAt: "2026-07-01T00:00:00Z" }
];

// --- API ROUTES ---

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "HOLLOWGRAVE", timestamp: new Date().toISOString() });
});

// Orders & Payments
app.get("/api/orders", (req, res) => {
  res.json(orders);
});

app.post("/api/orders", (req, res) => {
  const { serviceName, amount, gateway } = req.body;
  const newOrder = {
    id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
    serviceName: serviceName || "Custom Digital Package",
    amount: amount || 999,
    currency: "USD",
    status: "Processing",
    gateway: gateway || "Stripe",
    createdAt: new Date().toISOString(),
    invoiceUrl: "#"
  };
  orders.unshift(newOrder);
  res.json({ success: true, order: newOrder });
});

// Contact Form Endpoint
app.post("/api/contact", (req, res) => {
  const { name, email, phone, company, subject, budget, deadline, message } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  const newMsg = {
    id: `m-${Date.now()}`,
    name,
    email,
    phone: phone || "",
    company: company || "",
    subject: subject || "General Inquiry",
    budget: budget || "",
    deadline: deadline || "",
    message: message || "New project inquiry",
    createdAt: new Date().toISOString(),
    status: "Unread"
  };

  messages.unshift(newMsg);
  res.json({ success: true, message: "Inquiry submitted successfully. Our executive team will review it shortly." });
});

// Newsletter Subscription Endpoint
app.post("/api/newsletter", (req, res) => {
  const { email } = req.body;
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  const cleanEmail = email.trim().toLowerCase();
  const existing = newsletterSubscribers.find(s => s.email.toLowerCase() === cleanEmail);

  if (existing) {
    return res.json({
      success: true,
      alreadySubscribed: true,
      message: "You're already subscribed to HOLLOWGRAVE VIP Intel!",
      subscribersCount: newsletterSubscribers.length
    });
  }

  const newSub = { id: `n-${Date.now()}`, email: cleanEmail, subscribedAt: new Date().toISOString() };
  newsletterSubscribers.push(newSub);

  res.json({
    success: true,
    message: "Welcome to HOLLOWGRAVE VIP Intel! Your email has been registered for exclusive updates.",
    subscribersCount: newsletterSubscribers.length
  });
});

app.get("/api/newsletter/count", (req, res) => {
  res.json({ count: newsletterSubscribers.length });
});

// AI Chat Assistant (Powered by Gemini)
app.post("/api/ai-chat", async (req, res) => {
  try {
    const { message } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return res.json({ 
        reply: "Greetings from HOLLOWGRAVE AI. How can Anshuman, Raja, and the team help elevate your digital presence today? Feel free to join our Discord community for instant consultation!" 
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `You are HOLLOWGRAVE AI, the elite digital intelligence of HOLLOWGRAVE (a futuristic creative agency specializing in video editing, web development, app development, UI/UX, branding, and AI automation, founded by Anshuman Bhalerao and Raja Sahu). Answer professionally, concisely, and with a sleek, luxurious creative agency persona. Encourage visitors to join our Discord community (https://discord.gg/8znW9nfYhQ) for direct discussion with founders.
    
    User Query: ${message}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    res.json({ reply: response.text || "Let's build something legendary together. Join our Discord!" });
  } catch (error: any) {
    console.error("AI Chat error:", error);
    res.json({ reply: "HOLLOWGRAVE AI is currently optimizing neural networks. Please try your request again or connect with us on Discord!" });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`HOLLOWGRAVE Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
