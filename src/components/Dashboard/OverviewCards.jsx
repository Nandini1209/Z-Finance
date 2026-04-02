import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Users, CreditCard, Activity, Edit2, Check, X } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';

export const OverviewCards = () => {
  const { totalBalance, monthlyIncome, monthlyExpenses, role, adminMetrics, monthlyBudget, setMonthlyBudget, budgetStatus } = useFinance();
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [tempBudget, setTempBudget] = useState(monthlyBudget);

  const handleSaveBudget = () => {
    setMonthlyBudget(Number(tempBudget));
    setIsEditingBudget(false);
  };

  const userCards = [
    {
      name: 'Total Balance',
      amount: totalBalance,
      icon: DollarSign,
      color: 'bg-primary-500',
      textColor: 'text-primary-600',
      bgLight: 'bg-primary-50',
      bgDark: 'dark:bg-primary-900/20',
      gradient: 'from-primary-600 to-indigo-600',
      prefix: '$'
    },
    {
      name: 'Monthly Income',
      amount: monthlyIncome,
      icon: TrendingUp,
      color: 'bg-emerald-500',
      textColor: 'text-emerald-600',
      bgLight: 'bg-emerald-50',
      bgDark: 'dark:bg-emerald-900/20',
      gradient: 'from-emerald-500 to-teal-500',
      prefix: '$'
    },
    {
      name: 'Monthly Expenses',
      amount: monthlyExpenses,
      icon: TrendingDown,
      color: budgetStatus.type === 'critical' ? 'bg-rose-500' : budgetStatus.type === 'warning' ? 'bg-amber-500' : 'bg-primary-500',
      textColor: budgetStatus.type === 'critical' ? 'text-rose-600' : budgetStatus.type === 'warning' ? 'text-amber-600' : 'text-primary-600',
      bgLight: budgetStatus.type === 'critical' ? 'bg-rose-50' : budgetStatus.type === 'warning' ? 'bg-amber-50' : 'bg-primary-50',
      bgDark: budgetStatus.type === 'critical' ? 'dark:bg-rose-900/20' : budgetStatus.type === 'warning' ? 'dark:bg-amber-900/20' : 'dark:bg-primary-900/20',
      gradient: budgetStatus.type === 'critical' ? 'from-rose-500 to-pink-500' : budgetStatus.type === 'warning' ? 'from-amber-500 to-orange-500' : 'from-primary-500 to-indigo-500',
      prefix: '$',
      hasBudget: true
    },
  ];

  const adminCards = [
    {
      name: 'Total Users',
      amount: adminMetrics?.totalUsers || 0,
      icon: Users,
      color: 'bg-indigo-500',
      textColor: 'text-indigo-600',
      bgLight: 'bg-indigo-50',
      bgDark: 'dark:bg-indigo-900/20',
      gradient: 'from-indigo-600 to-purple-600',
      prefix: ''
    },
    {
      name: 'Active Subscriptions',
      amount: adminMetrics?.activeSubscriptions || 0,
      icon: CreditCard,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgLight: 'bg-blue-50',
      bgDark: 'dark:bg-blue-900/20',
      gradient: 'from-blue-500 to-cyan-500',
      prefix: ''
    },
    {
      name: 'Platform Volume',
      amount: adminMetrics?.platformVolume || 0,
      icon: Activity,
      color: 'bg-amber-500',
      textColor: 'text-amber-600',
      bgLight: 'bg-amber-50',
      bgDark: 'dark:bg-amber-900/20',
      gradient: 'from-amber-500 to-orange-500',
      prefix: '$'
    },
  ];

  const cards = role === 'Admin' ? adminCards : userCards;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.name}
            className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-sm border border-slate-200 dark:border-slate-800 transition-all hover:shadow-md hover:-translate-y-1"
          >
            <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-10 bg-gradient-to-br ${card.gradient} transition-transform group-hover:scale-150`}></div>
            
            <div className="relative flex items-center justify-between z-10">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {card.name}
                </p>
                <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-50">
                  {card.prefix}{card.amount.toLocaleString(undefined, { 
                    minimumFractionDigits: card.prefix === '$' ? 2 : 0, 
                    maximumFractionDigits: card.prefix === '$' ? 2 : 0 
                  })}
                </p>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${card.bgLight} ${card.bgDark}`}>
                <Icon className={`h-6 w-6 ${card.textColor} dark:${card.textColor}`} aria-hidden="true" />
              </div>
            </div>
            
            {card.hasBudget ? (
              <div className="mt-5 relative z-10">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    Monthly Budget
                    {!isEditingBudget && (
                      <button 
                        onClick={() => setIsEditingBudget(true)}
                        className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-400 hover:text-primary-600 transition-colors"
                      >
                        <Edit2 className="h-3 w-3" />
                      </button>
                    )}
                  </span>
                  {isEditingBudget ? (
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        value={tempBudget}
                        onChange={(e) => setTempBudget(e.target.value)}
                        className="w-20 px-1 py-0.5 border border-primary-300 dark:border-primary-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-primary-500"
                        autoFocus
                      />
                      <button onClick={handleSaveBudget} className="p-1 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded">
                        <Check className="h-3 w-3" />
                      </button>
                      <button onClick={() => setIsEditingBudget(false)} className="p-1 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <span className={`font-bold ${budgetStatus.type === 'critical' ? 'text-rose-600' : budgetStatus.type === 'warning' ? 'text-amber-600' : 'text-slate-700 dark:text-slate-300'}`}>
                      ${monthlyBudget?.toLocaleString(undefined, { minimumFractionDigits: 0 })}
                    </span>
                  )}
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-2 rounded-full transition-all duration-700 ease-out ${
                      budgetStatus.type === 'critical' ? 'bg-rose-500' : budgetStatus.type === 'warning' ? 'bg-amber-500' : 'bg-primary-500'
                    }`} 
                    style={{ width: `${Math.min(budgetStatus.percentage, 100)}%` }}
                  ></div>
                </div>
                <div className="mt-1 flex justify-end">
                  <span className={`text-[10px] font-bold ${budgetStatus.type === 'critical' ? 'text-rose-600' : budgetStatus.type === 'warning' ? 'text-amber-600' : 'text-slate-500'}`}>
                    {budgetStatus.percentage.toFixed(0)}% used
                  </span>
                </div>
              </div>
            ) : (
              <div className="mt-4 flex items-center text-sm text-slate-500 dark:text-slate-400 relative z-10">
                <span className="font-medium text-emerald-500">+2.5%</span>
                <span className="ml-2">from last month</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
