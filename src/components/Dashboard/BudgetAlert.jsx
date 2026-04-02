import React from 'react';
import { AlertCircle, ArrowUpRight, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFinance } from '../../context/FinanceContext';

export const BudgetAlert = () => {
  const { budgetStatus } = useFinance();

  if (budgetStatus.type === 'normal') return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className={`mb-6 overflow-hidden rounded-xl border ${
          budgetStatus.type === 'critical'
            ? 'bg-rose-50 border-rose-200 dark:bg-rose-950/20 dark:border-rose-900/30'
            : 'bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/30'
        }`}
      >
        <div className="p-4 flex items-start gap-4">
          <div className={`mt-0.5 p-2 rounded-full ${
            budgetStatus.type === 'critical'
              ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400'
              : 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400'
          }`}>
            {budgetStatus.type === 'critical' ? (
              <AlertCircle className="h-5 w-5" />
            ) : (
              <Info className="h-5 w-5" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className={`text-sm font-bold ${
              budgetStatus.type === 'critical' ? 'text-rose-800 dark:text-rose-300' : 'text-amber-800 dark:text-amber-300'
            }`}>
              {budgetStatus.message}
            </h3>
            <p className={`mt-1 text-sm ${
              budgetStatus.type === 'critical' ? 'text-rose-700 dark:text-rose-400' : 'text-amber-700 dark:text-amber-400'
            }`}>
              You have spent <span className="font-bold">{budgetStatus.percentage.toFixed(1)}%</span> of your monthly budget. 
              {budgetStatus.type === 'critical' 
                ? ' Consider reviewing your recent transactions and limiting further expenses.' 
                : ' You are approaching your set limit. Keep an eye on incoming bills.'}
            </p>
          </div>

          <div className="hidden sm:block">
            <button className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              budgetStatus.type === 'critical'
                ? 'bg-rose-600 text-white hover:bg-rose-700'
                : 'bg-amber-600 text-white hover:bg-amber-700'
            }`}>
              View Details
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
