# Modern Developer Portfolio: React + Django REST Framework

An ultra-modern, responsive, production-ready developer portfolio website engineered with a decoupled architecture:
- **Backend**: Python 3.11+ / Django 5.2 / Django REST Framework (DRF) / SQLite (Dev) / PostgreSQL (Prod ready) / CORS headers
- **Frontend**: React 18 / Vite / Vanilla Modern CSS Design System (Custom tokens, Dark & Light mode) / Lucide React Icons

---

## Architecture & Directory Structure

```
portfolio/
├── backend/                              # Django REST API
│   ├── manage.py                         # Django CLI management utility
│   ├── requirements.txt                  # Python dependencies
│   ├── .env.example                      # Sample environment configurations
│   ├── db.sqlite3                        # Pre-configured & seeded local database
│   ├── portfolio_backend/                # Core Django project package
│   │   ├── __init__.py
│   │   ├── settings.py                   # DRF, CORS, Database, and Email settings
│   │   ├── urls.py                       # Root URL routing (/api/ & /admin/)
│   │   ├── wsgi.py
│   │   └── asgi.py
│   └── api/                              # Portfolio Application Module
│       ├── __init__.py
│       ├── admin.py                      # Customized Django admin portal
│       ├── models.py                     # Project, Skill, and ContactMessage models
│       ├── serializers.py                # DRF ModelSerializers with validation & email trigger
│       ├── views.py                      # ProjectList, SkillList, ContactCreate views
│       ├── urls.py                       # Endpoint definitions
│       ├── tests.py                      # Comprehensive automated API unit tests
│       └── management/commands/
│           └── seed_data.py              # Realistic sample portfolio data seeder
│
└── frontend/                             # React SPA (Vite)
    ├── package.json                      # Scripts & npm dependencies
    ├── vite.config.js                    # Dev server configuration with backend proxy
    ├── index.html                        # SEO meta tags, Google Fonts (Inter & JetBrains Mono)
    └── src/
        ├── index.css                     # Modern CSS design system (tokens, dark/light, glassmorphism)
        ├── main.jsx                      # React 18 DOM mount point
        ├── App.jsx                       # Root layout & section scroll-spy
        ├── context/
        │   └── ThemeContext.jsx          # Dark/Light theme provider with localStorage sync
        ├── services/
        │   └── api.js                    # Fetch API client with offline fallback resilience
        └── components/
            ├── Navbar.jsx                # Responsive sticky nav, brand badge, theme toggle
            ├── Hero.jsx                  # Typewriter effect, availability pill, CTAs, socials
            ├── About.jsx                 # Bio narrative, live stats counters, career timeline
            ├── Skills.jsx                # Categorized tabs, proficiency bars, dynamic icons
            ├── Projects.jsx              # Category filters, responsive cards, preview triggers
            ├── ProjectModal.jsx          # Interactive detail modal with live link & GitHub actions
            ├── Contact.jsx               # Form with client-side validation & POST /api/contact/
            ├── Toast.jsx                 # Success/error notifications with auto-dismiss
            └── Footer.jsx                # Stack attribution, quick links, back-to-top button
```

---

## Step-by-Step Setup Guide

### 1. Prerequisites
Ensure you have the following installed:
- **Python 3.10+** (`python --version`)
- **Node.js 18+ & npm** (`node -v`, `npm -v`)

---

### 2. Backend Setup (Django & DRF)

1. Open a terminal and navigate to the `backend/` directory:
   ```bash
   cd backend
   ```

2. (Optional but recommended) Create and activate a Python virtual environment:
   ```bash
   # Windows PowerShell
   python -m venv venv
   .\venv\Scripts\Activate.ps1

   # macOS / Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

4. Run database migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. Seed sample projects and skills into the database:
   ```bash
   python manage.py seed_data
   ```

6. (Optional) Create an admin superuser to manage content via the Django admin dashboard:
   ```bash
   python manage.py createsuperuser
   ```

7. Start the Django development server:
   ```bash
   python manage.py runserver 127.0.0.1:8000
   ```
   The backend REST API will now be live at `http://127.0.0.1:8000/`.

---

### 3. Frontend Setup (React & Vite)

1. Open a new terminal and navigate to the `frontend/` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   # In Windows PowerShell (or standard npm)
   npm.cmd install
   # or
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm.cmd run dev
   # or
   npm run dev
   ```

4. Open your browser at:
   ```
   http://localhost:5173
   ```

---

## REST API Endpoints

| Method | Endpoint | Description | Query Parameters |
|---|---|---|---|
| `GET` | `/api/` | API directory & status check | None |
| `GET` | `/api/projects/` | Retrieve all projects | `?featured=true`, `?category=frontend`, `?tech=react`, `?search=devops` |
| `GET` | `/api/projects/<slug>/` | Retrieve single project details | None |
| `GET` | `/api/skills/` | Retrieve skills list | `?category=frontend` (`backend`, `devops`, `tools`) |
| `POST` | `/api/contact/` | Submit contact form inquiry | JSON Body (`name`, `email`, `subject`, `message`) |

### Example API Request: Submit Contact Form
```bash
curl -X POST http://127.0.0.1:8000/api/contact/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sarah Connor",
    "email": "sarah@techventures.io",
    "subject": "Lead Full-Stack Role",
    "message": "Hi Alex, we would love to discuss an engineering leadership opportunity with you!"
  }'
```

---

## Key Features & Highlights

1. **Decoupled Architecture**: Standalone React single-page application communicating cleanly with Django REST Framework via REST endpoints.
2. **Offline Graceful Fallback**: The React frontend (`src/services/api.js`) automatically detects whether the Django server is online. If offline during quick preview, it displays realistic cached portfolio data and an informative status pill.
3. **Persisted Dark / Light Mode**: Seamless theme switcher saving user preferences to `localStorage` with fluid CSS transitions.
4. **Interactive UI / UX**:
   - Dynamic typewriter effect cycling through roles.
   - Project preview modals with keyboard (ESC) accessibility.
   - Category filtering for both projects and technical skills.
   - Comprehensive contact form with client-side validation, error messages, and animated toast feedback.
5. **Django Admin Experience**: Configured with custom search bars, category filters, quick read/unread message actions, and slug auto-population.
6. **Automated Unit Testing**: Includes DRF test suite in `backend/api/tests.py` covering all endpoints, query filtering, and model validations.
