import React from 'react';
import { Menu, Moon, Sun, UserCircle } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';

export const Header = ({ toggleSidebar }) => {
  const { role, toggleRole, theme, toggleTheme } = useFinance();

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
        <div className="flex flex-1 items-center font-semibold text-slate-800 dark:text-slate-200">
          Zorvyn Assignment Showcase
        </div>
        
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-400 hover:text-slate-500 dark:hover:text-slate-300 bg-slate-100 dark:bg-slate-800 transition-colors"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
          
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-slate-200 dark:lg:bg-slate-700" aria-hidden="true" />
          
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">View as:</span>
            <button
              onClick={toggleRole}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                role === 'Admin'
                  ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
                  : 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 border border-primary-200 dark:border-primary-800'
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
