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

1. **Install Dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install


2. **Configure Environment Variables**

Create a `.env` file in the root of the project with the following structure:

```env
# =========================
# PostgreSQL Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=ai-job-prep
DATABASE_URL=postgres://postgres:password@localhost:5432/ai-job-prep

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
GEMINI_API_KEY=your_gemini_api_key


### 3. Run Database Studio

Run the following command to open a UI and inspect your PostgreSQL database tables:

```bash
npm run db:studio

4. **Run Development Server**

Run one of the following commands to start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
 

 Open http://localhost:3000  in your browser to see the app.