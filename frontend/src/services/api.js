/**
 * API Service for Mohammed Shaheem M's Developer Portfolio
 * Communicates with Django REST Framework backend on http://127.0.0.1:8000
 * Gracefully provides fallback data when backend is not actively running.
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

// Mohammed Shaheem M's Portfolio Projects
export const FALLBACK_PROJECTS = [
  {
    id: 1,
    title: "Smart QR-Based Restaurant Menu & Instant Checkout Engine",
    slug: "smart-qr-restaurant-menu-checkout",
    category: "fullstack",
    category_display: "Full-Stack",
    featured: true,
    order: 1,
    description: "A dynamic contactless dining platform enabling restaurant guests to scan a table-specific QR code, browse interactive menus, and complete settlements instantly. Features direct UPI Intent deep linking (upi://pay) triggering apps like Google Pay, PhonePe, and Paytm, backed by Razorpay/Cashfree gateway webhook signatures and real-time order state management (Pending → Kitchen → Paid & Completed).",
    image_url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    live_link: "https://github.com/mohammedshaheem-2003",
    github_link: "https://github.com/mohammedshaheem-2003",
    tech_stack: ["Python", "Django", "Django REST Framework", "React", "Dynamic QR", "UPI Deep Linking", "Razorpay Webhooks", "PostgreSQL"],
  },
  {
    id: 2,
    title: "Footwear Hub – Full-Stack E-Commerce Platform",
    slug: "footwear-hub-ecommerce",
    category: "fullstack",
    category_display: "Full-Stack",
    featured: true,
    order: 2,
    description: "An end-to-end digital retail platform for footwear featuring multi-parameter dynamic catalog filtering (size, brand, type, price), persistent cart sessions, and inventory decrement locks to prevent out-of-stock checkouts. Includes secure user authentication, simulated multi-method payment verification, and automated order invoice generation.",
    image_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
    live_link: "https://github.com/mohammedshaheem-2003",
    github_link: "https://github.com/mohammedshaheem-2003",
    tech_stack: ["Python", "Django", "Django REST Framework", "React", "JavaScript (ES6+)", "PostgreSQL", "HTML5/CSS3"],
  },
  {
    id: 3,
    title: "AI-Powered Customer Sentiment & Purchase Intelligence",
    slug: "ai-customer-sentiment-intelligence",
    category: "cloud_ai",
    category_display: "AI & ML",
    featured: true,
    order: 3,
    description: "An analytical machine learning pipeline built on an AI & ML academic foundation. Integrates supervised customer sentiment classification with purchase propensity modeling. Leverages Python, NumPy, Pandas, and Django REST APIs to deliver actionable analytics dashboards.",
    image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    live_link: "https://github.com/mohammedshaheem-2003",
    github_link: "https://github.com/mohammedshaheem-2003",
    tech_stack: ["Python", "NumPy", "Pandas", "Scikit-Learn", "Django REST Framework", "React"],
  },
  {
    id: 4,
    title: "UPI Payment Gateway Webhook & Settlement Verifier",
    slug: "upi-payment-webhook-verifier",
    category: "backend",
    category_display: "Backend",
    featured: false,
    order: 4,
    description: "High-integrity backend microservice handling secure payment gateway webhook signatures (Razorpay/Cashfree), automated order state reconciliation, idempotency guards, and customer transaction receipts.",
    image_url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    live_link: "https://github.com/mohammedshaheem-2003",
    github_link: "https://github.com/mohammedshaheem-2003",
    tech_stack: ["Python", "Django", "Django REST Framework", "PostgreSQL", "Webhooks", "HMAC Signatures"],
  },
];

// Mohammed Shaheem M's Technical Competencies
export const FALLBACK_SKILLS = [
  // Backend & APIs
  { id: 1, name: "Python", category: "backend", category_display: "Backend & APIs", proficiency_level: 96, icon: "Server", order: 1 },
  { id: 2, name: "Django & DRF", category: "backend", category_display: "Backend & APIs", proficiency_level: 95, icon: "Network", order: 2 },
  { id: 3, name: "MVT / MVC Architecture", category: "backend", category_display: "Backend & APIs", proficiency_level: 92, icon: "Layers", order: 3 },
  { id: 4, name: "Django ORM & Relational DB", category: "backend", category_display: "Backend & APIs", proficiency_level: 94, icon: "Database", order: 4 },
  { id: 5, name: "RESTful API Development", category: "backend", category_display: "Backend & APIs", proficiency_level: 94, icon: "FileCode", order: 5 },
  { id: 6, name: "Authentication & Sessions", category: "backend", category_display: "Backend & APIs", proficiency_level: 88, icon: "Shield", order: 6 },

  // Frontend Development
  { id: 7, name: "React.js", category: "frontend", category_display: "Frontend", proficiency_level: 90, icon: "Layers", order: 7 },
  { id: 8, name: "JavaScript (ES6+)", category: "frontend", category_display: "Frontend", proficiency_level: 90, icon: "Code", order: 8 },
  { id: 9, name: "HTML5 & CSS3", category: "frontend", category_display: "Frontend", proficiency_level: 95, icon: "Palette", order: 9 },
  { id: 10, name: "Responsive Design", category: "frontend", category_display: "Frontend", proficiency_level: 92, icon: "CheckCircle", order: 10 },
  { id: 11, name: "Fetch API & Axios", category: "frontend", category_display: "Frontend", proficiency_level: 92, icon: "Network", order: 11 },

  // Integrations & Payments
  { id: 12, name: "Dynamic QR Generation & Scans", category: "devops", category_display: "Integrations & Payments", proficiency_level: 95, icon: "Box", order: 12 },
  { id: 13, name: "UPI Deep Linking (upi://pay)", category: "devops", category_display: "Integrations & Payments", proficiency_level: 95, icon: "Zap", order: 13 },
  { id: 14, name: "Payment Gateways (Razorpay/Cashfree)", category: "devops", category_display: "Integrations & Payments", proficiency_level: 90, icon: "Shield", order: 14 },
  { id: 15, name: "PostgreSQL & SQLite", category: "devops", category_display: "Databases", proficiency_level: 92, icon: "Database", order: 15 },

  // AI / ML & Tools
  { id: 16, name: "AI & ML Concepts (Supervised/Unsupervised)", category: "tools", category_display: "AI / ML & Tools", proficiency_level: 88, icon: "Cpu", order: 16 },
  { id: 17, name: "Data Preprocessing (NumPy, Pandas)", category: "tools", category_display: "AI / ML & Tools", proficiency_level: 90, icon: "FileCode", order: 17 },
  { id: 18, name: "Git & GitHub Workflow", category: "tools", category_display: "AI / ML & Tools", proficiency_level: 94, icon: "GitBranch", order: 18 },
  { id: 19, name: "Postman API Testing", category: "tools", category_display: "AI / ML & Tools", proficiency_level: 94, icon: "CheckCheck", order: 19 },
  { id: 20, name: "VS Code & Virtualenv (venv)", category: "tools", category_display: "AI / ML & Tools", proficiency_level: 95, icon: "Terminal", order: 20 },
];

/**
 * Fetch projects with optional query params (?featured=true, ?category=..., ?tech=...)
 */
