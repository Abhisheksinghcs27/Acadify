import React, { useMemo, useState } from 'react';

const AdminUsers = () => {
  const [users, setUsers] = useState([
    {
      id: 'u1',
      name: 'Sarah Johnson',
      role: 'teacher',
      email: 'sarah@example.com',
      status: 'Active',
    },
    {
      id: 'u2',
      name: 'Michael Brown',
      role: 'teacher',
      email: 'michael@example.com',
      status: 'Active',
    },
    {
      id: 'u3',
      name: 'Aisha Khan',
      role: 'student',
      email: 'aisha@example.com',
      status: 'Pending',
    },
    {
      id: 'u4',
      name: 'Main Admin',
      role: 'main_admin',
      email: 'admin@example.com',
      status: 'Active',
    },
  ]);

  const [filter, setFilter] = useState('all');

  const roles = useMemo(() => {
    return Array.from(new Set(users.map((u) => u.role)));
  }, [users]);

  const visible = useMemo(() => {
    if (filter === 'all') return users;
    return users.filter((u) => u.role === filter);
  }, [users, filter]);

  const toggleUserStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? {
            ...u,
            status: u.status === 'Active' ? 'Suspended' : 'Active',
          }
          : u
      )
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
        <p className="text-gray-600">
          Manage teachers, students and admins. This UI is currently demo-only, but the structure is ready
          for API integration.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-xl border text-sm font-medium transition-colors ${
            filter === 'all' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white border-gray-200 hover:bg-gray-50'
          }`}
        >
          All roles
        </button>
        {roles.map((role) => (
          <button
            key={role}
            type="button"
            onClick={() => setFilter(role)}
            className={`px-4 py-2 rounded-xl border text-sm font-medium transition-colors ${
              filter === role
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white border-gray-200 hover:bg-gray-50'
            }`}
          >
            {role}
          </button>
        ))}
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left py-3 px-4 font-semibold">Name</th>
                <th className="text-left py-3 px-4 font-semibold">Role</th>
                <th className="text-left py-3 px-4 font-semibold">Email</th>
                <th className="text-left py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((u) => {
                const statusTone =
                  u.status === 'Active'
                    ? 'bg-green-50 text-green-800 border-green-200'
                    : u.status === 'Pending'
                      ? 'bg-yellow-50 text-yellow-800 border-yellow-200'
                      : 'bg-red-50 text-red-800 border-red-200';

                return (
                  <tr key={u.id} className="border-t border-gray-100">
                    <td className="py-4 px-4 font-medium text-gray-900">{u.name}</td>
                    <td className="py-4 px-4 text-gray-700">{u.role}</td>
                    <td className="py-4 px-4 text-gray-700">{u.email}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-medium ${statusTone}`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => toggleUserStatus(u.id)}
                        className="px-4 py-2 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition-colors text-xs font-medium"
                      >
                        Toggle Status
                      </button>
                    </td>
                  </tr>
                );
              })}
              {visible.length === 0 && (
                <tr>
                  <td className="py-10 px-4 text-center text-gray-500" colSpan={5}>
                    No users match this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;

