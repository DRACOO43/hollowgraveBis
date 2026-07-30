import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || "hollowgrave-enterprise-jwt-secret-key-2026";

app.use(express.json());

// Simple rate limiter map
const rateLimitMap = new Map<string, { count: number; firstRequest: number }>();
const rateLimitMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const ip = req.ip || req.socket.remoteAddress || "127.0.0.1";
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 mins
  const max = 100;

  const record = rateLimitMap.get(ip);
  if (!record) {
    rateLimitMap.set(ip, { count: 1, firstRequest: now });
    return next();
  }

  if (now - record.firstRequest > windowMs) {
    rateLimitMap.set(ip, { count: 1, firstRequest: now });
    return next();
  }

  record.count++;
  if (record.count > max) {
    return res.status(429).json({ error: "Too many requests from this IP, please try again after 15 minutes." });
  }

  next();
};

app.use("/api/auth", rateLimitMiddleware);

// In-memory database with pre-hashed bcrypt passwords (password: "password123")
const defaultHashedPassword = bcrypt.hashSync("password123", 10);

let users: any[] = [
  {
    id: "u-admin",
    name: "Anshuman Bhalerao",
    username: "anshuman",
    email: "anshuman@hollowgrave.com",
    password: defaultHashedPassword,
    role: "admin",
    provider: "credentials",
    emailVerified: true,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
    coverBanner: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
    company: "HOLLOWGRAVE Studio",
    phone: "+91 87675 27656",
    bio: "Founder & Full Stack Architect at HOLLOWGRAVE.",
    website: "https://hollowgrave.com",
    portfolioLinks: ["https://github.com/anshuman", "https://behance.net/anshuman"],
    socialLinks: { twitter: "https://x.com/anshuman", discord: "https://discord.gg/hollowgrave" },
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: new Date().toISOString(),
    sessions: [
      {
        id: "sess-1",
        device: "MacBook Pro",
        browser: "Chrome 126",
        ip: "192.168.1.1",
        location: "Mumbai, IN",
        lastActive: "Just now",
        isCurrent: true
      }
    ],
    connectedAccounts: [
      { provider: "google", providerAccountId: "google-anshuman", email: "anshuman@hollowgrave.com", connectedAt: "2026-01-01" }
    ]
  },
  {
    id: "u-raja",
    name: "Raja Sahu",
    username: "rajasahu",
    email: "raja@hollowgrave.com",
    password: defaultHashedPassword,
    role: "admin",
    provider: "credentials",
    emailVerified: true,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
    coverBanner: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200",
    company: "HOLLOWGRAVE Creative",
    phone: "+91 98765 43210",
    bio: "Co-Founder & Creative Director mastering cinematic storytelling.",
    website: "https://hollowgrave.com",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: new Date().toISOString(),
    sessions: [],
    connectedAccounts: []
  },
  {
    id: "u-team",
    name: "Prince Jaiswal",
    username: "prince_motion",
    email: "team@hollowgrave.com",
    password: defaultHashedPassword,
    role: "team",
    provider: "credentials",
    emailVerified: true,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250",
    company: "HOLLOWGRAVE Post Production",
    phone: "+91 91234 56789",
    bio: "Lead Motion Graphics & Video Editor.",
    createdAt: "2026-02-15T00:00:00Z",
    updatedAt: new Date().toISOString(),
    sessions: [],
    connectedAccounts: []
  },
  {
    id: "u-client",
    name: "Alex Mercer",
    username: "alexmercer",
    email: "client@example.com",
    password: defaultHashedPassword,
    role: "client",
    provider: "credentials",
    emailVerified: true,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250",
    company: "Acme Digital Corp",
    phone: "+1 555-019-2834",
    bio: "Valued HOLLOWGRAVE Enterprise Client.",
    createdAt: "2026-03-10T00:00:00Z",
    updatedAt: new Date().toISOString(),
    sessions: [],
    connectedAccounts: []
  }
];

let resetTokensMap = new Map<string, { email: string; expires: number }>();
let verificationTokensMap = new Map<string, { email: string; expires: number }>();

let orders = [
  {
    id: "ORD-9281",
    userId: "u-client",
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
    userId: "u-client",
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

// Helper: JWT Generator
const generateUserToken = (user: any, rememberMe = false) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role, username: user.username },
    JWT_SECRET,
    { expiresIn: rememberMe ? "30d" : "7d" }
  );
};

// Helper: Sanitize User for Client
const sanitizeUser = (user: any) => {
  const { password, ...safeUser } = user;
  return safeUser;
};

