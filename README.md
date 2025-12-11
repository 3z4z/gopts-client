# Garments Orders & Production Tracker System - Frontend

## Purpose

This frontend application provides a user-friendly interface for managing garment orders and production. It interacts with the backend server to track orders, manage products, monitor production, and handle user accounts efficiently.

## Live Demo

[View Live](https://gopts.netlify.app/)

## Key Features

- Rich dashboard with full responsiveness for products, orders and users management
- Interactive charts and analytics using `recharts` for Admin
- Smooth Homepage animations with `framer-motion` and `aos`
- File uploads and previews integrated with backend
- Form handling and validation with `react-hook-form`
- Real-time notifications with `react-hot-toast`
- Online payment handling through integrated backend Stripe APIs
- Carousel and sliders using `swiper`
- User authentication with Firebase - included Easy one-click Google Sign in
- State management using `zustand` and `tanstack-query`
- Easy-to-use modern UI built with `TailwindCSS` and `DaisyUI`

## NPM Packages Used

- `react-router` – Client-side routing
- `@tanstack/react-query` – Server state management and data fetching
- `axios` – HTTP requests
- `tailwindcss`, `@tailwindcss/vite`, `daisyui` – Styling and UI components
- `framer-motion`, `aos` – Animations
- `react-hook-form` – Form handling and validation
- `react-hot-toast` – Notifications
- `react-icons` – Icons
- `recharts` – Charts and analytics
- `swiper` – Sliders and carousels
- `lottie-react` – Lottie animations
- `html-react-parser` – Rendering HTML content safely
- `dayjs` – Date formatting and manipulation
- `firebase` – Authentication and backend services
- `sweetalert2` – Alerts and modals
- `react-fast-marquee` – Marquee animations
- `zustand` – State management

## Clone This Repo

```
git clone https://github.com/3z4z/gopts-client.git
cd gopts-client
npm install
```

## Environment Variables

Create a `.env.local` file in the project root and add the following variables:

```
VITE_API_KEY = <your-firebase-api-key>
VITE_AUTH_DOMAIN = <your-firebase-auth-domain>
VITE_PROJECT_ID = <your-firebase-project-id>
VITE_STORAGE_BUCKET = <your-firebase-storage-bucket>
VITE_MESSAGING_SENDER_ID = <your-firebase-messaging-sender-id>
VITE_APP_ID = <your-firebase-app-id>
VITE_API_BASE_URL = <your-backend-url>
```

## Run Project

```
npm run dev
```
