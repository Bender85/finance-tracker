import { useState } from 'react';
import { useAccounts } from '../hooks/useAccounts';
import { useTransactions } from '../hooks/useTransactions';
import axiosClient from '../api/axiosClient';

export default function TransactionSection() {
  const { accounts } = useAccounts();

  // 1. Створюємо локальні стейти для фільтрів на фронтенді
  const [filterAccount, setFilterAccount] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

 // 2. Перший виклик: Тільки для збору УСІХ категорій за обраним рахунком
  const { transactions: allTransactions } = useTransactions({
    account_id: filterAccount || undefined,
  });

  // 3. Другий виклик: Фінальний список + ТУТ МИ ЗАБИРАЄМО МУТАЦІЇ create ТА delete
  const { 
    transactions, 
    isLoadingTransactions,
    exportUrl, 
    createTransaction, // Переконайся, що цей рядок присутній!
    deleteTransaction  // Переконайся, що цей рядок присутній!
  } = useTransactions({
    account_id: filterAccount || undefined,
    category_name: filterCategory || undefined,
  });

  // 4. Динамічний збір унікальних категорій
  const dynamicCategories = Array.from(
    new Set(
      allTransactions
        .map((tx) => tx.category_name)
        .filter((cat): cat is string => !!cat && cat.trim() !== '')
    )
  );

  const [txAmount, setTxAmount] = useState('');
  const [txAccount, setTxAccount] = useState('');
  const [txCategory, setTxCategory] = useState('');

  // Будуємо динамічний URL для скачування CSV з урахуванням фільтрів екрану
  // Оскільки backend очікує порт 8000 та префікс /api/v1/
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

  const handleDownloadReport = async () => {
  try {
    // 1. Формуємо параметри фільтрації, як і раніше
    const params: Record<string, string> = {};
    if (filterAccount) params.account_id = filterAccount;
    if (filterCategory) params.category_name = filterCategory;

    // 2. Робимо запит через axiosClient, який ГАРАНТОВАНО підставить правильний токен!
    // Важливо вказати responseType: 'blob', щоб передати файл як бінарний потік
    const response = await axiosClient.get('/transactions/export', {
      params,
      responseType: 'blob'
    });

    // 3. Перетворюємо бінарну відповідь у файл та завантажуємо в браузері
    const blob = new Blob([response.data], { type: 'text/csv; charset=utf-8' });
    const downloadUrl = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = downloadUrl;
    // Генеруємо красиву назву файлу з поточною датою
    a.download = `financial_report_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    
    // Очищаємо пам'ять за собою
    a.remove();
    window.URL.revokeObjectURL(downloadUrl);
  } catch (err) {
    console.error("Експорт звіту провалився:", err);
    alert("Не вдалося завантажити фінансовий звіт. Перевірте авторизацію.");
  }
};

  // Допоміжна функція для скачування Blob файлів (можна додати вгорі файлу або компонента)
  const downloadFile = async (url: string, token: string | null) => {
    try {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Помилка генерації звіту");
      
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `financial_report_${new Date().toISOString().slice(0,10)}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      alert("Не вдалося завантажити фінансовий звіт");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!txAmount || !txAccount || !txCategory) return;
    await createTransaction({
      account_id: txAccount,
      amount: parseFloat(txAmount),
      type: 'EXPENSE',
      category_name: txCategory,
      description: 'Фронтенд операція'
    });
    setTxAmount('');
    setTxCategory('');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:col-span-2">
      {/* Форма додавання операції */}
      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-sm h-fit">
        <h3 className="text-lg font-bold mb-4 text-indigo-400">Додати Витрату</h3>
        {/* ШАПКА БЛОКУ З ФІЛЬТРАМИ */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-700">
          <div>
            <h3 className="text-lg font-bold text-indigo-400">Історія операцій</h3>
            <p className="text-xs text-slate-400">Список ваших фінансових подій</p>
          </div>

          {/* НАШІ НОВІ СЕЛЕКТОРИ ФІЛЬТРАЦІЇ */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Вибір рахунку */}
            <select
              value={filterAccount}
              onChange={(e) => setFilterAccount(e.target.value)}
              className="bg-slate-900  border border-slate-600 rounded-xl px-2 py-1 text-xs text-white focus:outline-none"
            >
              <option value="">Всі рахунки</option>
              {accounts.map(acc => (
                <option key={acc.id} value={acc.id}>{acc.name}</option>
              ))}
            </select>

            {/* Вибір категорії */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-slate-900 border border-slate-600 rounded-xl px-2 py-1 text-xs text-white focus:outline-none"
            >
              <option value="">Всі категорії</option>
              {dynamicCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {/* НАША НОВА КНОПКА ЕКСПОРТУ */}
            <button
              onClick={handleDownloadReport}
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-900 text-xs font-bold px-3 py-1 rounded-xl transition-colors flex items-center gap-1 shadow-sm"
              title="Експортувати звіт в Excel/CSV"
            >
              📊 Звіт
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-slate-400">Оберіть рахунок</label>
            <select
              value={txAccount}
              onChange={(e) => setTxAccount(e.target.value)}
              className="mt-1 w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
              required
            >
              <option value="">-- Оберіть --</option>
              {accounts.map(acc => (
                <option key={acc.id} value={acc.id}>{acc.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-400">Сума витрати</label>
            <input
              type="number"
              required
              placeholder="0.00"
              value={txAmount}
              onChange={(e) => setTxAmount(e.target.value)}
              className="mt-1 w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400">Категорія</label>
            <input
              type="text"
              required
              placeholder="Напр. Продукти"
              value={txCategory}
              onChange={(e) => setTxCategory(e.target.value)}
              className="mt-1 w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
            />
          </div>

          <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-sm font-medium py-2 rounded-xl transition-colors">
            Зафіксувати витрату
          </button>
        </form>
      </div>

      {/* Стрічка історії */}
      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-sm">
        <h3 className="text-lg font-bold mb-4 text-indigo-400">Останні операції</h3>
        {transactions.length === 0 ? (
          <p className="text-slate-400 text-sm">Операцій немає.</p>
        ) : (
          <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
            {transactions.map((tx) => (
              <div key={tx.id} className="bg-slate-700 p-3 rounded-xl flex justify-between items-center border border-slate-600 text-sm">
                <div>
                  <p className="font-medium text-white">{tx.category_name}</p>
                  <p className="text-xs text-slate-400">{new Date(tx.date).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className={`font-bold ${tx.type === 'EXPENSE' ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {tx.type === 'EXPENSE' ? '-' : '+'}{Number(tx.amount).toFixed(2)} ₴
                  </p>
                  <button onClick={() => deleteTransaction(tx.id)} className="text-slate-500 hover:text-red-400 transition-colors">
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