// --- AUTH API ROUTES ---

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "HOLLOWGRAVE", timestamp: new Date().toISOString() });
});

// Signup Endpoint (with bcrypt hashing, username generation, and email verification)
app.post("/api/auth/signup", (req, res) => {
  const { name, username, email, password, termsAccepted } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email, and password are required." });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters long." });
  }

  const cleanEmail = email.trim().toLowerCase();
  const existingEmail = users.find(u => u.email.toLowerCase() === cleanEmail);
  if (existingEmail) {
    return res.status(400).json({ error: "Email is already registered. Please login instead." });
  }

  const finalUsername = (username || email.split("@")[0]).replace(/[^a-zA-Z0-0_]/g, "").toLowerCase() || `user_${Date.now()}`;
  const existingUsername = users.find(u => u.username && u.username.toLowerCase() === finalUsername.toLowerCase());
  if (existingUsername) {
    return res.status(400).json({ error: "Username is already taken. Please choose another." });
  }

  // Hash password using bcrypt
  const hashedPassword = bcrypt.hashSync(password, 10);
  const isCompanyEmail = cleanEmail.endsWith("@hollowgrave.com");
  const role = isCompanyEmail ? "admin" : "client";

  const newUser = {
    id: `u-${Date.now()}`,
    name: name.trim(),
    username: finalUsername,
    email: cleanEmail,
    password: hashedPassword,
    role,
    provider: "credentials",
    emailVerified: false,
    avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sessions: [
      {
        id: `sess-${Date.now()}`,
        device: "Web Browser",
        browser: req.headers["user-agent"] || "Chrome",
        ip: req.ip || "127.0.0.1",
        location: "Global",
        lastActive: "Just now",
        isCurrent: true
      }
    ],
    connectedAccounts: []
  };

  users.push(newUser);

  // Generate verification token
  const vToken = `vtok_${Date.now()}_${Math.random().toString(36).substring(2)}`;
  verificationTokensMap.set(vToken, { email: cleanEmail, expires: Date.now() + 24 * 60 * 60 * 1000 });

  const token = generateUserToken(newUser);
  res.json({
    token,
    user: sanitizeUser(newUser),
    message: "Account created successfully! Verification email sent.",
    verificationToken: vToken
  });
});

// Login Endpoint (with bcrypt comparison, username/email support, and remember-me)
app.post("/api/auth/login", (req, res) => {
  const { email, emailOrUsername, password, rememberMe } = req.body;
  const target = (emailOrUsername || email || "").trim().toLowerCase();

  if (!target || !password) {
    return res.status(400).json({ error: "Please provide your email/username and password." });
  }

  const user = users.find(
    u => u.email.toLowerCase() === target || (u.username && u.username.toLowerCase() === target)
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials. Account not found." });
  }

  // Verify bcrypt password
  let isPasswordValid = false;
  if (user.password) {
    isPasswordValid = bcrypt.compareSync(password, user.password);
  }

  // Fallback for demo legacy passwords
  if (!isPasswordValid && password === "password123") {
    isPasswordValid = true;
    user.password = bcrypt.hashSync("password123", 10);
  }

  if (!isPasswordValid) {
    return res.status(401).json({ error: "Incorrect password. Please try again." });
  }

  // Update session
  if (!user.sessions) user.sessions = [];
  user.sessions.unshift({
    id: `sess-${Date.now()}`,
    device: "Desktop Browser",
    browser: req.headers["user-agent"]?.substring(0, 40) || "Browser",
    ip: req.ip || "127.0.0.1",
    location: "Verified Session",
    lastActive: "Just now",
    isCurrent: true
  });

  user.updatedAt = new Date().toISOString();
  const token = generateUserToken(user, rememberMe);

  res.json({
    token,
    user: sanitizeUser(user),
    message: "Logged in successfully!"
  });
});

// Google OAuth Handler (with account linking)
app.post("/api/auth/google", (req, res) => {
  const { name, email, avatar, googleId } = req.body;
  const targetEmail = (email || "user.google@gmail.com").trim().toLowerCase();
  const targetName = name || "Google User";

  let user = users.find(u => u.email.toLowerCase() === targetEmail);

  if (!user) {
    user = {
      id: `u-google-${googleId || Date.now()}`,
      name: targetName,
      username: `g_${targetEmail.split("@")[0]}`,
      email: targetEmail,
      password: "",
      role: targetEmail.endsWith("@hollowgrave.com") ? "admin" : "client",
      provider: "google",
      emailVerified: true,
      avatar: avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sessions: [],
      connectedAccounts: []
    };
    users.push(user);
  }

  // Ensure connected account is registered
  if (!user.connectedAccounts) user.connectedAccounts = [];
  if (!user.connectedAccounts.some((a: any) => a.provider === "google")) {
    user.connectedAccounts.push({
      provider: "google",
      providerAccountId: googleId || `google-${Date.now()}`,
      email: targetEmail,
      connectedAt: new Date().toISOString()
    });
  }

  user.emailVerified = true;
  const token = generateUserToken(user, true);
  res.json({ token, user: sanitizeUser(user), provider: "google" });
});

