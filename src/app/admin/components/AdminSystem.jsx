import React from 'react';

const AdminSystem = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">System Configuration</h1>
        <p className="text-gray-600">
          System settings and operational checks. This page is UI scaffolding for future API
          integration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-5">
          <h2 className="font-semibold text-gray-900 mb-2">Environment</h2>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>
              <span className="font-medium">PORT</span> - backend server port
            </li>
            <li>
              <span className="font-medium">MONGODB_URI</span> - Mongo connection string
            </li>
            <li>
              <span className="font-medium">JWT_SECRET</span> - JWT signing secret
            </li>
            <li>
              <span className="font-medium">REDIS_HOST</span>/<span className="font-medium">REDIS_PORT</span>
            </li>
            <li>
              <span className="font-medium">GROK_API_URL</span> - AI provider endpoint
            </li>
          </ul>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-5">
          <h2 className="font-semibold text-gray-900 mb-2">Operational Checks</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-700 font-bold">
                ✓
              </div>
              <div>
                <p className="font-medium text-gray-900">Database Connectivity</p>
                <p className="text-sm text-gray-600">MongoDB connection status is expected to be tracked server-side.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700 font-bold">
                i
              </div>
              <div>
                <p className="font-medium text-gray-900">CORS & Auth Headers</p>
                <p className="text-sm text-gray-600">API calls should include the JWT token from local storage.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center text-yellow-700 font-bold">
                !
              </div>
              <div>
                <p className="font-medium text-gray-900">AI Features</p>
                <p className="text-sm text-gray-600">If you enable schedule generation, ensure the Grok API key is configured.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
        <p className="text-sm text-blue-900 font-medium">
          Note: Hook this page up to backend routes to enable editing settings, running health checks, and viewing logs.
        </p>
      </div>
    </div>
  );
};

export default AdminSystem;

