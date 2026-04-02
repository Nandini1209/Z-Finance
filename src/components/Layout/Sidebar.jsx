import React from 'react';
import { LayoutDashboard, Receipt, PieChart, Menu, Users } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';

export const Sidebar = ({ isOpen, toggleSidebar, currentTab, setCurrentTab }) => {
  const { role } = useFinance();

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: Receipt },
  ];

  if (role === 'Admin') {
    tabs.push({ id: 'users', label: 'Users Management', icon: Users });
  }

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex h-16 items-center justify-between px-6 border-b border-slate-200 dark:border-slate-800">
        <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-indigo-500 bg-clip-text text-transparent">
          Z-Finance
        </span>
        <button onClick={toggleSidebar} className="lg:hidden p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <nav className="p-4 space-y-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'text-primary-600 dark:text-primary-400' : ''}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="absolute bottom-0 w-full p-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center space-x-3 px-4 py-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary-500 to-indigo-500 flex items-center justify-center text-white font-medium text-sm">
            NA
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Nandini Apaar</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Intern Assessment</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
