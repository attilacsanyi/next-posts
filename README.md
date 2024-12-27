# Next Poster

![Next.js 15](https://img.shields.io/badge/-Next.js%2015-000000?style=flat-square&logo=next.js)
![React 19](https://img.shields.io/badge/-React%2019-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![SQLite](https://img.shields.io/badge/-SQLite-003B57?style=flat-square&logo=sqlite&logoColor=white)
![Cloudinary](https://img.shields.io/badge/-Cloudinary-003B57?style=flat-square&logo=cloudinary&logoColor=white)

A comprehensive demonstration of Next.js 15's data mutation, sending storing or changing data based on [Maximilian Schwarzmüller's Udemy course](https://www.udemy.com/course/react-the-complete-guide-incl-redux).

## Setup

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Initialize the SQLite database:
   ```bash
   pnpm db:init
   ```

3. Images will be stored in Cloudinary. Set up the following environment variables:

   ```bash
   CLOUDINARY_CLOUD_NAME=
   CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=
   CLOUDINARY_FOLDER=<your-folder-name-to-store-uploaded-images>
   ```

## Next Poster Demo

- **Next.js 15 Server Features**

  - App Router with file-based routing
  - Server Components as default (see feed page implementation)
  - Server Actions for post creation and like handling
  - Error Boundaries for graceful error handling
  - Loading UI with Suspense boundaries
  - Image optimization with Next/Image component

- **React Hooks & State Management**

  - `useActionState` for form submission handling
  - `useFormStatus` for pending state indication
  - `useOptimistic` for immediate UI updates on likes
  - `Suspense` for loading states
  - Form validation with server-side error handling

- **Data & Image Management**

  - SQLite database with `better-sqlite3`
  - Cloudinary integration for image uploads
  - Optimistic updates for like interactions
  - Cache revalidation with `revalidatePath`

## Screenshots

Posts Home

<img src="public/readme/next-posts-home.png" width="500" alt="Next Posts Home" />

Posts Feed

<img src="public/readme/next-posts-feed.png" width="500" alt="Next Posts Feed" />

New Post

<img src="public/readme/next-posts-detail.png" width="500" alt="New Post" />