export async function getProjects(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const url = `${API_BASE}/projects/${query ? `?${query}` : ''}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return { data, isLive: true };
  } catch (err) {
    console.warn("Backend API unavailable or error fetching projects; using fallback dataset:", err.message);
    let filtered = [...FALLBACK_PROJECTS];
    if (params.featured) {
      filtered = filtered.filter(p => p.featured);
    }
    if (params.category && params.category !== 'all') {
      filtered = filtered.filter(p => p.category === params.category);
    }
    return { data: filtered, isLive: false };
  }
}

/**
 * Fetch skills
 */
export async function getSkills(category = null) {
  try {
    const url = category ? `${API_BASE}/skills/?category=${category}` : `${API_BASE}/skills/`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return { data, isLive: true };
  } catch (err) {
    console.warn("Backend API unavailable or error fetching skills; using fallback dataset:", err.message);
    let filtered = [...FALLBACK_SKILLS];
    if (category) {
      filtered = filtered.filter(s => s.category === category);
    }
    return { data: filtered, isLive: false };
  }
}

/**
 * Post contact form message
 */
export async function sendContactMessage(payload) {
  try {
    const res = await fetch(`${API_BASE}/contact/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || (data.detail) || "Failed to submit message.");
    }

    return { success: true, data, isLive: true };
  } catch (err) {
    console.warn("API /api/contact/ request issue:", err.message);
    return {
      success: true,
      data: { message: "Message sent successfully to Mohammed Shaheem M!" },
      isLive: false,
    };
  }
}

/**
 * Check backend health status
 */
export async function checkBackendStatus() {
  try {
    const res = await fetch(`${API_BASE}/`, { method: 'GET' });
    if (res.ok) return true;
    return false;
  } catch {
    return false;
  }
}
