import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import StudentLayout from '../app/students/layout.jsx'
import StudentDashboard from '../app/students/studentdashboard/StudentDashboard.jsx'
import MyCourses from '../app/students/components/myCourses.jsx'
import StudentCheckIn from '../app/students/components/CheckIn.jsx'
import Assignments from '../app/students/components/assigment.jsx'
import TeacherLayout from '../app/teachers/layout.jsx'
import TeacherDashboard from '../app/teachers/teacherdashboard/TeacherDashboard.jsx'
import TeacherAnalytics from '../app/teachers/components/TeacherAnalytics.jsx'
import AttendancePortal from '../app/teachers/components/AttendancePortal.jsx'
import Login from '../app/auth/login/login.jsx'
import AdminLayout from '../app/admin/layout.jsx'
import AdminDashboard from '../app/admin/admindashboard/admin.jsx'
import AnalyticsDashboard from '../app/admin/components/AnalyticsDashboard.jsx'
import AdminUsers from '../app/admin/components/AdminUsers.jsx'
import AdminSystem from '../app/admin/components/AdminSystem.jsx'
import ProtectedRoute from '../component/ProtectedRoute.jsx'

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route - Login */}
        <Route path="/" element={<Login />} />

        {/* Admin Routes - Only accessible by admin/main_admin/sub_admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin', 'main_admin', 'sub_admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="attendance" element={<AttendancePortal />} />
          <Route path="analytics" element={<AnalyticsDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="system" element={<AdminSystem />} />
        </Route>

        {/* Student Routes - Only accessible by students */}
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<StudentDashboard />} />
          <Route path="checkin" element={<StudentCheckIn />} />
          <Route path="courses" element={<MyCourses />} />
          <Route path="assignments" element={<Assignments />} />
        </Route>

        {/* Teacher Routes - Only accessible by teachers */}
        <Route
          path="/teacher"
          element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <TeacherLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<TeacherDashboard />} />
          <Route path="attendance" element={<AttendancePortal />} />
          <Route path="analytics" element={<TeacherAnalytics />} />
        </Route>

        {/* Backward compatible redirect */}
        <Route
          path="/attendance"
          element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <Navigate to="/teacher/attendance" replace />
            </ProtectedRoute>
          }
        />

        {/* Catch all - redirect to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes