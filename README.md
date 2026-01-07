
  <img src="./frontend/public/logo.webp" alt="Logo" width="120" style="center" />
  
  <h1 style="center">Quick Career Coach</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Google_Gemini-8E75C2?style=for-the-badge&logo=googlegemini&logoColor=white" />
</p>

---

Quick Career Coach is an AI-powered platform designed to help professionals and students navigate their career paths with ease. From generating industry insights to building professional resumes, this tool leverages artificial intelligence to provide personalized career guidance.

## ✨ Features

- **📊 Industry Insights**: Real-time market trends, and demand analysis for various job roles.
- **📝 AI Resume Analyzer**: Analyze resumes with the help of AI suggestions.
- **🎤 Interview Preparation**: AI-driven mock questions and tips to help you ace your next interview.
- **📱 Fully Responsive**: Built with a mobile-first approach using Tailwind CSS and Shadcn UI.

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS, Shadcn UI.
- **Backend**: Next.js API Routes.
- **Database**: PostgreSQL with Prisma ORM.
- **AI Integration**: Google Gemini API.

## 🚀 Getting Started

Follow these steps to set up the project locally:

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm
- A Google Gemini API Key
- PostgreSQL instance

### Installation

1. **Clone the repository:**
   
   ```bash
   git clone [https://github.com/kafayaaa/quick-career-coach.git](https://github.com/kafayaaa/quick-career-coach.git)
   cd quick-career-coach

3. **Install dependencies:**
   
   ```bash
   npm install

5. **Set up Environment Variables: Create a .env file in the root directory and add your credentials:**
   
   ```bash
   DATABASE_URL=your_postgresql_url
   GEMINI_API_KEY=your_gemini_api_key

7. **Database Sync:**
   
   ```bash
   npx prisma generate
   npx prisma db push

9. **Run the development server:**
    
   ```bash
   npm run dev

Open http://localhost:3000 with your browser to see the result.

## 📂 Project Structure

- /app - Next.js App Router (Pages and Layouts).
- /components - Reusable UI components (Shadcn UI).
- /lib - Utility functions and shared logic (Prisma client, AI helpers).
- /prisma - Database schema and migrations.
- /public - Static assets like images and icons.

## 📜 License

This project is licensed under the MIT License.

Developed with ❤️ by kafayaaa