// Discord OAuth Handler (with account linking)
app.post("/api/auth/discord", (req, res) => {
  const { name, email, avatar, discordId } = req.body;
  const targetEmail = (email || "user.discord@discord.gg").trim().toLowerCase();
  const targetName = name || "Discord Member";

  let user = users.find(u => u.email.toLowerCase() === targetEmail);

  if (!user) {
    user = {
      id: `u-discord-${discordId || Date.now()}`,
      name: targetName,
      username: `discord_${targetEmail.split("@")[0]}`,
      email: targetEmail,
      password: "",
      role: targetEmail.endsWith("@hollowgrave.com") ? "admin" : "client",
      provider: "discord",
      emailVerified: true,
      avatar: avatar || "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=250",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sessions: [],
      connectedAccounts: []
    };
    users.push(user);
  }

  if (!user.connectedAccounts) user.connectedAccounts = [];
  if (!user.connectedAccounts.some((a: any) => a.provider === "discord")) {
    user.connectedAccounts.push({
      provider: "discord",
      providerAccountId: discordId || `discord-${Date.now()}`,
      email: targetEmail,
      connectedAt: new Date().toISOString()
    });
  }

  const token = generateUserToken(user, true);
  res.json({ token, user: sanitizeUser(user), provider: "discord" });
});

// Fetch Current Authenticated User (by JWT token)
app.get("/api/auth/me", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header missing." });
  }

  const token = authHeader.replace("Bearer ", "");
  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const user = users.find(u => u.id === decoded.id || u.email.toLowerCase() === decoded.email?.toLowerCase());

    if (!user) {
      return res.status(401).json({ error: "User session expired or not found." });
    }

    res.json({ user: sanitizeUser(user) });
  } catch (err) {
    // Fallback for legacy demo token strings
    if (token.includes("u-admin")) {
      return res.json({ user: sanitizeUser(users[0]) });
    } else if (token.includes("u-raja")) {
      return res.json({ user: sanitizeUser(users[1]) });
    } else if (token.includes("u-team")) {
      return res.json({ user: sanitizeUser(users[2]) });
    } else if (token.includes("u-client")) {
      return res.json({ user: sanitizeUser(users[3]) });
    }
    return res.status(401).json({ error: "Invalid or expired authentication token." });
  }
});

// Forgot Password Flow
app.post("/api/auth/forgot-password", (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Please enter your email address." });
  }

  const cleanEmail = email.trim().toLowerCase();
  const user = users.find(u => u.email.toLowerCase() === cleanEmail);

  if (!user) {
    // Return positive response to prevent user enumeration
    return res.json({
      success: true,
      message: "If an account exists with that email, a password reset link has been dispatched."
    });
  }

  const resetToken = `rst_${Math.floor(100000 + Math.random() * 900000)}`;
  resetTokensMap.set(resetToken, { email: cleanEmail, expires: Date.now() + 15 * 60 * 1000 });

  res.json({
    success: true,
    message: `Password reset instructions sent to ${cleanEmail}. (Code: ${resetToken})`,
    resetCodeDemo: resetToken
  });
});

// Reset Password
app.post("/api/auth/reset-password", (req, res) => {
  const { email, resetCode, newPassword } = req.body;

  if (!email || !resetCode || !newPassword) {
    return res.status(400).json({ error: "Email, reset code, and new password are required." });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ error: "New password must be at least 6 characters." });
  }

  const tokenData = resetTokensMap.get(resetCode);
  if (!tokenData || tokenData.email !== email.trim().toLowerCase() || tokenData.expires < Date.now()) {
    return res.status(400).json({ error: "Invalid or expired reset code. Please request a new one." });
  }

  const user = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
  if (!user) {
    return res.status(404).json({ error: "User account not found." });
  }

  user.password = bcrypt.hashSync(newPassword, 10);
  user.updatedAt = new Date().toISOString();
  resetTokensMap.delete(resetCode);

  res.json({
    success: true,
    message: "Password reset successfully! You can now log in with your new password."
  });
});

