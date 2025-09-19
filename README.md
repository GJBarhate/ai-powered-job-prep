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

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Shadcn/UI  
- **Backend / API**: Node.js, Express.js, Clerk (Auth), Arcjet (Rate limiting)  
- **Database**: PostgreSQL  
- **AI / ML**: Google Gemini LLM, Hume AI (Voice/Emotion analysis)  
- **Deployment**: Vercel  


## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/GJBarhate/ai-powered-job-prep.git
cd ai-resume-builder
```

### 2️⃣ Create Environment Files  
```bash
# PostgreSQL Database
DB_HOST=your_db_host       # e.g., localhost or your server IP
DB_PORT=5432               # default PostgreSQL port
DB_USER=your_db_user       # e.g., postgres
DB_PASSWORD=your_db_password
DB_NAME=your_db_name       # e.g., ai_job_prep
DATABASE_URL=postgres://your_db_user:your_db_password@your_db_host:5432/your_db_name

# Clerk Authentication
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/app
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/onboarding
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
CLERK_WEBHOOK_SECRET=your_webhook_secret

# Arcjet (Security)
ARCJET_KEY=your_arcjet_key

# Hume AI (Voice/Emotion)
HUME_API_KEY=your_hume_api_key
HUME_SECRET_KEY=your_hume_secret_key
NEXT_PUBLIC_HUME_CONFIG_ID=your_hume_config_id

# Google Gemini (LLM)
GEMINI_API_KEY=your_gemini_api_key" 
```


### 3️⃣ Install & Run

```bash
# Go inside the project folder
cd ai-powered-job-prep/

# Install dependencies
npm install

# Start the development server
npm run dev
   ```

### 4️⃣ Setup Database

```bash
# Start PostgreSQL with Docker
docker compose up

# Push schema to the database
npm run db:push

# Open database studio (Drizzle Studio)
npm run db:studio
   ```
