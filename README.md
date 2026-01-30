# Momentum Frontend

A modern React + TypeScript frontend application for project and user management, built with Vite, React Query, and Tailwind CSS.

## 🚀 Features

- **Authentication System**
  - JWT-based authentication
  - Login and registration via invite
  - Role-based access control (Admin, Manager, Staff)
  - Protected routes with automatic redirects

- **User Management** (Admin Only)
  - View all users with pagination
  - Update user roles and status
  - Create invite links for new users
  - Real-time updates with React Query

- **Project Management**
  - Create, read, update, and delete projects
  - Filter projects by status (Active, Archived)
  - Pagination support
  - Role-based permissions

- **Dashboard**
  - Welcome message with user info
  - Project statistics
  - Quick actions based on role
  - Recent projects overview

## 🛠️ Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite (Rolldown)
- **Routing**: React Router v7
- **State Management**: React Query (TanStack Query)
- **Forms**: React Hook Form + Zod validation
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios

## 📁 Project Structure

```
src/
├── api/              # API client functions
│   ├── auth.ts
│   ├── users.ts
│   └── projects.ts
├── components/       # Reusable components
│   ├── common/       # Generic UI components
│   ├── auth/         # Authentication components
│   ├── layout/       # Layout components
│   ├── projects/     # Project-specific components
│   └── users/        # User-specific components
├── context/          # React context providers
│   └── AuthContext.tsx
├── hooks/            # Custom React hooks
│   ├── useAuth.ts
│   ├── useRequireAuth.ts
│   ├── useRequireRole.ts
│   ├── useUsers.ts
│   ├── useProjects.ts
│   └── useInvite.ts
├── lib/              # Configuration and utilities
│   ├── axios.ts
│   └── queryClient.ts
├── pages/            # Page components
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── DashboardPage.tsx
│   ├── ProjectsPage.tsx
│   ├── UsersPage.tsx
│   └── NotFoundPage.tsx
├── types/            # TypeScript type definitions
│   └── index.ts
└── App.tsx           # Main application component
```

## 🔧 Setup & Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 🔐 Authentication Flow

1. **Login**: Users authenticate with email and password
2. **Registration**: New users register via invite link with token
3. **Token Storage**: JWT token stored in localStorage
4. **Auto-login**: Token validated on app load
5. **Protected Routes**: Automatic redirect to login if not authenticated

## 🎨 Component Library

### Common Components
- **Button**: Multi-variant button with loading states
- **Input**: Form input with validation errors
- **Select**: Dropdown with form integration
- **Card**: Styled container component
- **Table**: Generic table with sorting and pagination
- **Modal**: Accessible modal dialog
- **Pagination**: Page navigation controls
- **LoadingSpinner**: Animated loading indicator
- **ProtectedRoute**: Route wrapper for authentication

### Layout Components
- **Header**: Top navigation with user info
- **Sidebar**: Side navigation menu
- **Layout**: Main layout wrapper

## 📊 State Management

- **React Query** for server state
  - Automatic caching and refetching
  - Optimistic updates
  - Background synchronization
  - Query invalidation on mutations

- **React Context** for auth state
  - User information
  - Authentication status
  - Login/logout functions

## 🎯 Available Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/login` | Public | User login page |
| `/register?token=xxx` | Public | Registration with invite |
| `/dashboard` | Protected | Main dashboard |
| `/projects` | Protected | Project management |
| `/users` | Admin Only | User management |

## 🔒 Role-Based Access

- **STAFF**: Can view and create projects
- **MANAGER**: Can view and create projects
- **ADMIN**: Full access to all features including user management

## 🧪 Development

### Type Checking
```bash
npx tsc --noEmit
```

### Linting
```bash
npm run lint
```

### Preview Production Build
```bash
npm run preview
```

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000/api` |

## 🎨 Styling

The application uses Tailwind CSS with a custom color scheme:
- Primary: Indigo
- Success: Green
- Warning: Yellow
- Danger: Red

## 🚦 API Integration

All API calls are centralized in the `/src/api` directory:
- Automatic token attachment via Axios interceptors
- Global error handling
- Type-safe responses

## 📦 Key Dependencies

```json
{
  "@tanstack/react-query": "^5.90.20",
  "react-router-dom": "^7.13.0",
  "react-hook-form": "^7.71.1",
  "zod": "^4.3.6",
  "axios": "^1.13.4",
  "tailwindcss": "^3.4.19"
}
```

## 🤝 Contributing

1. Follow TypeScript strict mode
2. Use functional components with hooks
3. Implement proper error handling
4. Add loading states for async operations
5. Follow the existing code structure

## 📄 License

This project is part of the Momentum application suite.
