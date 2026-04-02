import React from 'react';
import { Users, Shield, ShieldAlert, CheckCircle2 } from 'lucide-react';

const mockUsers = [
  { id: 1, name: 'Nandini Apaar', email: 'nandini@example.com', role: 'Admin', status: 'Active', joined: '2025-01-15' },
  { id: 2, name: 'John Doe', email: 'john@example.com', role: 'User', status: 'Active', joined: '2025-02-10' },
  { id: 3, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive', joined: '2025-03-05' },
  { id: 4, name: 'Alice Johnson', email: 'alice@example.com', role: 'User', status: 'Active', joined: '2025-05-20' },
  { id: 5, name: 'Bob Williams', email: 'bob@example.com', role: 'User', status: 'Active', joined: '2025-08-11' },
];

export const UserManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">User Management</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            View and manage all users on the platform. (Admin Only)
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-950/50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-slate-200">User</th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-slate-200">Role</th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-slate-200">Status</th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-slate-200">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {mockUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-tr from-primary-500 to-indigo-500 flex items-center justify-center text-white font-medium text-sm">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-slate-900 dark:text-slate-100">{user.name}</div>
                        <div className="text-sm border-l-0 text-slate-500 dark:text-slate-400">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm font-medium">
                      {user.role === 'Admin' ? (
                        <span className="flex items-center text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 px-2.5 py-1 rounded-full">
                          <ShieldAlert className="w-4 h-4 mr-1.5" /> Admin
                        </span>
                      ) : (
                        <span className="flex items-center text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 px-2.5 py-1 rounded-full">
                          <Users className="w-4 h-4 mr-1.5" /> User
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      user.status === 'Active' 
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400' 
                        : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}>
                      {user.status === 'Active' && <CheckCircle2 className="w-3.5 h-3.5 mr-1" />}
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                    {new Date(user.joined).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
