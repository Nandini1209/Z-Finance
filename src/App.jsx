import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { OverviewCards } from './components/Dashboard/OverviewCards';
import { SpendingChart } from './components/Dashboard/SpendingChart';
import { IncomeExpenseChart } from './components/Dashboard/IncomeExpenseChart';
import { TransactionTable } from './components/Transactions/TransactionTable';
import { UserManagement } from './components/Admin/UserManagement';
import { BudgetAlert } from './components/Dashboard/BudgetAlert';
import { useFinance } from './context/FinanceContext';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState('dashboard');
  const { role } = useFinance();

  useEffect(() => {
    if (role === 'User' && currentTab === 'users') {
      setCurrentTab('dashboard');
    }
  }, [role, currentTab]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-300">
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
      />
      
      <div className="flex flex-col flex-1 lg:pl-64">
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                {currentTab === 'dashboard' ? 'Dashboard Overview' : currentTab === 'transactions' ? 'Transactions' : 'Users Management'}
              </h1>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {currentTab === 'dashboard' && (
                <motion.div 
                  key="dashboard"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <BudgetAlert />
                  <OverviewCards />
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                      <IncomeExpenseChart />
                    </div>
                    <div className="lg:col-span-1">
                      <SpendingChart />
                    </div>
                  </div>
                  <div className="lg:col-span-3">
                    <TransactionTable />
                  </div>
                </motion.div>
              )}

              {currentTab === 'transactions' && (
                <motion.div 
                  key="transactions"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="h-[80vh]"
                >
                  <TransactionTable />
                </motion.div>
              )}

              {currentTab === 'users' && (
                <motion.div 
                  key="users"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="h-[80vh]"
                >
                  <UserManagement />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
      
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}

export default App;
