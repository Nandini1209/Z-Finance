import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useFinance } from '../../context/FinanceContext';

export const IncomeExpenseChart = () => {
  const { transactions } = useFinance();

  const data = useMemo(() => {
    // Group transactions by date
    const groupedData = transactions.reduce((acc, t) => {
      const date = new Date(t.date);
      // Format as "Oct 01"
      const dateString = date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
      
      if (!acc[dateString]) {
        acc[dateString] = { name: dateString, Income: 0, Expenses: 0, rawDate: t.date };
      }
      
      const isIncome = t.category === 'Salary' || t.category === 'Investment';
      if (isIncome) {
        acc[dateString].Income += t.amount;
      } else {
        if (t.status !== 'Pending') {
          acc[dateString].Expenses += t.amount;
        }
      }
      
      return acc;
    }, {});

    // Convert to array and sort by date
    return Object.values(groupedData).sort((a, b) => new Date(a.rawDate) - new Date(b.rawDate));
  }, [transactions]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 p-3 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg">
          <p className="font-medium text-slate-900 dark:text-slate-100 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm font-bold" style={{ color: entry.color }}>
              {entry.name}: ${entry.value.toFixed(2)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 flex flex-col h-full">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6">Cash Flow</h3>
      
      {data.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-slate-500 dark:text-slate-400 min-h-[300px]">
          No cash flow data available
        </div>
      ) : (
        <div className="w-full flex-1 min-h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" className="dark:stroke-slate-700/50" />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148, 163, 184, 0.1)' }} />
              <Legend 
                verticalAlign="top" 
                height={36}
                formatter={(value) => <span className="text-slate-700 dark:text-slate-300 font-medium text-sm ml-1">{value}</span>}
              />
              <Bar dataKey="Income" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={40} />
              <Bar dataKey="Expenses" fill="#f43f5e" radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};
