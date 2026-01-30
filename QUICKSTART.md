# 🚀 Quick Start Guide

## Prerequisites
- Node.js 18+ installed
- Backend API running on `http://localhost:5000`

## Setup (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
# Copy the example file
cp .env.example .env

# Edit .env if your backend runs on a different URL
# VITE_API_URL=http://localhost:5000/api
```

### 3. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

## First Time Setup

### 1. Create Admin User (Backend)
Run this in your backend project:
```bash
npm run seed
```
This creates an admin user:
- Email: `admin@momentum.com`
- Password: `Admin123!`

### 2. Login
1. Go to `http://localhost:5173/login`
2. Enter admin credentials
3. You'll be redirected to the dashboard

### 3. Create Your First User
1. Navigate to "Users" in the sidebar
2. Click "Invite New User"
3. Enter email and select role
4. Copy the invite link
5. Open the link in a new incognito window
6. Complete registration

### 4. Create Your First Project
1. Navigate to "Projects"
2. Click "Create Project"
3. Enter name and description
4. Click "Create Project"

## Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run preview         # Preview production build

# Code Quality
npx tsc --noEmit       # Type checking
npm run lint           # Run ESLint
```

## Troubleshooting

### "Network Error" when logging in
- Ensure backend is running on `http://localhost:5000`
- Check CORS is enabled in backend
- Verify `VITE_API_URL` in `.env`

### "Invalid token" error
- Clear localStorage: `localStorage.clear()` in browser console
- Try logging in again

### Build errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Project Structure Overview

```
src/
├── pages/          # Page components (LoginPage, DashboardPage, etc.)
├── components/     # Reusable components
├── hooks/          # Custom React hooks
├── api/            # API client functions
├── context/        # React Context providers
├── lib/            # Configuration (Axios, React Query)
├── types/          # TypeScript definitions
└── utils/          # Helper functions
```

## Need Help?

- Check the main [README.md](./README.md) for detailed documentation
- Review the backend API documentation
- Check browser console for errors

---

**Happy coding! 🎉**
