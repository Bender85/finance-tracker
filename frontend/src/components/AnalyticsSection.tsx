import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setCategoryBudget } from '../api/transactions';
import { useAnalytics } from '../hooks/useAnalytics';

// Палітра кольорів для смуг витрат
const BG_COLORS = ['bg-indigo-500', 'bg-rose-500', 'bg-emerald-500', 'bg-amber-500', 'bg-purple-500', 'bg-cyan-500'];

export default function AnalyticsSection() {
  const queryClient = useQueryClient();
  const { analyticsData, isLoadingAnalytics } = useAnalytics();

  // Стейт для форми бюджетів
  const [selectedCategory, setSelectedCategory] = useState('');
  const [budgetLimit, setBudgetLimit] = useState('');
  const [showBudgetForm, setShowBudgetForm] = useState(false);

  // ✅ ВСІ ХУКИ ПОВИННІ БУТИ ТУТ — ДО БУДЬ-ЯКИХ РАННІХ RETURN!
  const budgetMutation = useMutation({
    mutationFn: setCategoryBudget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
      setBudgetLimit('');
      setSelectedCategory('');
      setShowBudgetForm(false);
    },
    onError: (error: any) => {
      alert(error.response?.data?.detail || "Не вдалося встановити ліміт");
    }
  });

  // 🔄 ТЕПЕР РАННІЙ RETURN ЦІЛКОМ БЕЗПЕЧНИЙ ДЛЯ ПОРЯДКУ ХУКІВ
  if (isLoadingAnalytics) {
    return (
      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 text-center text-slate-400 text-sm">
        Завантаження аналітики...
      </div>
    );
  }

  const handleBudgetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || !budgetLimit) return;
    
    budgetMutation.mutate({
      category_name: selectedCategory,
      amount_limit: parseFloat(budgetLimit)
    });
  };

  const chartData = analyticsData?.by_categories || [];
  const totalSpent = Number(analyticsData?.total_spent || 0);
  const hasData = chartData.length > 0;

  return (
    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-bold mb-1 text-indigo-400">Аналітика витрат</h3>
        <p className="text-xs text-slate-400 mb-4">Розподіл за поточний місяць</p>
      </div>

      {!hasData ? (
        <div className="h-[150px] flex items-center justify-center text-sm text-slate-500 italic">
          Немає даних про витрати для аналізу
        </div>
      ) : (
        <div className="space-y-4">
          {/* Стрічка категорій на чистому Tailwind CSS */}
          <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
            {analyticsData.by_categories.map((cat) => {
              const totalAmountNum = Number(cat.total_amount);
              const amountLimitNum = Number(cat.amount_limit);

              // 🌟 МАГІЯ ВАРІАНТУ 1: 
              // Якщо ліміт задано — рахуємо від ліміту (але не більше 100%).
              // Якщо ліміту немає (0) — рахуємо долю категорії від ЗАГАЛЬНИХ витрат місяця!
              const percentage = amountLimitNum > 0 
                ? Math.min((totalAmountNum / amountLimitNum) * 100, 100) 
                : totalSpent > 0 ? (totalAmountNum / totalSpent) * 100 : 0;

              return (
                <div key={cat.category_name} className="space-y-2">
                  {/* ... твій існуючий блок із назвою категорії та сумою залишається без змін ... */}
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300 font-medium">{cat.category_name}</span>
                    <span className="text-slate-400">
                      {Number(cat.total_amount).toFixed(2)} ₴ 
                      {cat.amount_limit > 0 && ` / ${cat.amount_limit.toFixed(2)} ₴`}
                    </span>
                  </div>
                  
                  {/* ТРЕК (СІРА СМУЖКА) */}
                  <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-800">
                    {/* ПРОГРЕС — МИНЯЄМО ШИРИНУ НА ЧИСТИЙ % БЕЗ ФОЛБЕКУ 100 */}
                    <div 
                      style={{ width: `${percentage}%` }} // <-- ПРИБРАЛИ "|| 100"
                      className={`h-full rounded-full transition-all duration-500 shadow-sm ${
                        cat.is_exceeded 
                          ? 'bg-rose-500 shadow-rose-500/40 animate-pulse'
                          : 'bg-indigo-500 shadow-indigo-500/40'
                      }`}
                    />
                  </div>

                  {/* МАЛЕНЬКЕ ПОПЕРЕДЖЕННЯ ТЕКСТОМ */}
                  {cat.is_exceeded && (
                    <p className="text-[10px] text-rose-400 font-semibold animate-pulse flex items-center gap-1">
                      ⚠️ Увага! Перевищено місячний ліміт бюджету на цю категорію!
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Сумарний блок знизу */}
          <div className="pt-4 border-t border-slate-700 flex justify-between items-center text-sm">
            <span className="text-slate-400">Всього витрачено:</span>
            <span className="text-lg font-extrabold text-rose-400">
              {totalSpent.toFixed(2)} ₴
            </span>
          </div>
        </div>
      )}
      
      {/* КНОПКА ТА ФОРМА КЕРУВАННЯ БЮДЖЕТАМИ ЗНИЗУ ВІДЖЕТА */}
      <div className="pt-4 border-t border-slate-700 space-y-3">
        <button
          onClick={() => setShowBudgetForm(!showBudgetForm)}
          className="w-full text-center text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors py-1 bg-slate-900/40 rounded-lg border border-slate-700/60"
        >
          {showBudgetForm ? '✕ Закрити налаштування лімітів' : '⚙️ Встановити ліміти на категорії'}
        </button>

        {showBudgetForm && (
          <form onSubmit={handleBudgetSubmit} className="space-y-3 p-3 bg-slate-900 rounded-xl border border-slate-700 animate-fadeIn">
            <div className="grid grid-cols-2 gap-2">
              <select
                required
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-800 border border-slate-600 rounded-xl px-2 py-1 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="">-- Категорія --</option>
                {chartData.map(cat => (
                  <option key={cat.category_name} value={cat.category_name}>{cat.category_name}</option>
                ))}
              </select>

              <input
                type="number"
                required
                min="0"
                placeholder="Ліміт (0 - прибрати)"
                value={budgetLimit}
                onChange={(e) => setBudgetLimit(e.target.value)}
                className="bg-slate-800 border border-slate-600 rounded-xl px-2 py-1 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={budgetMutation.isPending}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 text-white text-xs font-bold py-1.5 rounded-xl transition-colors"
            >
              {budgetMutation.isPending ? 'Збереження...' : 'Зберегти ліміт бюджету'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
