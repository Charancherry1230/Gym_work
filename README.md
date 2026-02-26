# Premium Gym Workout App

A high-end SaaS-style fitness tracking application built with Next.js 14, Prisma, PostgreSQL (Neon), and Framer Motion.

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   Create a `.env.local` file with the following variables:
   ```env
   DATABASE_URL="your_postgresql_url"
   NEXTAUTH_SECRET="your_nextauth_secret"
   NEXTAUTH_URL="http://localhost:3000"
   ```

3. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Seed Database**
   Since this app uses internal seed data, visit the following URL once the dev server is running to populate the exercises:
   `http://localhost:3000/api/seed`

5. **Run Development Server**
   ```bash
   npm run dev
   ```

## ✨ Key Features

- **Premium UI/UX:** Charcoal, Purple, and Cyan aesthetic with glassmorphism and animations.
- **Workout Builder:** Create custom routines with exercise relationships.
- **Exercise Library:** 15+ built-in exercises categorized with descriptions and targets.
- **Progress Tracking:** Interactive charts visualizing training volume and PRs.
- **Authentication:** Secure Credentials-based auth with NextAuth and bcrypt.

## 🧠 Smart Logic

- **Calorie Estimation:** Uses metabolic equivalent (MET) logic for different exercise categories.
- **Streak Calculation:** Tracks consecutive days of activity.
- **PR Detection:** Automatically identifies and records personal records in lifts.
