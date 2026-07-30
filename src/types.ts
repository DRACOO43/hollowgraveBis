export type Role = 'admin' | 'team' | 'client' | 'guest';

export interface UserSession {
  id: string;
  device: string;
  browser: string;
  ip: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

export interface ConnectedAccount {
  provider: 'google' | 'discord' | 'github';
  providerAccountId: string;
  email: string;
  connectedAt: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  role: Role;
  avatar: string;
  provider: 'credentials' | 'google' | 'discord';
  emailVerified: boolean;
  company?: string;
  phone?: string;
  bio?: string;
  website?: string;
  portfolioLinks?: string[];
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    discord?: string;
    instagram?: string;
  };
  coverBanner?: string;
  createdAt: string;
  updatedAt?: string;
  sessions?: UserSession[];
  connectedAccounts?: ConnectedAccount[];
}

export interface ServiceItem {
  id: string;
  title: string;
  category: 'video' | 'design' | 'dev' | 'branding' | 'ai';
  description: string;
  iconName: string;
  features: string[];
  startingPrice: number;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Websites' | 'Apps' | 'Editing' | 'Design' | 'Branding';
  client: string;
  image: string;
  description: string;
  longDescription: string;
  tags: string[];
  metrics: string;
  url?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tier: 'Starter' | 'Professional' | 'Business' | 'Enterprise';
  price: number;
  period: string;
  description: string;
  features: string[];
  deliveryTime: string;
  revisions: string;
  popular?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  skills: string[];
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    discord?: string;
  };
  projectsCompleted?: number;
  experience?: string;
  status?: string;
  verified?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  projectType: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
}

export interface Order {
  id: string;
  userId: string;
  serviceName: string;
  amount: number;
  currency: string;
  status: 'Pending' | 'Processing' | 'In Progress' | 'Completed';
  gateway: string;
  createdAt: string;
  invoiceUrl: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'Unread' | 'Replied';
}