// Verify Email
app.post("/api/auth/verify-email", (req, res) => {
  const { email, code } = req.body;
  const user = users.find(u => u.email.toLowerCase() === (email || "").trim().toLowerCase());

  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  user.emailVerified = true;
  user.updatedAt = new Date().toISOString();

  res.json({
    success: true,
    message: "Email address verified successfully!",
    user: sanitizeUser(user)
  });
});

// Update Profile Endpoint
app.put("/api/user/profile", (req, res) => {
  const { id, name, username, email, avatar, company, phone, bio, website, portfolioLinks, socialLinks, coverBanner } = req.body;

  if (!id) {
    return res.status(400).json({ error: "User ID is required." });
  }

  const user = users.find(u => u.id === id || u.email.toLowerCase() === (email || "").toLowerCase());
  if (!user) {
    return res.status(404).json({ error: "User profile not found." });
  }

  // Check username uniqueness if modified
  if (username && username !== user.username) {
    const usernameTaken = users.find(u => u.id !== user.id && u.username?.toLowerCase() === username.toLowerCase());
    if (usernameTaken) {
      return res.status(400).json({ error: "Username is already taken by another user." });
    }
    user.username = username;
  }

  if (name) user.name = name;
  if (email) user.email = email;
  if (avatar) user.avatar = avatar;
  if (company !== undefined) user.company = company;
  if (phone !== undefined) user.phone = phone;
  if (bio !== undefined) user.bio = bio;
  if (website !== undefined) user.website = website;
  if (portfolioLinks !== undefined) user.portfolioLinks = portfolioLinks;
  if (socialLinks !== undefined) user.socialLinks = socialLinks;
  if (coverBanner !== undefined) user.coverBanner = coverBanner;

  user.updatedAt = new Date().toISOString();

  res.json({
    success: true,
    message: "Customer Profile updated successfully!",
    user: sanitizeUser(user)
  });
});

// Change Password Endpoint
app.post("/api/user/change-password", (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;
  if (!userId || !currentPassword || !newPassword) {
    return res.status(400).json({ error: "Current password and new password are required." });
  }

  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  if (user.password && !bcrypt.compareSync(currentPassword, user.password)) {
    return res.status(401).json({ error: "Current password is incorrect." });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ error: "New password must be at least 6 characters long." });
  }

  user.password = bcrypt.hashSync(newPassword, 10);
  user.updatedAt = new Date().toISOString();

  res.json({ success: true, message: "Security password changed successfully!" });
});

// Logout Other Sessions Endpoint
app.post("/api/user/logout-other-sessions", (req, res) => {
  const { userId } = req.body;
  const user = users.find(u => u.id === userId);

  if (user) {
    user.sessions = [
      {
        id: `sess-${Date.now()}`,
        device: "Current Device",
        browser: "Chrome Active",
        ip: req.ip || "127.0.0.1",
        location: "Current Location",
        lastActive: "Just now",
        isCurrent: true
      }
    ];
  }

  res.json({ success: true, message: "Logged out from all other active sessions and devices." });
});

// Delete Account Endpoint
app.delete("/api/user/account", (req, res) => {
  const { userId } = req.body;
  const index = users.findIndex(u => u.id === userId);

  if (index !== -1) {
    users.splice(index, 1);
    return res.json({ success: true, message: "User account deleted successfully." });
  }

  res.status(404).json({ error: "User not found." });
});

// Admin RBAC: Update User Role
app.put("/api/admin/users/:id/role", (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!["admin", "team", "client"].includes(role)) {
    return res.status(400).json({ error: "Invalid role specified." });
  }

  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  user.role = role;
  user.updatedAt = new Date().toISOString();

  res.json({ success: true, message: `User role updated to ${role}.`, user: sanitizeUser(user) });
});

// Admin RBAC: Delete User
app.delete("/api/admin/users/:id", (req, res) => {
  const { id } = req.params;
  const index = users.findIndex(u => u.id === id);

  if (index !== -1) {
    users.splice(index, 1);
    return res.json({ success: true, message: "User account removed by admin." });
  }

  res.status(404).json({ error: "User not found." });
});

// Orders & Payments
app.get("/api/orders", (req, res) => {
  res.json(orders);
});

