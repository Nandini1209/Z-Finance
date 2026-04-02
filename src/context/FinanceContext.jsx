import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';

export const FinanceContext = createContext();

const initialTransactions = [
  { id: '1', name: 'Grocery Market', amount: 145.2, date: '2025-10-01', category: 'Food', status: 'Completed' },
  { id: '2', name: 'Monthly Rent', amount: 1200.0, date: '2025-10-02', category: 'Rent', status: 'Completed' },
  { id: '3', name: 'Tech Innovations Inc Salary', amount: 4500.0, date: '2025-10-05', category: 'Salary', status: 'Completed' },
  { id: '4', name: 'Coffee Shop', amount: 5.5, date: '2025-10-06', category: 'Food', status: 'Completed' },
  { id: '5', name: 'Electric Bill', amount: 85.0, date: '2025-10-08', category: 'Utilities', status: 'Completed' },
  { id: '6', name: 'Internet Provider', amount: 60.0, date: '2025-10-09', category: 'Utilities', status: 'Completed' },
  { id: '7', name: 'Online Book Store', amount: 35.0, date: '2025-10-10', category: 'Entertainment', status: 'Completed' },
  { id: '8', name: 'Gym Membership', amount: 50.0, date: '2025-10-11', category: 'Health', status: 'Completed' },
  { id: '9', name: 'City Transport', amount: 25.0, date: '2025-10-12', category: 'Transport', status: 'Completed' },
  { id: '10', name: 'Pharmacy', amount: 18.5, date: '2025-10-14', category: 'Health', status: 'Completed' },
  { id: '11', name: 'Dinner out', amount: 85.0, date: '2025-10-15', category: 'Food', status: 'Completed' },
  { id: '12', name: 'Freelance Design', amount: 300.0, date: '2025-10-18', category: 'Salary', status: 'Completed' },
  { id: '13', name: 'Water Bill', amount: 45.0, date: '2025-10-20', category: 'Utilities', status: 'Completed' },
  { id: '14', name: 'Gas Station', amount: 55.0, date: '2025-10-22', category: 'Transport', status: 'Completed' },
  { id: '15', name: 'Movie Theater', amount: 30.0, date: '2025-10-24', category: 'Entertainment', status: 'Pending' },
  { id: '16', name: 'Supermarket', amount: 210.0, date: '2025-10-25', category: 'Food', status: 'Pending' },
  { id: '17', name: 'Clothing Store', amount: 120.0, date: '2025-10-26', category: 'Shopping', status: 'Pending' },
  { id: '18', name: 'Home Insurance', amount: 150.0, date: '2025-10-28', category: 'Insurance', status: 'Completed' },
  { id: '19', name: 'Car Wash', amount: 15.0, date: '2025-10-29', category: 'Transport', status: 'Completed' },
  { id: '20', name: 'Coffee Shop', amount: 4.5, date: '2025-10-31', category: 'Food', status: 'Completed' }
];

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [role, setRole] = useState('User'); // 'User' or 'Admin'
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // Handle dark mode toggle
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  const toggleRole = () => setRole((prev) => (prev === 'User' ? 'Admin' : 'User'));

  const deleteTransaction = (id) => {
    if (role === 'Admin') {
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const addTransaction = (transaction) => {
    setTransactions((prev) => [...prev, { ...transaction, id: Date.now().toString() }]);
  };

  // Mock Admin Metrics
  const adminMetrics = {
    totalUsers: 124,
    activeSubscriptions: 89,
    platformVolume: 1250000.50
  };

  const monthlyBudget = 3000;

  const { totalBalance, monthlyIncome, monthlyExpenses } = useMemo(() => {
    return transactions.reduce(
      (acc, transaction) => {
        // Income categories
        const isIncome = transaction.category === 'Salary' || transaction.category === 'Investment';
        
        if (isIncome) {
          acc.monthlyIncome += transaction.amount;
          acc.totalBalance += transaction.amount;
        } else {
          acc.monthlyExpenses += transaction.amount;
          acc.totalBalance -= transaction.amount;
        }
        return acc;
      },
      { totalBalance: 0, monthlyIncome: 0, monthlyExpenses: 0 }
    );
  }, [transactions]);

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        role,
        theme,
        toggleTheme,
        toggleRole,
        deleteTransaction,
        addTransaction,
        totalBalance,
        monthlyIncome,
        monthlyExpenses,
        adminMetrics,
        monthlyBudget,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);
