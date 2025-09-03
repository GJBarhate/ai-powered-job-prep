# AI-Powered Job Prep

**Author:** Gaurav Barhate  

AI-powered platform for interview preparation, resume review, and technical questions built with [Next.js](https://nextjs.org).

---

## Features

- AI-powered interview questions and technical prep
- Resume review with AI feedback
- User authentication and authorization with [Clerk](https://clerk.com/)
- Database management with PostgreSQL
- Voice and emotion analysis using [Hume AI](https://hume.ai/)
- Rate limiting and security using [Arcjet](https://arcjet.com/)
- AI question and resume generation using Google Gemini LLM
- Fully themed UI with Shadcn components

---

## Technologies & Usage

| Technology | Purpose |
|------------|---------|
| **Next.js** | Fullstack React framework for building the app |
| **TypeScript** | Type safety and better development experience |
| **Clerk** | User authentication, sign-in, sign-up, and user management |
| **PostgreSQL** | Database for storing users, jobs, interviews, questions, and resumes |
| **Arcjet** | Rate limiting and security for API endpoints |
| **Hume AI** | Voice and emotion analysis for interview feedback |
| **Google Gemini** | AI LLM for question and resume feedback generation |
| **Shadcn/UI** | Modern UI components and theming |
| **Vercel** | Deployment of the Next.js application |

---

## Getting Started

# Install Dependencies
npm install
# or
yarn install
# or
pnpm install

# Configure Environment Variables (create .env in root)
echo "# =========================
# PostgreSQL Database
DB_HOST=hostname
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=ai-job-prep
DATABASE_URL=postgres://postgres:password@hostname:5432/ai-job-prep

# =========================
# Clerk Authentication
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/app
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/onboarding
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
CLERK_WEBHOOK_SECRET=your_webhook_secret

# =========================
# Arcjet (Security)
ARCJET_KEY=your_arcjet_key

# =========================
# Hume AI (Voice/Emotion)
HUME_API_KEY=your_hume_api_key
HUME_SECRET_KEY=your_hume_secret_key
NEXT_PUBLIC_HUME_CONFIG_ID=your_hume_config_id

# =========================
# Google Gemini (LLM)
GEMINI_API_KEY=your_gemini_api_key" > .env

# Run Database Studio
npm run db:studio

# Run Development Server
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

# Open Browser
xdg-open http://localhost:3000  # Linux
# open http://localhost:3000    # macOS
# start http://localhost:3000   # Windows
