## Project Management Dashboard


## 📋 Overview

Build a **Project Management Dashboard** that integrates with a provided REST API backend. The application should implement user authentication, role-based access control (RBAC), and full CRUD operations for users and projects.

---

## 🔗 Backend API Information

- **Base URL:** `https://l3-interview-be.onrender.com/users`
- **API Documentation (Swagger):** `https://l3-interview-be.onrender.com/api`
- **Authentication:** Bearer Token (included in Authorization header)

### Test Credentials

| Role | Email | Password | Access Level |
|------|-------|----------|--------------|
| **Super Admin** | `superadmin@test.com` | `password123` | Full access (all operations) |
| **Admin** | `admin@test.com` | `password123` | Manage users & projects (cannot delete) |
| **User** | `user@test.com` | `password123` | Read-only access |

### API Endpoints - User Management

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/users` | Get all users (paginated) | Admin, Super Admin |
| GET | `/users/me` | Get current user profile | All authenticated users |
| GET | `/users/role/:role` | Get users by specific role | Admin, Super Admin |
| GET | `/users/:id` | Get user by ID | Admin, Super Admin |
| POST | `/users` | Create a new user | Admin, Super Admin |
| PATCH | `/users/:id` | Update user information | Admin, Super Admin |
| PATCH | `/users/:id/toggle-status` | Toggle user active/inactive status | Admin, Super Admin |
| DELETE | `/users/:id` | Delete user permanently | Super Admin only |

**Query Parameters for GET /users:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

---

## 🛡️ Role-Based Access Control (RBAC) Matrix

### Permission Table

| Feature / Endpoint | Super Admin | Admin | User |
|-------------------|-------------|-------|------|
| **Authentication** |
| Login / Logout | ✅ | ✅ | ✅ |
| **User Management** |
| View all users (GET /users) | ✅ | ✅ | ❌ |
| View user details (GET /users/:id) | ✅ | ✅ | ❌ |
| View own profile (GET /users/me) | ✅ | ✅ | ✅ |
| Filter users by role (GET /users/role/:role) | ✅ | ✅ | ❌ |
| Create new user (POST /users) | ✅ | ✅ | ❌ |
| Update user (PATCH /users/:id) | ✅ | ✅ | ❌ |
| Toggle user status (PATCH /users/:id/toggle-status) | ✅ | ✅ | ❌ |
| Delete user (DELETE /users/:id) | ✅ | ❌ | ❌ |
| **Project Management** |
| View all projects | ✅ | ✅ | ✅ |
| View project details | ✅ | ✅ | ✅ |
| Filter projects (status/priority) | ✅ | ✅ | ✅ |
| View project statistics | ✅ | ✅ | ✅ |
| Create project | ✅ | ✅ | ❌ |
| Update project | ✅ | ✅ | ❌ |
| Delete project | ✅ | ❌ | ❌ |
| Add/Remove team members | ✅ | ✅ | ❌ |

### UI Behavior Based on Role

**Implementation Requirements:**
- Show/hide action buttons based on user role
- Display role badge in the header/navbar
- Conditional navigation menu items
- Disable forms/inputs for unauthorized users
- Show appropriate error messages for forbidden actions

**Example:**
```typescript
// Super Admin sees (on Users page)
<Button>View</Button>
<Button>Edit</Button>
<Button>Delete</Button>
<Button>Toggle Status</Button>

// Admin sees (on Users page)
<Button>View</Button>
<Button>Edit</Button>
<Button>Toggle Status</Button>
// But NO delete button

// Regular User
// Cannot access Users list page (403 Forbidden)
// Can only access their own profile via /users/me
```

---

## 🎯 Problem Statement

### Core Requirements (Must Have) ✅

#### 1. Authentication & Authorization
- ✅ Login page with email/password form
- ✅ Form validation (email format, password length)
- ✅ Store authentication token securely (localStorage/sessionStorage)
- ✅ Logout functionality
- ✅ Protected routes (redirect to login if not authenticated)
- ✅ Persist login state across page refresh

#### 2. User Management
- ✅ Display paginated list of users (Admin/Super Admin only)
- ✅ Show user details: name, email, role, status (active/inactive) (Admin/Super Admin only)
- ✅ View own profile page (all authenticated users)
- ✅ Filter users by role (Admin/Super Admin only)
- ✅ Create new user (Admin/Super Admin only)
- ✅ Edit user information (Admin/Super Admin only)
- ✅ Delete user (Super Admin only)
- ✅ Toggle user active/inactive status (Admin/Super Admin only)

#### 3. Project Management
- ✅ Display paginated list of projects
- ✅ Show project details: name, status, priority, progress, team members
- ✅ Filter projects by status and priority
- ✅ Create new project (Admin/Super Admin only)
- ✅ Edit project (Admin/Super Admin only)
- ✅ Delete project (Super Admin only)
- ✅ View project team members

#### 4. Role-Based UI Rendering
- ✅ Conditional rendering based on user role
- ✅ Show/hide buttons and menu items
- ✅ Display role badge in UI
- ✅ Implement permission checking function

#### 5. Error Handling & User Feedback
- ✅ Display API error messages to user
- ✅ Handle 401 (Unauthorized) errors → redirect to login
- ✅ Handle 403 (Forbidden) errors → show permission denied message
- ✅ Handle 404 (Not Found) errors
- ✅ Show loading spinners during API calls
- ✅ Success notifications for actions (create, update, delete)

---

### Advanced Requirements (Should Have) ⭐

#### 1. Project Statistics Dashboard
- ⭐ Display project statistics (total, by status, by priority)
- ⭐ Show project progress bars
- ⭐ Display upcoming project deadlines
- ⭐ Visual indicators for urgent/high priority projects

#### 2. Advanced Filtering & Search
- ⭐ Search users by name or email (Admin/Super Admin only)
- ⭐ Filter users by role using GET /users/role/:role endpoint (Admin/Super Admin only)
- ⭐ Filter projects by multiple criteria (status + priority + owner)
- ⭐ Debounced search input (don't call API on every keystroke)
- ⭐ Clear filters functionality

#### 3. Team Management
- ⭐ View project team members with roles
- ⭐ Display user's assigned projects
- ⭐ Show team member count per project

---

## 📱 Required Pages

### 1. Login Page (`/login`)

**Purpose:** Authentication entry point

**Requirements:**
- Email input field (with validation)
- Password input field (with validation, show/hide toggle)
- "Remember me" checkbox (optional)
- Login button (disabled during API call)
- Error message display area
- Loading indicator during authentication

**Validation Rules:**
- Email: Valid email format
- Password: Minimum 6 characters
- Show inline error messages

**Behavior:**
- On successful login → Store token → Redirect to `/dashboard`
- On failed login → Show error message
- If already logged in → Redirect to `/dashboard`

**UI Elements:**
```
┌─────────────────────────────────┐
│     Project Management System    │
│                                  │
│   Email:    [________________]  │
│                                  │
│   Password: [________________]  │
│                                  │
│   [ ] Remember me                │
│                                  │
│        [  Login  ]               │
│                                  │
│   Error message appears here     │
└─────────────────────────────────┘
```

---

### 2. Dashboard / Home Page (`/dashboard`)

**Purpose:** Landing page after login, overview of system

**Requirements:**
- Welcome message with user name
- Summary cards showing:
  - Total users count
  - Total projects count
  - Projects by status
  - User's assigned projects (if applicable)
- Quick links to Users and Projects pages

**Role-Based Display:**
- **Super Admin / Admin:** Show all statistics (total users, total projects, projects by status)
- **User:** Show only own profile information and assigned projects (cannot view total users count)

**UI Elements:**
```
┌──────────────────────────────────────────────┐
│  [Logo]  Dashboard    [Profile] [Logout]     │
├──────────────────────────────────────────────┤
│  Welcome back, John Doe (Admin)              │
│                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │  Users   │  │ Projects │  │  Active  │    │
│  │    15    │  │     8    │  │     5    │    │
│  └──────────┘  └──────────┘  └──────────┘    │
│                                              │
│                                              │
│                                              │ 
└──────────────────────────────────────────────┘
```

---

### 3. Users List Page (`/users`)

**Purpose:** Display and manage all users

**Access:** Admin and Super Admin only (regular Users cannot access this page)

**Requirements:**
- Page header with "Users" title
- "Create User" button (visible to Admin/Super Admin only)
- Search bar for filtering users
- Filter by role dropdown (visible to Admin/Super Admin only)
- User table/grid with columns:
  - Avatar/Icon
  - Name
  - Email
  - Role (with badge/chip)
  - Status (Active/Inactive with badge)
  - Actions (Edit, Delete, Toggle Status)
- Pagination controls (Previous, Next, Page numbers)
- Show items per page selector (10, 20, 50)
- Loading skeleton during data fetch
- Empty state when no users found

**Action Buttons (Role-Based):**
- **Super Admin:** View, Edit, Delete, Toggle Status
- **Admin:** View, Edit, Toggle Status (no Delete)
- **User:** Cannot access this page (redirect to dashboard or show 403 error)

**UI Elements:**
```
┌────────────────────────────────────────────────┐
│  Users                        [+ Create User]   │
├────────────────────────────────────────────────┤
│  Search: [________________]  [Filter by Role ▼]│
│                                                 │
│  ┌──────────────────────────────────────────┐ │
│  │ Name     │ Email      │ Role   │ Actions │ │
│  ├──────────┼────────────┼────────┼─────────┤ │
│  │ John Doe │ j@test.com │ Admin  │ [Edit]  │ │
│  │ Jane S.  │ jane@...   │ User   │ [Edit]  │ │
│  └──────────────────────────────────────────┘ │
│                                                 │
│  Showing 1-10 of 25        [<] 1 2 3 [>]      │
└────────────────────────────────────────────────┘
```

---

### 4. User Profile Page (`/profile` or `/users/me`)

**Purpose:** Display current logged-in user's information

**Access:** All authenticated users (via GET /users/me endpoint)

**Requirements:**
- Display user information in a card/panel:
  - Profile picture placeholder
  - Full name
  - Email address
  - Role (with badge)
  - Account status
  - Account created date
  - Last updated date
- "Edit Profile" button (optional)
- List of assigned projects (if user has any)
- Back button or breadcrumb navigation

**UI Elements:**
```
┌────────────────────────────────────────┐
│  My Profile                    [Edit]  │
├────────────────────────────────────────┤
│                                        │
│      [👤]  John Doe                   │
│                                        │
│      Email: john@example.com           │
│      Role: Admin                       │
│      Status: Active                    │
│      Member since: Jan 1, 2024         │
│                                         │
│  Assigned Projects:                     │
│  • E-Commerce Platform                  │
│  • Mobile App Development               │
│                                         │
└────────────────────────────────────────┘
```

---

### 5. Create/Edit User Page (`/users/new` or `/users/:id/edit`)

**Purpose:** Form to create new user or edit existing user

**Requirements:**
- Form with fields:
  - Name (text input, required)
  - Email (email input, required, unique)
  - Password (password input, required for create, optional for edit)
  - Role dropdown (user, admin, super-admin)
  - Status toggle (Active/Inactive) - for edit only
- Form validation with inline error messages
- "Save" and "Cancel" buttons
- Loading state during submission
- Success message on save
- Redirect to users list after success

**Validation Rules:**
- Name: Required, min 2 characters
- Email: Required, valid email format, unique
- Password: Required for create (min 6 chars), optional for edit
- Role: Required, one of the allowed roles

**Access Control:**
- **Admin:** Can create users with role 'user' or 'admin' only
- **Super Admin:** Can create users with any role

**UI Elements:**
```
┌────────────────────────────────────┐
│  Create New User         [✕]       │
├────────────────────────────────────┤
│                                     │
│  Name:     [___________________]  │
│                                     │
│  Email:    [___________________]  │
│                                     │
│  Password: [___________________]  │
│                                     │
│  Role:     [Select Role ▼]         │
│                                     │
│                                     │
│      [Cancel]      [Create User]   │
│                                     │
└────────────────────────────────────┘
```

---

### 6. Projects List Page (`/projects`)

**Purpose:** Display and manage all projects

**Requirements:**
- Page header with "Projects" title
- "Create Project" button (visible to Admin/Super Admin only)
- Filter controls:
  - Status dropdown (All, Planning, In Progress, On Hold, Completed, Cancelled)
  - Priority dropdown (All, Low, Medium, High, Urgent)
  - Clear filters button
- Project cards/table with:
  - Project name
  - Description (truncated)
  - Status badge with color coding
  - Priority badge
  - Progress bar (0-100%)
  - Owner name
  - Team member avatars/count
  - Technology badges
  - Start date and End date
  - Actions (View, Edit, Delete)
- Pagination controls
- View toggle: Grid view / List view (optional)
- Empty state when no projects

**Status Color Coding:**
- Planning: Blue
- In Progress: Yellow/Orange
- On Hold: Gray
- Completed: Green
- Cancelled: Red

**Priority Indicators:**
- Low: Gray
- Medium: Blue
- High: Orange
- Urgent: Red

**UI Elements:**
```
┌──────────────────────────────────────────────┐
│  Projects                  [+ Create Project] │
├──────────────────────────────────────────────┤
│  Status: [All ▼]  Priority: [All ▼]  [Clear]│
│                                               │
│  ┌────────────────────┐  ┌───────────────┐  │
│  │ E-Commerce         │  │ Mobile App    │  │
│  │ Status: In Progress│  │ Status: Plan  │  │
│  │ Priority: High     │  │ Priority: Med │  │
│  │ ████████░░ 65%     │  │ ███░░░░░░ 15% │  │
│  │ Owner: Super Admin │  │ Owner: Admin  │  │
│  │ 👤👤👤 3 members   │  │ 👤 1 member   │  │
│  │ [View] [Edit]      │  │ [View] [Edit] │  │
│  └────────────────────┘  └───────────────┘  │
│                                               │
│  Page 1 of 2                    [<] 1 2 [>] │
└──────────────────────────────────────────────┘
```

---

### 7. Project Details Page (`/projects/:id`)

**Purpose:** View detailed information about a single project

**Requirements:**
- Project information display:
  - Project name (large heading)
  - Description (full text)
  - Status badge
  - Priority badge
  - Progress bar with percentage
  - Owner information
  - Budget (if available)
  - Start date
  - End date (if available)
  - Technologies used (badges/chips)
  - Created date
  - Last updated date
- Team Members section:
  - List of all team members
  - Show: name, role in project, joined date
  - "Add Member" button (Admin/Super Admin only)
  - "Remove" button per member (Admin/Super Admin only)
- Action buttons:
  - "Edit Project" (Admin/Super Admin only)
  - "Delete Project" (Super Admin only)
  - "Back to Projects"

**UI Elements:**
```
┌────────────────────────────────────────────┐
│  ← Back to Projects                        │
│                                             │
│  E-Commerce Platform          [Edit] [Del] │
│  Status: In Progress  Priority: High       │
│  ████████░░ 65%                            │
│                                             │
│  Description:                               │
│  Building a modern e-commerce platform...  │
│                                             │
│  Owner: Super Admin                         │
│  Budget: $150,000                           │
│  Timeline: Jan 1, 2024 - Jun 30, 2024     │
│                                             │
│  Technologies:                              │
│  [React] [TypeScript] [NestJS]             │
│                                             │
│  Team Members:                 [+ Add]      │
│  • Admin User (Manager)                     │
│  • John Doe (Developer)                     │
│  • Jane Smith (Designer)                    │
│                                             │
└────────────────────────────────────────────┘
```

---

### 8. Create/Edit Project Page (`/projects/new` or `/projects/:id/edit`)

**Purpose:** Form to create new project or edit existing project

**Requirements:**
- Form with fields:
  - Project name (text input, required)
  - Description (textarea, required)
  - Status dropdown (Planning, In Progress, On Hold, Completed, Cancelled)
  - Priority dropdown (Low, Medium, High, Urgent)
  - Technologies (multi-select or tags input)
  - Budget (number input, optional)
  - Start date (date picker, required)
  - End date (date picker, optional)
  - Progress slider (0-100%, for edit only)
  - Team members (multi-select dropdown, optional)
- Form validation with inline errors
- "Save" and "Cancel" buttons
- Loading state during submission
- Auto-save draft (optional)

**Validation Rules:**
- Name: Required, min 3 characters
- Description: Required, min 10 characters
- Status: Required
- Priority: Required
- Start date: Required, cannot be in the past
- End date: Must be after start date

**UI Elements:**
```
┌────────────────────────────────────────┐
│  Create New Project            [✕]     │
├────────────────────────────────────────┤
│                                         │
│  Name:        [_____________________] │
│                                         │
│  Description: [_____________________] │
│               [_____________________] │
│               [_____________________] │
│                                         │
│  Status:      [Planning ▼]             │
│  Priority:    [Medium ▼]               │
│                                         │
│  Technologies: [React] [TypeScript] +  │
│                                         │
│  Budget:      [$____________________] │
│                                         │
│  Start Date:  [📅 01/01/2024]         │
│  End Date:    [📅 06/30/2024]         │
│                                         │
│  Team Members: [Select members ▼]     │
│                                         │
│                                         │
│      [Cancel]      [Create Project]    │
│                                         │
└────────────────────────────────────────┘
```

---

### 9. Navigation & Layout

**Header/Navbar (Present on all pages after login):**
- Logo/App name
- Navigation links:
  - Dashboard
  - Users (visible to Admin & Super Admin only)
  - Projects (visible to all)
- Right side:
  - User profile dropdown
    - My Profile
    - Settings (optional)
    - Logout
  - Role badge display

**Sidebar (Optional):**
- Dashboard
- Users
- Projects
- Statistics (optional)