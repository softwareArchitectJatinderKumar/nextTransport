This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


<!-- src/
├── app/                # Next.js App Router (Routes, Layouts, Server Actions)
│   ├── (auth)/         # Route Group for authentication
│   ├── api/            # Route Handlers (Backend logic)
│   └── layout.tsx      # Root layout (Providers, Global CSS)
├── components/         # UI Components
│   ├── ui/             # Shadcn / Atomic components (low-level)
│   ├── forms/          # Specialized form logic
│   └── shared/         # Layout-specific components (Header, Footer)
├── hooks/              # Reusable Client-side logic
├── lib/                # Third-party initializations (Prisma, Stripe, Resend)
├── services/           # Business logic / Data Access Layer (DAL)
├── store/              # Client-side state management (Zustand/Jotai)
├── types/              # Global TypeScript interfaces/types
└── utils/              # Pure helper functions (formatting, validation)
 -->


# Project Name: [Enter Name]

## 🛠 Architecture Overview
This project is built using the **Next.js 15+ App Router** architecture, prioritizing Server Components and Type Safety.

### Tech Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Type Safety:** TypeScript
- **Components:** Radix UI / Shadcn UI
- **Linting:** ESLint + Prettier

## 📂 Design Patterns
- **Server Actions:** Used for all data mutations to reduce client-side JS.
- **Data Access Layer (DAL):** All database/API calls reside in `src/services` to decouple logic from the UI.
- **Strict Aliasing:** Use `@/*` for clean imports from the `src` directory.

## 🚀 Getting Started
1. **Clone & Install:**
   ```bash
   npm install