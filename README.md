This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app), using [shadcn/ui](https://ui.shadcn.com) and Tailwind CSS for components.

## Tooling

Node version is pinned via [mise](https://mise.jdx.dev):

```bash
mise install
```

All commands below are also available as mise tasks, e.g. `mise run dev`, `mise run docker:up`. Run `mise tasks` to see the full list.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

### Structure

A simplified [feature-sliced design](https://feature-sliced.design):

- `src/shared/ui` — shadcn/ui primitives, added via `npx shadcn@latest add <component>` (lands here per `components.json`)
- `src/shared/lib` — cross-feature utilities (e.g. `cn`)
- `src/features/<feature>` — domain/feature-specific code, created as features land
- `src/app` — Next.js App Router routes

## Docker

The Next.js app runs in Docker, built for `linux/arm64`:

```bash
docker compose up --build
```

- App: [http://localhost:3000](http://localhost:3000)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
