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