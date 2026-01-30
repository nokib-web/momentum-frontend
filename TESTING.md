# 🧪 Testing Guide

This guide will help you manually test the complete application flow.

## Prerequisites

✅ Backend running on `http://localhost:5000`
✅ Frontend running on `http://localhost:5173`
✅ Admin user seeded in database

---

## 🔐 Test 1: Authentication Flow

### 1.1 Login as Admin
1. Navigate to `http://localhost:5173/login`
2. Enter credentials:
   - Email: `admin@momentum.com`
   - Password: `Admin123!`
3. Click "Sign in"

**Expected Result:**
- ✅ Redirected to `/dashboard`
- ✅ Welcome message shows "Welcome back, Admin!"
- ✅ Role badge shows "ADMIN"
- ✅ Sidebar shows "Users" link

### 1.2 Test Token Persistence
1. Refresh the page (F5)

**Expected Result:**
- ✅ Still logged in
- ✅ Dashboard loads without redirect to login

### 1.3 Test Logout
1. Click "Logout" button in header

**Expected Result:**
- ✅ Redirected to `/login`
- ✅ Cannot access `/dashboard` without login

---

## 👥 Test 2: User Management (Admin Only)

### 2.1 View Users List
1. Login as admin
2. Click "Users" in sidebar

**Expected Result:**
- ✅ Users page loads
- ✅ Table shows all users
- ✅ Pagination visible if > 10 users

### 2.2 Create Invite
1. Click "Invite New User" button
2. Enter email: `test@example.com`
3. Select role: "Staff"
4. Click "Create Invite"

**Expected Result:**
- ✅ Modal shows "Invite Created Successfully"
- ✅ Invite link displayed
- ✅ Copy button works
- ✅ Toast notification shows success

### 2.3 Update User Role
1. Find a user in the table
2. Change role dropdown (e.g., Staff → Manager)

**Expected Result:**
- ✅ Dropdown updates immediately
- ✅ Toast shows success
- ✅ Page refreshes with new role

### 2.4 Update User Status
1. Find a user in the table
2. Change status dropdown (Active → Inactive)

**Expected Result:**
- ✅ Status updates
- ✅ Color changes (green → red)
- ✅ Toast shows success

---

## 📝 Test 3: Registration Flow

### 3.1 Register via Invite
1. Copy invite link from Test 2.2
2. Open in **incognito/private window**
3. Paste invite link in address bar
4. Enter details:
   - Name: "Test User"
   - Password: "Test123!"
   - Confirm Password: "Test123!"
5. Click "Create Account"

**Expected Result:**
- ✅ Account created
- ✅ Auto-logged in
- ✅ Redirected to `/dashboard`
- ✅ Welcome message shows "Test User"

### 3.2 Test Invalid Invite
1. Navigate to `/register?token=invalid`

**Expected Result:**
- ✅ Error message shown
- ✅ Form disabled
- ✅ Cannot submit

---

## 📁 Test 4: Project Management

### 4.1 View Projects
1. Login as any user
2. Click "Projects" in sidebar

**Expected Result:**
- ✅ Projects page loads
- ✅ Grid of project cards
- ✅ Filter dropdown visible

### 4.2 Create Project
1. Click "Create Project" button
2. Enter:
   - Name: "Test Project"
   - Description: "This is a test project for testing purposes"
3. Click "Create Project"

**Expected Result:**
- ✅ Modal closes
- ✅ New project appears in grid
- ✅ Toast shows success
- ✅ Created by shows your name

### 4.3 Filter Projects
1. Click filter dropdown
2. Select "Active"

**Expected Result:**
- ✅ Only active projects shown
- ✅ Pagination updates

### 4.4 Edit Project (Admin Only)
1. Login as admin
2. Find a project card
3. Click "Edit" button
4. Change name to "Updated Project"
5. Change status to "Archived"
6. Click "Update Project"

**Expected Result:**
- ✅ Modal closes
- ✅ Project updates in grid
- ✅ Status badge changes to yellow
- ✅ Toast shows success

### 4.5 Delete Project (Admin Only)
1. Find a project card
2. Click "Delete" button
3. Confirm deletion

**Expected Result:**
- ✅ Confirmation modal appears
- ✅ Project name shown in warning
- ✅ After confirm, project removed
- ✅ Toast shows success

### 4.6 Test Non-Admin Permissions
1. Login as Staff/Manager user
2. Go to Projects page

**Expected Result:**
- ✅ Can view projects
- ✅ Can create projects
- ✅ **Cannot** see Edit button
- ✅ **Cannot** see Delete button

---

## 📊 Test 5: Dashboard

