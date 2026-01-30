# 🚀 Momentum Frontend

A modern, production-ready React + TypeScript frontend application for project and user management with role-based access control.

## ✨ Features

### 🔐 Authentication & Authorization
- **JWT-based Authentication** with automatic token refresh
- **Invite-only Registration** for controlled user onboarding
- **Role-Based Access Control** (Admin, Manager, Staff)
- **Protected Routes** with automatic redirects
- **Persistent Sessions** with localStorage

### 👥 User Management (Admin Only)
- View all users with **pagination**
- Update user **roles** and **status** in real-time
- Create **invite links** with expiration
- **Copy-to-clipboard** functionality for invites
- Real-time updates with optimistic UI

### 📁 Project Management
- **CRUD operations** for projects
- **Filter by status** (Active, Archived)
- **Pagination** support
- **Role-based permissions** (Admins can edit/delete)
- **Soft delete** functionality
- Beautiful card-based UI

### 📊 Dashboard
- Personalized **welcome message**
- **Project statistics** overview
- **Quick actions** based on user role
- **Recent projects** list
- Role-specific navigation

### 🎨 UI/UX Excellence
- **Responsive design** (mobile-first)
- **Toast notifications** for user feedback
- **Loading states** throughout
- **Error boundaries** for graceful error handling
- **Accessible** components with ARIA labels
- **Dark mode ready** architecture

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | React 19 + TypeScript |
| **Build Tool** | Vite (Rolldown) |
| **Routing** | React Router v7 |
| **State Management** | TanStack Query (React Query) |
| **Forms** | React Hook Form + Zod |
| **Styling** | Tailwind CSS |
| **HTTP Client** | Axios |
| **Icons** | Lucide React |
| **Notifications** | React Hot Toast |

## 📋 Prerequisites

- **Node.js** 18+ and npm
- **Backend API** running (see backend README)
- Modern browser with ES6+ support

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd momentum-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 5. Build for Production

```bash
npm run build
npm run preview  # Preview production build
```

## 📁 Project Structure

```
src/
├── api/                    # API client functions
│   ├── auth.ts            # Authentication endpoints
│   ├── users.ts           # User management endpoints
│   └── projects.ts        # Project management endpoints
│
├── components/            # React components
│   ├── common/           # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Card.tsx
│   │   ├── Table.tsx
│   │   ├── Modal.tsx
│   │   ├── Pagination.tsx
│   │   ├── Badge.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── ErrorBoundary.tsx
│   ├── auth/             # Authentication components
│   │   └── InviteForm.tsx
│   ├── layout/           # Layout components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── Layout.tsx
│   ├── projects/         # Project components
│   │   ├── ProjectCard.tsx
│   │   └── ProjectForm.tsx
│   └── users/            # User components
│
├── context/              # React Context providers
│   └── AuthContext.tsx   # Authentication state
│
├── hooks/                # Custom React hooks
│   ├── useAuth.ts        # Auth context hook
│   ├── useRequireAuth.ts # Auth guard hook
│   ├── useRequireRole.ts # Role guard hook
│   ├── useUsers.ts       # User management hooks
│   ├── useProjects.ts    # Project management hooks
│   └── useInvite.ts      # Invite creation hook
│
├── lib/                  # Configuration
│   ├── axios.ts          # Axios instance with interceptors
│   └── queryClient.ts    # React Query configuration
│
├── pages/                # Page components
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── DashboardPage.tsx
│   ├── ProjectsPage.tsx
│   ├── UsersPage.tsx
│   └── NotFoundPage.tsx
│
├── types/                # TypeScript definitions
│   └── index.ts          # Shared types and interfaces
│
├── utils/                # Utility functions
│   ├── helpers.ts        # Formatting and styling helpers
│   └── toast.ts          # Toast notification helpers
│
├── App.tsx               # Main app component
├── main.tsx              # Application entry point
└── index.css             # Global styles
```

## 🔄 Authentication Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     User Authentication Flow                 │
└─────────────────────────────────────────────────────────────┘

1. Login
   ├─> User enters email & password
   ├─> POST /api/auth/login
   ├─> Receive JWT token + user data
   ├─> Store in localStorage
   └─> Redirect to /dashboard

2. Registration (Invite-based)
   ├─> Admin creates invite
   ├─> Invite link sent to user
   ├─> User clicks link (with token)
   ├─> User enters name & password
   ├─> POST /api/auth/register-via-invite
   ├─> Auto-login with received token
   └─> Redirect to /dashboard

3. Protected Routes
   ├─> Check if token exists
   ├─> Validate token expiration
   ├─> Check user role (if required)
   ├─> Allow access OR redirect to /login
   └─> Render protected component

4. Logout
   ├─> Clear localStorage
   ├─> Clear auth state
   └─> Redirect to /login
