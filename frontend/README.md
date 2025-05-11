# 4Fixy (InfraFix)

A monorepo for reporting broken public infrastructure with photos and map locations.

## Structure

- `frontend/`: Next.js frontend
- `backend/`: Node.js/Express backend with MongoDB

## Setup

### Frontend

1. Navigate: `cd frontend`
2. Install: `npm install`
3. Set `NEXT_PUBLIC_BACKEND_URL` in `frontend/.env.local` (e.g., `http://localhost:5000`)
4. Run: `npm run dev`

### Backend

1. Navigate: `cd backend`
2. Install: `npm install`
3. Set `MONGODB_URI` in `backend/.env` (e.g., `mongodb://localhost:27017/4fixy`)
4. Run: `npm run dev`

## Features

- Report infrastructure issues with title, description, coordinates, and photos
- View issues on an interactive map
- Detailed issue reports with images

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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
