import React from 'react';
import { Menu, Moon, Sun, UserCircle, Bell } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';

export const Header = ({ toggleSidebar }) => {
  const { role, toggleRole, theme, toggleTheme, budgetStatus } = useFinance();

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 transition-colors duration-300">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-slate-700 dark:text-slate-300 lg:hidden hover:text-primary-600 focus:outline-none"
        onClick={toggleSidebar}
      >
        <span className="sr-only">Open sidebar</span>
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex flex-1 items-center font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-sm">
          Zorvyn Assignment Showcase
        </div>
        
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <div className="flex items-center gap-2 pr-2 border-r border-slate-200 dark:border-slate-700">
            <button
              className="relative p-2 rounded-full text-slate-400 hover:text-slate-500 dark:hover:text-slate-300 bg-slate-100 dark:bg-slate-800 transition-colors"
              title="Notifications"
            >
              <Bell className="h-5 w-5" />
              {budgetStatus.type !== 'normal' && (
                <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${budgetStatus.type === 'critical' ? 'bg-rose-400' : 'bg-amber-400'}`}></span>
                  <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${budgetStatus.type === 'critical' ? 'bg-rose-500' : 'bg-amber-500'}`}></span>
                </span>
              )}
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-400 hover:text-slate-500 dark:hover:text-slate-300 bg-slate-100 dark:bg-slate-800 transition-colors"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-xs font-medium text-slate-500 dark:text-slate-400">View as:</span>
            <button
              onClick={toggleRole}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                role === 'Admin'
                  ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 border border-rose-200 dark:border-rose-800 shadow-sm'
                  : 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 border border-primary-200 dark:border-primary-800 shadow-sm'
              }`}
            >
              <UserCircle className="h-4 w-4" />
              {role}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
