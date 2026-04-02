import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Users, CreditCard, Activity } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';

export const OverviewCards = () => {
  const { totalBalance, monthlyIncome, monthlyExpenses, role, adminMetrics, monthlyBudget } = useFinance();

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
      color: 'bg-rose-500',
      textColor: 'text-rose-600',
      bgLight: 'bg-rose-50',
      bgDark: 'dark:bg-rose-900/20',
      gradient: 'from-rose-500 to-pink-500',
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
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-500 dark:text-slate-400">Budget Limit</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    ${monthlyBudget?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                  <div 
                    className="bg-rose-500 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min((card.amount / (monthlyBudget || 1)) * 100, 100)}%` }}
                  ></div>
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
