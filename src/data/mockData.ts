import { ServiceItem, PortfolioItem, PricingPlan, TeamMember, Testimonial, BlogPost } from '../types';

export const SERVICES: ServiceItem[] = [
  {
    id: 's-1',
    title: 'Professional Video Editing',
    category: 'video',
    description: 'Cinematic storytelling, seamless pacing, custom transitions, and Hollywood-grade color grading.',
    iconName: 'Video',
    features: ['4K / 8K Timeline Export', 'Advanced Sound Design', 'Color Grading & LUTs', 'Dynamic Subtitles'],
    startingPrice: 299
  },
  {
    id: 's-2',
    title: 'YouTube Video & Shorts Editing',
    category: 'video',
    description: 'High-retention editing engineered for maximum CTR and audience engagement on YouTube & TikTok.',
    iconName: 'PlaySquare',
    features: ['Hook Optimization', 'B-Roll & Sound Effects', 'Motion Typography', 'Shorts / Reels Repurposing'],
    startingPrice: 199
  },
  {
    id: 's-3',
    title: 'Thumbnail Designing',
    category: 'design',
    description: 'High-CTR, visually striking thumbnails designed using advanced psychological triggers.',
    iconName: 'Image',
    features: ['A/B Testing Variants', 'Custom 3D Elements', 'Advanced Photoshop Retouching', 'High-Contrast Psychology'],
    startingPrice: 75
  },
  {
    id: 's-4',
    title: 'Website & Web App Development',
    category: 'dev',
    description: 'Blazing fast, Apple-grade modern web applications built with React, Next.js, and Tailwind CSS.',
    iconName: 'Code',
    features: ['SSR & Performance 95+', 'Fully Responsive Layouts', 'Secure Authentication', 'Custom API Integrations'],
    startingPrice: 1499
  },
  {
    id: 's-5',
    title: 'Mobile Application Development',
    category: 'dev',
    description: 'Native and cross-platform iOS and Android apps with butter-smooth animations and robust backends.',
    iconName: 'Smartphone',
    features: ['React Native / Flutter', 'Push Notifications', 'Offline Sync', 'App Store Deployment'],
    startingPrice: 2499
  },
  {
    id: 's-6',
    title: 'UI/UX Design',
    category: 'design',
    description: 'Immersive Figma prototypes, user journey mapping, and futuristic design systems.',
    iconName: 'Layout',
    features: ['Figma Design Systems', 'Interactive Prototyping', 'User Research & Wireframes', 'Developer Handoff'],
    startingPrice: 899
  },
  {
    id: 's-7',
    title: 'Brand Identity & Logo Design',
    category: 'branding',
    description: 'Unique, aggressive, and memorable brand marks that leave a permanent mark in your industry.',
    iconName: 'PenTool',
    features: ['Custom Logo Typography', 'Brand Guidelines PDF', 'Social Media Kit', 'Vector Source Files'],
    startingPrice: 499
  },
  {
    id: 's-8',
    title: 'AI Automation Solutions',
    category: 'ai',
    description: 'Custom AI agents, automated workflows, and LLM integrations to scale your business operations.',
    iconName: 'Cpu',
    features: ['Custom GPT / Claude Agents', 'Zapier & Make Automation', 'Discord / Slack Bots', 'Data Scraping Pipelines'],
    startingPrice: 1299
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'p-client-1',
    title: 'First Client Video Order #1',
    category: 'Editing',
    client: 'Verified YouTube Client',
    image: 'https://img.youtube.com/vi/H5fvI7Gaezc/maxresdefault.jpg',
    description: 'High-retention cinematic editing, advanced pacing, and dynamic visual effects delivered for our first client order.',
    longDescription: 'Our debut client video project edited by Anshuman & Raja. Featuring professional grade color grading, custom sound design, rapid-fire pacing, and high-retention audience hook optimization.',
    tags: ['YouTube Editing', 'Premiere Pro', 'After Effects', 'Color Grading'],
    metrics: 'High Retention, Client Verified',
    url: 'https://youtu.be/H5fvI7Gaezc'
  },
  {
    id: 'p-client-2',
    title: 'First Client Video Order #2',
    category: 'Editing',
    client: 'Verified YouTube Client',
    image: 'https://img.youtube.com/vi/ztF6g2jYLOE/maxresdefault.jpg',
    description: 'Cinematic storytelling and professional post-production for our second verified client order.',
    longDescription: 'An immersive cinematic video edit featuring bespoke soundscapes, seamless transitions, and Hollywood-grade color correction.',
    tags: ['Cinematic Edit', 'DaVinci Resolve', 'Sound Design', 'Motion Graphics'],
    metrics: 'Exceptional Audience Engagement',
    url: 'https://youtu.be/ztF6g2jYLOE'
  },
  {
    id: 'p-1',
    title: 'Apex Vanguard - SaaS Platform',
    category: 'Websites',
    client: 'Apex Financial Tech',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
    description: 'Next-generation financial analytics dashboard with real-time stock visualization and dark mode UI.',
    longDescription: 'HOLLOWGRAVE engineered a complete architectural overhaul for Apex Vanguard. Built with React, TypeScript, and Tailwind, featuring sub-second load times, interactive D3 charts, and secure JWT session management.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Node.js'],
    metrics: '+340% User Engagement, 99.9% Uptime',
    url: 'https://example.com'
  },
  {
    id: 'p-2',
    title: 'CyberPulse - Neo Bank Mobile App',
    category: 'Apps',
    client: 'CyberPulse Global',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000',
    description: 'Futuristic mobile banking application with biometric security and crypto wallet integration.',
    longDescription: 'Designed and developed a seamless cross-platform mobile application featuring glassmorphism cards, instant peer-to-peer transfers, and biometric authentication.',
    tags: ['React Native', 'UI/UX', 'Node.js', 'PostgreSQL'],
    metrics: '50,000+ Downloads in 30 Days',
    url: 'https://example.com'
  },
  {
    id: 'p-3',
    title: 'Cinematic Documentary - The Silicon Grid',
    category: 'Editing',
    client: 'Netflix Originals Creator',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=1000',
    description: 'Full post-production, sound design, color grading, and motion graphics for a tech documentary.',
    longDescription: 'Our video editing team delivered an immersive 45-minute documentary with custom 3D infographic animations, Dolby Atmos sound mixing, and Hollywood color grade.',
    tags: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Sound Design'],
    metrics: '2.4M Views, #1 Trending Tech Doc',
    url: 'https://example.com'
  },
  {
    id: 'p-4',
    title: 'VoidTech Brand Identity & System',
    category: 'Branding',
    client: 'VoidTech Aerospace',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000',
    description: 'Complete visual identity, custom typography, 3D brand marks, and design system guidelines.',
    longDescription: 'Created a striking dark-mode futuristic brand identity for an aerospace startup, establishing their authority and market dominance.',
    tags: ['Brand Identity', 'Figma', '3D Motion', 'Typography'],
    metrics: 'Global Brand Recognition Award 2026',
    url: 'https://example.com'
  },
  {
    id: 'p-5',
    title: 'E-Commerce Luxury Watch Experience',
    category: 'Websites',
    client: 'Chronos Vault',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1000',
    description: 'Immersive 3D product showcase and high-conversion e-commerce platform with Stripe integration.',
    longDescription: 'Built an ultra-luxury online storefront with interactive 3D watch viewer, lightning-fast checkout, and automated multi-currency invoicing.',
    tags: ['Next.js', 'Stripe', 'Three.js', 'Tailwind'],
    metrics: '+215% Conversion Rate',
    url: 'https://example.com'
  },
  {
    id: 'p-6',
    title: 'AI Creator Hub - Thumbnail Suite',
    category: 'Design',
    client: 'Top 100 YouTube Creators',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1000',
    description: 'High-CTR thumbnail design campaign that generated over 50 Million total impressions.',
    longDescription: 'Executed a comprehensive thumbnail redesign strategy using advanced color theory, emotional framing, and high-contrast composition.',
    tags: ['Photoshop', 'Thumbnail Design', 'Psychology', 'Branding'],
    metrics: 'Average 14.8% CTR Across 50+ Videos',
    url: 'https://example.com'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'plan-1',
    name: 'Starter',
    tier: 'Starter',
    price: 499,
    period: 'per project',
    description: 'Essential digital boost for emerging creators and early-stage startups.',
    features: [
      '1 Professional Website OR 5 Videos',
      'Basic UI/UX & Responsive Design',
      'Standard 48-Hour Support',
      '1 Round of Revisions',
      'Source Files Included'
    ],
    deliveryTime: '5-7 Business Days',
    revisions: '1 Revision Round'
  },
  {
    id: 'plan-2',
    name: 'Professional',
    tier: 'Professional',
    price: 1499,
    period: 'per project',
    description: 'Our most popular comprehensive package for growing businesses and serious brands.',
    features: [
      'Full-Stack Web App OR 15 Cinematic Videos',
      'Custom Branding & Logo Suite',
      'Advanced Animations & Framer Polish',
      'Priority 24/7 VIP Support',
      'SEO & Performance Optimization'
    ],
    deliveryTime: '10-14 Business Days',
    revisions: 'Unlimited Revisions',
    popular: true
  },
  {
    id: 'plan-3',
    name: 'Business',
    tier: 'Business',
    price: 3499,
    period: 'per month',
    description: 'Dedicated creative agency team on retainer for continuous content and development.',
    features: [
      'Full-Stack Web & Mobile App Dev',
      'Unlimited Video Editing & Thumbnails',
      'Dedicated Developer & Designer',
      'AI Automation Workflow Integration',
      'Direct Slack / Discord Channel'
    ],
    deliveryTime: 'Continuous Sprint Delivery',
    revisions: 'Unlimited Revisions'
  },
  {
    id: 'plan-4',
    name: 'Enterprise',
    tier: 'Enterprise',
    price: 7999,
    period: 'per project',
    description: 'Custom bespoke infrastructure, enterprise architecture, and dominant brand scaling.',
    features: [
      'Enterprise Custom Software & Scale',
      'Full Creative Direction & Strategy',
      'Custom AI Agents & LLM Fine-Tuning',
      'Dedicated CTO & Creative Director',
      'SLA Guaranteed 99.99% Uptime'
    ],
    deliveryTime: 'Bespoke Timeline',
    revisions: 'Dedicated 24/7 Team'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Anshuman Bhalerao',
    role: 'Founder & Full Stack Developer',
    bio: 'Architecting high-performance web applications, scalable backends, and cutting-edge digital experiences with ruthless precision.',
    image: '/src/assets/images/regenerated_image_1785430914656.png',
    skills: ['Frontend Development', 'Backend Development', 'UI/UX Design', 'Video Editing', 'Thumbnail Design', 'Automation', 'Creative Direction'],
    projectsCompleted: 140,
    experience: '5+ Years Exp',
    status: 'Available for Core Architecture',
    verified: true,
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      instagram: 'https://instagram.com',
      discord: 'https://discord.gg/8znW9nfYhQ'
    }
  },
  {
    id: 'team-2',
    name: 'Raja Sahu',
    role: 'Co-Founder & Creative Director',
    bio: 'Mastering the art of visual impact, cinematic storytelling, and iconic brand identities that dominate global markets.',
    image: '/src/assets/images/regenerated_image_1785430918225.png',
    skills: ['Graphic Design', 'Video Editing', 'Brand Identity', 'Motion Graphics', 'Content Creation', 'Social Media Design'],
    projectsCompleted: 125,
    experience: '6+ Years Exp',
    status: 'Booking Creative Branding',
    verified: true,
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      instagram: 'https://instagram.com/mindever3',
      discord: 'https://discord.gg/8znW9nfYhQ'
    }
  },
  {
    id: 'team-3',
    name: 'Prince Jaiswal',
    role: 'Lead Video Editor & Motion Artist',
    bio: 'Crafting high-impact cinematic edits, engaging motion typography, and visual FX for high-growth creators and brands.',
    image: '/src/assets/images/regenerated_image_1785430921315.png',
    skills: ['Video Editing', 'Motion Graphics', 'Color Grading', 'VFX', 'After Effects', 'Premiere Pro', 'Thumbnail Design'],
    projectsCompleted: 95,
    experience: '4+ Years Exp',
    status: 'Available for Post-Production',
    verified: true,
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      instagram: 'https://instagram.com',
      discord: 'https://discord.gg/8znW9nfYhQ'
    }
  },
  {
    id: 'team-4',
    name: 'Kabir Singh',
    role: 'Lead Web & UI/UX Architect',
    bio: 'Specializing in modern interactive web applications, high-performance user interfaces, 3D visual assets, and seamless digital systems.',
    image: '/src/assets/images/regenerated_image_1785432367887.png',
    skills: ['React & TypeScript', 'UI/UX Design', 'Tailwind CSS', '3D Modeling', 'Web Animation', 'Brand Strategy', 'Frontend Arch'],
    projectsCompleted: 85,
    experience: '4+ Years Exp',
    status: 'Accepting UI/UX Systems',
    verified: true,
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      instagram: 'https://instagram.com',
      discord: 'https://discord.gg/8znW9nfYhQ'
    }
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Marcus Vance',
    company: 'CEO, Nexus AI',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    content: 'HOLLOWGRAVE delivered our web platform 3 days ahead of schedule. The design polish, animations, and speed are unmatched in the industry.',
    rating: 5,
    projectType: 'SaaS Web Development'
  },
  {
    id: 'test-2',
    name: 'Elena Rostova',
    company: 'Director of Growth, VibeStream',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    content: 'Anshuman and Raja transformed our brand identity completely. Our YouTube channel CTR jumped from 4.2% to 14.1% within 2 weeks of working with them.',
    rating: 5,
    projectType: 'Video Editing & Thumbnails'
  },
  {
    id: 'test-3',
    name: 'David Kelling',
    company: 'Founder, Apex Capital',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    content: 'Absolute masters of their craft. If you want a digital experience that feels like Apple or Linear, HOLLOWGRAVE is the only agency to call.',
    rating: 5,
    projectType: 'Full-Stack Platform & Branding'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'The Anatomy of a 10M+ View YouTube Thumbnail',
    excerpt: 'Deep dive into visual psychology, contrast ratios, and emotional hooks that compel users to click.',
    content: 'Thumbnails are the single most important factor in YouTube CTR. In this article, our creative director Raja Sahu breaks down the exact framework used to generate over 50M impressions...',
    category: 'Design & Thumbnails',
    author: 'Raja Sahu',
    date: 'July 5, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'blog-2',
    title: 'Building Sub-Second Full-Stack Apps with React & Node',
    excerpt: 'Performance optimization strategies for modern web applications operating at global scale.',
    content: 'Speed is everything in 2026. Users expect instant interactions and buttery smooth 120fps animations. Here is how Anshuman Bhalerao structures high-performance full-stack architectures...',
    category: 'Development',
    author: 'Anshuman Bhalerao',
    date: 'July 2, 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'blog-3',
    title: 'How AI Automation is Transforming Modern Creative Agencies',
    excerpt: 'Leveraging LLMs and custom workflow agents to automate repetitive client operations.',
    content: 'AI is no longer a futuristic buzzword—it is the core operating system of high-margin creative agencies. Discover how we integrate autonomous workflows into client projects...',
    category: 'AI & Automation',
    author: 'Anshuman Bhalerao',
    date: 'June 28, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=800'
  }
];

export const FAQS = [
  {
    question: 'What makes HOLLOWGRAVE different from traditional agencies?',
    answer: 'We combine elite engineering (React, Next.js, AI automation) with high-end creative direction (cinematic video editing, motion graphics, and Apple-grade UI/UX). We build for speed, aesthetic dominance, and conversion.'
  },
  {
    question: 'Who will be working on my project?',
    answer: 'Your project is personally spearheaded by founders Anshuman Bhalerao (Full Stack & Tech) and Raja Sahu (Creative Director & Design), backed by our elite team of specialists.'
  },
  {
    question: 'What is the typical turnaround time?',
    answer: 'Starter projects typically deliver within 5-7 business days, while comprehensive professional web apps and video packages take 10-14 days. Retainer business plans operate on continuous sprint delivery.'
  },
  {
    question: 'How do payments and invoicing work?',
    answer: 'We support all major payment gateways including Stripe, Razorpay, UPI, Google Pay, PhonePe, and Credit/Debit cards with secure instant invoice generation.'
  },
  {
    question: 'Do you offer ongoing support after project launch?',
    answer: 'Yes! All projects include post-launch warranty and maintenance, with ongoing retainer options available for continuous feature updates and content production.'
  }
];
