from django.core.management.base import BaseCommand
from api.models import Project, Skill, ContactMessage


class Command(BaseCommand):
    help = "Seed database with Mohammed Shaheem M's projects, technical skills, and profile data"

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.NOTICE("Seeding Mohammed Shaheem M's portfolio data..."))

        # Clear existing entries to ensure clean sync
        Skill.objects.all().delete()
        Project.objects.all().delete()

        self.stdout.write("Populating technical skills matrix...")
        skills_data = [
            # Backend & APIs
            {"name": "Python", "category": "backend", "proficiency_level": 96, "icon": "Server", "order": 1},
            {"name": "Django & DRF", "category": "backend", "proficiency_level": 95, "icon": "Network", "order": 2},
            {"name": "MVT / MVC Architecture", "category": "backend", "proficiency_level": 92, "icon": "Layers", "order": 3},
            {"name": "Django ORM & Relational DB", "category": "backend", "proficiency_level": 94, "icon": "Database", "order": 4},
            {"name": "RESTful API Development", "category": "backend", "proficiency_level": 94, "icon": "FileCode", "order": 5},
            {"name": "Authentication & Sessions", "category": "backend", "proficiency_level": 88, "icon": "Shield", "order": 6},

            # Frontend Development
            {"name": "React.js", "category": "frontend", "proficiency_level": 90, "icon": "Layers", "order": 7},
            {"name": "JavaScript (ES6+)", "category": "frontend", "proficiency_level": 90, "icon": "Code", "order": 8},
            {"name": "HTML5 & CSS3", "category": "frontend", "proficiency_level": 95, "icon": "Palette", "order": 9},
            {"name": "Responsive Design", "category": "frontend", "proficiency_level": 92, "icon": "CheckCircle", "order": 10},
            {"name": "Fetch API & Axios", "category": "frontend", "proficiency_level": 92, "icon": "Network", "order": 11},

            # Integrations & Payments
            {"name": "Dynamic QR Generation & Scans", "category": "devops", "proficiency_level": 95, "icon": "Box", "order": 12},
            {"name": "UPI Deep Linking (upi://pay)", "category": "devops", "proficiency_level": 95, "icon": "Zap", "order": 13},
            {"name": "Payment Gateways (Razorpay/Cashfree)", "category": "devops", "proficiency_level": 90, "icon": "Shield", "order": 14},
            {"name": "PostgreSQL & SQLite", "category": "devops", "proficiency_level": 92, "icon": "Database", "order": 15},

            # AI / ML & Tools
            {"name": "AI & ML Concepts (Supervised/Unsupervised)", "category": "tools", "proficiency_level": 88, "icon": "Cpu", "order": 16},
            {"name": "Data Preprocessing (NumPy, Pandas)", "category": "tools", "proficiency_level": 90, "icon": "FileCode", "order": 17},
            {"name": "Git & GitHub Workflow", "category": "tools", "proficiency_level": 94, "icon": "GitBranch", "order": 18},
            {"name": "Postman API Testing", "category": "tools", "proficiency_level": 94, "icon": "CheckCheck", "order": 19},
            {"name": "VS Code & Virtual Environments", "category": "tools", "proficiency_level": 95, "icon": "Terminal", "order": 20},
        ]

        for s in skills_data:
            Skill.objects.create(
                name=s["name"],
                category=s["category"],
                proficiency_level=s["proficiency_level"],
                icon=s["icon"],
                order=s["order"],
            )

        self.stdout.write("Populating Mohammed Shaheem M's showcase projects...")
        projects_data = [
            {
                "title": "Smart QR-Based Restaurant Menu & Instant Checkout Engine",
                "slug": "smart-qr-restaurant-menu-checkout",
                "category": "fullstack",
                "featured": True,
                "order": 1,
                "description": "A dynamic contactless dining platform enabling restaurant guests to scan a table-specific QR code, browse interactive menus, and complete settlements instantly. Features direct UPI Intent deep linking (upi://pay) triggering apps like Google Pay, PhonePe, and Paytm, backed by Razorpay/Cashfree gateway webhook signatures and real-time order state management (Pending -> Kitchen -> Paid & Completed).",
                "image_url": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
                "live_link": "https://github.com/mohammedshaheem-2003",
                "github_link": "https://github.com/mohammedshaheem-2003",
                "tech_stack": ["Python", "Django", "Django REST Framework", "React", "Dynamic QR", "UPI Deep Linking", "Razorpay Webhooks", "PostgreSQL"],
            },
            {
                "title": "Footwear Hub - Full-Stack E-Commerce Platform",
                "slug": "footwear-hub-ecommerce",
                "category": "fullstack",
                "featured": True,
                "order": 2,
                "description": "An end-to-end digital retail platform for footwear featuring multi-parameter dynamic catalog filtering (size, brand, type, price), persistent cart sessions, and inventory decrement locks to prevent out-of-stock checkouts. Includes secure user authentication, simulated multi-method payment verification, and automated order invoice generation.",
                "image_url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
                "live_link": "https://github.com/mohammedshaheem-2003",
                "github_link": "https://github.com/mohammedshaheem-2003",
                "tech_stack": ["Python", "Django", "Django REST Framework", "React", "JavaScript (ES6+)", "PostgreSQL", "HTML5/CSS3"],
            },
            {
                "title": "AI-Powered Customer Sentiment & Purchase Intelligence",
                "slug": "ai-customer-sentiment-intelligence",
                "category": "cloud_ai",
                "featured": True,
                "order": 3,
                "description": "An analytical machine learning pipeline built on an AI & ML academic foundation. Integrates supervised customer sentiment classification with purchase propensity modeling. Leverages Python, NumPy, Pandas, and Django REST APIs to deliver actionable analytics dashboards.",
                "image_url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
                "live_link": "https://github.com/mohammedshaheem-2003",
                "github_link": "https://github.com/mohammedshaheem-2003",
                "tech_stack": ["Python", "NumPy", "Pandas", "Scikit-Learn", "Django REST Framework", "React"],
            },
            {
                "title": "UPI Payment Gateway Webhook & Settlement Verifier",
                "slug": "upi-payment-webhook-verifier",
                "category": "backend",
                "featured": False,
                "order": 4,
                "description": "High-integrity backend microservice handling secure payment gateway webhook signatures (Razorpay/Cashfree), automated order state reconciliation, idempotency guards, and customer transaction receipts.",
                "image_url": "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
                "live_link": "https://github.com/mohammedshaheem-2003",
                "github_link": "https://github.com/mohammedshaheem-2003",
                "tech_stack": ["Python", "Django", "Django REST Framework", "PostgreSQL", "Webhooks", "HMAC Signatures"],
            },
        ]

        for p in projects_data:
            Project.objects.create(
                slug=p["slug"],
                title=p["title"],
                category=p["category"],
                featured=p["featured"],
                order=p["order"],
                description=p["description"],
                image_url=p["image_url"],
                live_link=p["live_link"],
                github_link=p["github_link"],
                tech_stack=p["tech_stack"],
            )

        self.stdout.write("Adding sample hiring inquiry...")
        ContactMessage.objects.get_or_create(
            email="tech-recruiter@enterprise.com",
            defaults={
                "name": "Arun Kumar",
                "subject": "Full-Stack Python Developer Role",
                "message": "Hi Shaheem, we were impressed by your QR and UPI payment architecture projects. Let's connect for an interview!",
                "is_read": False,
            }
        )

        self.stdout.write(self.style.SUCCESS("Successfully seeded Mohammed Shaheem M's portfolio!"))