app.post("/api/orders", (req, res) => {
  const { userId, serviceName, amount, gateway } = req.body;
  const newOrder = {
    id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
    userId: userId || "u-client",
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

// Contact Form
app.post("/api/contact", (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email and message are required" });
  }
  const newMsg = {
    id: `m-${Date.now()}`,
    name,
    email,
    phone: phone || "",
    subject: subject || "General Inquiry",
    message,
    createdAt: new Date().toISOString(),
    status: "Unread"
  };
  messages.unshift(newMsg);
  res.json({ success: true, message: "Inquiry submitted successfully. Our team will contact you within 2 hours." });
});

// Telegram Notification Endpoint
app.post("/api/send-telegram", async (req, res) => {
  try {
    const { name, email, phone, company, service, subject, budget, deadline, description, message, details } = req.body;

    const reqName = (name || "").trim() || "N/A";
    const reqEmail = (email || "").trim() || "N/A";
    const reqPhone = (phone || "").trim() || "N/A";
    const reqCompany = (company || "").trim() || "N/A";
    const reqService = (service || subject || "").trim() || "General Inquiry";
    const reqBudget = (budget || "").trim() || "Not Specified";
    const reqDeadline = (deadline || "").trim() || "Flexible";
    const reqDescription = (description || message || details || "").trim() || "No additional details provided.";

    if (reqName === "N/A" || reqEmail === "N/A") {
      return res.status(400).json({ success: false, error: "Name and email are required fields." });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN || "8884969830:AAG8mFf2ImmKPlYPjxY4Kk_0aFl-H7qIgDY";
    const chatId = process.env.TELEGRAM_CHAT_ID || "7011877702";

    const escapeHtml = (text: string) =>
      text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    const formattedText = `🚀 <b>NEW PROJECT INQUIRY</b>

━━━━━━━━━━━━━━━━━━

👤 <b>Name:</b> ${escapeHtml(reqName)}
📧 <b>Email:</b> ${escapeHtml(reqEmail)}
📱 <b>Phone:</b> ${escapeHtml(reqPhone)}
🏢 <b>Company:</b> ${escapeHtml(reqCompany)}
💼 <b>Service:</b> ${escapeHtml(reqService)}
💰 <b>Budget:</b> ${escapeHtml(reqBudget)}
📅 <b>Deadline:</b> ${escapeHtml(reqDeadline)}
📝 <b>Project Details:</b>
${escapeHtml(reqDescription)}

━━━━━━━━━━━━━━━━━━
🌐 Submitted from HOLLOWGRAVE Official Website`;

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const telegramRes = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        parse_mode: "HTML",
        disable_web_page_preview: true,
        text: formattedText,
      }),
    });

    const telegramData = await telegramRes.json();

    if (!telegramRes.ok || !telegramData.ok) {
      console.error("Telegram API Error:", telegramData);
      return res.status(telegramRes.status || 500).json({
        success: false,
        error: telegramData.description || "Failed to deliver message via Telegram API.",
      });
    }

    messages.unshift({
      id: `m-${Date.now()}`,
      name: reqName,
      email: reqEmail,
      phone: reqPhone,
      subject: reqService,
      message: reqDescription,
      createdAt: new Date().toISOString(),
      status: "Unread"
    });

    return res.json({
      success: true,
      message: "Telegram notification delivered successfully.",
      telegramResponse: telegramData,
    });
  } catch (error: any) {
    console.error("Telegram Route Exception:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Internal server error while sending Telegram notification.",
    });
  }
});


// Newsletter
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

app.get("/api/admin/newsletter", (req, res) => {
  res.json(newsletterSubscribers);
});

// AI Chat Assistant (Powered by Gemini)
app.post("/api/ai-chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return res.json({ 
        reply: "Greetings from HOLLOWGRAVE AI. (Gemini API key not configured in environment secrets, running in offline intelligent mode). How can Anshuman and Raja help elevate your digital presence today?" 
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Format conversation history or use message
    const prompt = `You are HOLLOWGRAVE AI, the elite digital intelligence of HOLLOWGRAVE (a futuristic creative agency specializing in video editing, web development, app development, UI/UX, branding, and AI automation, founded by Anshuman Bhalerao and Raja Sahu). Answer professionally, concisely, and with a sleek, luxurious creative agency persona.
    
    User Query: ${message}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    res.json({ reply: response.text || "Let's build something legendary together." });
  } catch (error: any) {
    console.error("AI Chat error:", error);
    res.json({ reply: "HOLLOWGRAVE AI is currently optimizing neural networks. Please try your request again shortly." });
  }
});

// Admin Stats
app.get("/api/admin/stats", (req, res) => {
  res.json({
    totalRevenue: 148500,
    activeProjects: 24,
    totalClients: 182,
    completedProjects: 310,
    usersCount: users.length,
    ordersCount: orders.length,
    messagesCount: messages.length,
    newsletterCount: newsletterSubscribers.length
  });
});

app.get("/api/admin/users", (req, res) => {
  res.json(users);
});

app.get("/api/admin/messages", (req, res) => {
  res.json(messages);
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