```

## 🎯 API Integration

### Axios Configuration

All API calls use a centralized Axios instance with:

- **Base URL** from environment variables
- **Request Interceptor**: Automatically attaches JWT token
- **Response Interceptor**: Global error handling and token validation

```typescript
// Automatic token attachment
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Auto-logout on unauthorized
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

## 📊 State Management

### React Query (TanStack Query)

Used for **server state management** with:

- **Automatic caching** (5-minute stale time)
- **Background refetching**
- **Optimistic updates**
- **Query invalidation** on mutations
- **Retry logic** (1 retry on failure)

```typescript
// Example: useUsers hook
export const useUsers = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ['users', page, limit],
    queryFn: () => getUsers(page, limit),
    enabled: isAuthenticated,
  });
};

// Example: useUpdateUserRole mutation
export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, role }) => updateUserRole(userId, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
```

### React Context

Used for **client state** (authentication):

- User information
- Authentication status
- Login/logout functions
- Token management

## 🔒 Role-Based Access Control

| Role | Permissions |
|------|------------|
| **STAFF** | • View dashboard<br>• View projects<br>• Create projects |
| **MANAGER** | • All STAFF permissions<br>• Same as STAFF (for now) |
| **ADMIN** | • All MANAGER permissions<br>• Manage users<br>• Update user roles/status<br>• Create invites<br>• Edit/delete any project |

## 🎨 Design Decisions & Tradeoffs

### Why React Query over Redux?

✅ **Pros:**
- Built-in caching and background sync
- Automatic loading/error states
- Optimistic updates out of the box
- Less boilerplate code
- Perfect for server state

❌ **Cons:**
- Not ideal for complex client state
- Learning curve for advanced features

### Why Separate Frontend/Backend Repos?

✅ **Pros:**
- Independent deployment
- Different tech stacks
- Easier to scale teams
- Clear separation of concerns

❌ **Cons:**
- More complex setup
- CORS configuration needed
- Duplicate type definitions

### Why Soft Delete for Projects?

✅ **Pros:**
- Data recovery possible
- Audit trail maintained
- Safer than hard delete

❌ **Cons:**
- Database bloat over time
- More complex queries

### Why Invite-Based Registration?

✅ **Pros:**
- Controlled user growth
- Better security
- Role assignment at invite time
- No spam accounts

❌ **Cons:**
- Extra step for admins
- Token management complexity

## 🚦 Available Routes

| Route | Access | Component |
|-------|--------|-----------|
| `/` | Public | Redirect to `/dashboard` |
| `/login` | Public | LoginPage |
| `/register?token=xxx` | Public | RegisterPage |
| `/dashboard` | Protected | DashboardPage |
| `/projects` | Protected | ProjectsPage |
| `/users` | Admin Only | UsersPage |
| `/*` | Public | NotFoundPage (404) |

## 🧪 Testing the Application

### Manual Testing Checklist

1. **Authentication**
   - [ ] Login with valid credentials
   - [ ] Login with invalid credentials (error shown)
   - [ ] Logout functionality
   - [ ] Token persistence (refresh page)

2. **User Management (Admin)**
   - [ ] View users list
   - [ ] Create invite
   - [ ] Copy invite link
   - [ ] Update user role
   - [ ] Update user status
   - [ ] Pagination works

3. **Project Management**
   - [ ] View projects
   - [ ] Create project
   - [ ] Edit project (admin only)
   - [ ] Delete project (admin only)
   - [ ] Filter by status
   - [ ] Pagination works

4. **Dashboard**
   - [ ] Statistics display correctly
   - [ ] Recent projects shown
   - [ ] Quick actions work

5. **Responsive Design**
   - [ ] Mobile menu works
   - [ ] Tables scroll on mobile
   - [ ] Forms work on mobile

## 🐛 Known Limitations

- No real-time updates (WebSocket not implemented)
- No file upload functionality
- No advanced search/filtering
- No data export features
- No email notifications
- No password reset flow

## 🔮 Future Improvements

- [ ] Add WebSocket for real-time updates
- [ ] Implement advanced search and filtering
- [ ] Add data export (CSV, PDF)
- [ ] Email notifications for invites
- [ ] Password reset functionality
- [ ] User profile management
- [ ] Activity logs and audit trail
- [ ] Dark mode toggle
- [ ] Multi-language support (i18n)
- [ ] Unit and integration tests
- [ ] E2E tests with Playwright
- [ ] Performance monitoring
- [ ] Analytics integration

## 📸 Screenshots

_Add screenshots or demo URL here_

## 🤝 Contributing

1. Follow TypeScript strict mode
2. Use functional components with hooks
3. Implement proper error handling
4. Add loading states for async operations
5. Follow the existing code structure
6. Write meaningful commit messages

## 📄 License

This project is part of the Momentum application suite.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