### 5.1 View Statistics
1. Login as any user
2. Go to dashboard

**Expected Result:**
- ✅ Total Projects count correct
- ✅ Active Projects count correct
- ✅ Role displayed correctly

### 5.2 Recent Projects
1. Scroll to "Recent Projects" section

**Expected Result:**
- ✅ Shows up to 5 recent projects
- ✅ Each project shows name, description, status
- ✅ "View All" button links to `/projects`

### 5.3 Quick Actions
1. Check quick actions cards

**Expected Result:**
- ✅ "View Projects" card visible for all
- ✅ "Manage Users" card visible for admin only
- ✅ Cards are clickable and navigate correctly

---

## 🎨 Test 6: Responsive Design

### 6.1 Mobile View (< 768px)
1. Open DevTools (F12)
2. Toggle device toolbar
3. Select iPhone or similar

**Expected Result:**
- ✅ Hamburger menu appears
- ✅ Sidebar hidden
- ✅ Tables scroll horizontally
- ✅ Forms stack vertically
- ✅ Cards stack in single column

### 6.2 Tablet View (768px - 1024px)
1. Set viewport to iPad

**Expected Result:**
- ✅ 2-column grid for projects
- ✅ Sidebar visible
- ✅ All features accessible

### 6.3 Desktop View (> 1024px)
1. Set viewport to desktop

**Expected Result:**
- ✅ 3-column grid for projects
- ✅ Full sidebar with icons
- ✅ Optimal spacing

---

## 🚨 Test 7: Error Handling

### 7.1 Network Error
1. Stop the backend server
2. Try to login

**Expected Result:**
- ✅ Error message shown
- ✅ No crash
- ✅ User can retry

### 7.2 Invalid Credentials
1. Login with wrong password

**Expected Result:**
- ✅ Error message: "Invalid credentials"
- ✅ Form not cleared
- ✅ Can retry

### 7.3 Validation Errors
1. Try to create project with:
   - Name: "AB" (too short)
   - Description: "Short" (too short)

**Expected Result:**
- ✅ Validation errors shown
- ✅ Submit button disabled
- ✅ Error messages clear

### 7.4 Unauthorized Access
1. Login as Staff user
2. Manually navigate to `/users`

**Expected Result:**
- ✅ Redirected to `/dashboard`
- ✅ Or shows "403 Unauthorized"

---

## 🔄 Test 8: State Management

### 8.1 Optimistic Updates
1. Update user role
2. Observe immediate UI update

**Expected Result:**
- ✅ UI updates before server response
- ✅ Reverts if error occurs

### 8.2 Cache Invalidation
1. Create a project
2. Navigate to dashboard
3. Check recent projects

**Expected Result:**
- ✅ New project appears in recent list
- ✅ Statistics updated

### 8.3 Background Refetching
1. Open two browser windows
2. Create project in window 1
3. Switch to window 2

**Expected Result:**
- ✅ Window 2 updates (after stale time)

---

## ✅ Test Checklist

### Authentication
- [ ] Login works
- [ ] Logout works
- [ ] Token persists
- [ ] Invalid credentials handled
- [ ] Registration via invite works

### User Management
- [ ] View users list
- [ ] Create invite
- [ ] Copy invite link
- [ ] Update role
- [ ] Update status
- [ ] Pagination works

### Project Management
- [ ] View projects
- [ ] Create project
- [ ] Edit project (admin)
- [ ] Delete project (admin)
- [ ] Filter by status
- [ ] Pagination works
- [ ] Non-admin restrictions work

### Dashboard
- [ ] Statistics display
- [ ] Recent projects show
- [ ] Quick actions work
- [ ] Role-specific content

### UI/UX
- [ ] Responsive on mobile
- [ ] Responsive on tablet
- [ ] Responsive on desktop
- [ ] Loading states show
- [ ] Error messages clear
- [ ] Toast notifications work

### Security
- [ ] Protected routes work
- [ ] Role restrictions work
- [ ] Token expiration handled
- [ ] Unauthorized access blocked

---

## 🐛 Common Issues

### Issue: "Network Error"
**Solution:** Ensure backend is running on correct port

### Issue: "Invalid token"
**Solution:** Clear localStorage and login again

### Issue: Changes not reflecting
**Solution:** Check React Query DevTools, invalidate cache

### Issue: 404 on refresh
**Solution:** Configure server for SPA routing

---

## 📝 Notes

- Test in multiple browsers (Chrome, Firefox, Safari)
- Test with different screen sizes
- Test with slow network (DevTools throttling)
- Test with disabled JavaScript (should show error)
- Test with ad blockers disabled

---

**All tests passing? You're ready for production! 🚀**
