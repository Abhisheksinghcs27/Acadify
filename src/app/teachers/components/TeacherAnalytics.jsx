import React from 'react';
import AnalyticsDashboard from '../../admin/components/AnalyticsDashboard.jsx';

// Teacher-specific wrapper around the shared analytics dashboard UI.
const TeacherAnalytics = () => {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Teacher Analytics</h1>
        <p className="text-gray-600">
          Attendance insights and trends to help you track student participation over time.
        </p>
      </div>

      <AnalyticsDashboard />
    </div>
  );
};

export default TeacherAnalytics;

