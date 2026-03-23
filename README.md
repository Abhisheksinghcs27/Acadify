## Acadify (Smart Curriculum & Attendance)

Acadify is a school/college attendance + curriculum dashboard with role-based access:
- `student`
- `teacher`
- `admin` (also supports `main_admin` and `sub_admin`)

This repository contains:
- Frontend: React + Vite
- Backend: Node/Express + MongoDB + Redis + Socket.IO

## Frontend (React)

### Tech
- React + React Router
- Redux (auth state)
- TanStack Query
- Tailwind CSS
- QR scanning (html5-qrcode)

### Setup
1. Go to the frontend directory:
   - `cd Acadify-frontend`
2. Install dependencies:
   - `npm install`
3. Create/update `.env` in `Acadify-frontend`:
   - `VITE_API_URL` (example: `http://localhost:9000`)
4. Run the dev server:
   - `npm run dev`

### Environment variables used by the frontend
- `VITE_API_URL` (used for REST calls and Socket.IO connection)

## Backend (Node/Express)

### Tech
- Express
- MongoDB (Mongoose)
- Redis
- Socket.IO

### Setup
1. Go to backend directory:
   - `cd Acadify-frontend/Acadify-backend`
2. Install dependencies:
   - `npm install`
3. Create/update `.env` (not committed):
   - `PORT` (default: `3000`)
   - `MONGODB_URI` (required)
   - `JWT_SECRET` (required)
   - `REDIS_HOST` (default: `localhost`)
   - `REDIS_PORT` (default: `6379`)
   - `REDIS_PASSWORD` (optional)
   - `GROK_API_KEY` (for AI schedule generation features)
   - `GROK_API_URL` (default: `https://api.x.ai/v1`)
   - `CORS_ORIGIN` (default: `http://localhost:5173`)
4. Run the server:
   - `npm run dev` (or your backend start command)

## Authentication & Roles

The frontend uses `ProtectedRoute` to enforce access by role.

Common redirects:
- unauthenticated users are redirected to `/`
- authenticated users with the wrong role are redirected to their dashboard

## Pages (Frontend Routes)

Public:
- `/` (Login)

Student (role: `student`):
- `/student` (Student Dashboard)
- `/student/checkin` (Check In)
  - Starts the QR scanner and marks attendance using the scanned token.
- `/student/courses` (My Courses)
  - Course list with progress and next class info.
- `/student/assignments` (Assignments)
  - Assignment list per course (demo UI with local completion toggles).

Teacher (role: `teacher`):
- `/teacher` (Teacher Dashboard)
- `/teacher/attendance` (Attendance Portal)
  - Attendance management UI for the teacher.
- `/teacher/analytics` (Teacher Analytics)
  - Teacher wrapper around the shared analytics dashboard UI.

Admin (roles: `admin`, `main_admin`, `sub_admin`):
- `/admin` (Admin Dashboard)
- `/admin/attendance` (Attendance Portal)
  - Reuses the attendance portal UI.
- `/admin/analytics` (Analytics Dashboard)
  - Attendance analytics UI (fetches analytics from backend).
- `/admin/users` (User Management)
  - Demo-only user management table (scaffolded for future API integration).
- `/admin/system` (System Configuration)
  - Demo-only system configuration scaffold.

Backward compatibility:
- `/attendance` redirects to `/teacher/attendance`

## QR Attendance Flow (Student Check-in)

The student check-in page uses `QrScanner` which:
- scans the QR with `html5-qrcode`
- POSTs to:
  - `${VITE_API_URL}/api/attendance/mark`
- includes JWT from `localStorage` as `Authorization: Bearer <token>`

