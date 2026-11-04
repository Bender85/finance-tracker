'use client'

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAccounts } from '../hooks/useAccounts';
import { deleteAccount, updateAccount } from '../api/transactions';
import axiosClient from '../api/axiosClient';

const CURRENCY_SYMBOLS: Record<string, string> = {
  UAH: '₴',
  USD: '$',
  EUR: '€'
};

export default function AccountSection() {
  const { 
    accounts, 
    createAccount, 
    isCreatingAccount,
    transferFunds, 
    isTransferring 
  } = useAccounts();

  const queryClient = useQueryClient();

  // Стейт для створення нового рахунку
  const [accName, setAccName] = useState('');
  const [accBalance, setAccBalance] = useState('0');
  const [accCurrency, setAccCurrency] = useState('UAH');

  // Стейт для переказу між рахунками
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [transferAmount, setTransferAmount] = useState('');

  // Хендлер створення рахунку
  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accName) return;

    createAccount({
      name: accName,
      balance: Number(accBalance),
      currency: accCurrency // <-- ТЕПЕР ПЕРЕДАЄМО ДИНАМІЧНО ЗАМІСТЬ ЗАХАРДКОДЖЕНОГО "UAH"
    });

    setAccName('');
    setAccBalance('0');
    setAccCurrency('UAH'); // Скидаємо на дефолт
  };


  // Хендлер переказу коштів
  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromAccount || !toAccount || !transferAmount) return;
    
    try {
      await transferFunds({
        from_account_id: fromAccount,
        to_account_id: toAccount,
        amount: parseFloat(transferAmount)
      });
      // Очищаємо суму після успішного переказу
      setTransferAmount('');
    } catch (error) {
      console.error("Помилка під час переказу:", error);
    }
  };

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: { name: string } }) => 
      updateAccount(id, payload),
    onSuccess: () => {
      // Миттєво перемальовуємо рахунки на екрані
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
    onError: (error: any) => {
      alert(error.response?.data?.detail || "Помилка при оновленні рахунку");
    }
  });

  const handleEditName = (id: string, currentName: string) => {
    const newName = window.prompt(`Введіть нову назву для рахунку "${currentName}":`, currentName);
    if (newName && newName.trim() !== '' && newName !== currentName) {
      updateMutation.mutate({ id, payload: { name: newName.trim() } });
    }
  };

  const deleteMutation = useMutation({
    mutationFn: async (accountId: string) => {
      await axiosClient.delete(`/accounts/${accountId}`);
    },
    onSuccess: () => {
      // 🌟 ЗАЛІЗОБЕТОННЕ ОЧИЩЕННЯ: Оновлюємо рахунки, аналітику та стрічку транзакцій миттєво!
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
    onError: (error: any) => {
      alert("Не вдалося видалити рахунок");
    }
  });

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Ви дійсно хочете видалити рахунок "${name}"? Усі його транзакції зникнуть каскадно!`)) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* БЛОК 1: Список рахунків */}
      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-sm">
        <h3 className="text-lg font-bold mb-4 text-indigo-400">Мої Рахунки</h3>
        
        {accounts.length === 0 ? (
          <p className="text-slate-400 text-sm mb-4">Рахунків поки немає.</p>
        ) : (
          <div className="space-y-3 mb-6">
            {accounts.map((acc) => (
              <div key={acc.id} className="bg-slate-700 p-4 rounded-xl flex justify-between items-center border border-slate-600">
                <div>
                  <p className="font-semibold text-white">{acc.name}</p>
                  <p className="text-xs text-slate-400">Валюта: {acc.currency}</p>
                  <p className="text-[10px] text-slate-500 font-mono select-all">{acc.id}</p>
                </div>
                <p className="text-lg font-bold text-emerald-400">
                  {CURRENCY_SYMBOLS[acc.currency] || acc.currency} {Number(acc.balance).toFixed(2)}
                </p>
                <button 
                  onClick={() => handleEditName(acc.id, acc.name)}
                  className="text-slate-400 hover:text-indigo-400 transition-colors p-1"
                  title="Редагувати назву"
                >
                  ✏️
                </button>
                <button 
                  onClick={() => handleDelete(acc.id, acc.name)}
                  className="text-red-400 hover:text-red-600 transition-colors p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                  title="Видалити рахунок"
                >
                  🗑️  
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Форма швидкого створення рахунку */}
        <form onSubmit={handleCreate} className="pt-4 border-t border-slate-700 space-y-3">
          <input
            type="text"
            required
            placeholder="Назва рахунку (напр. Готівка)"
            value={accName}
            onChange={(e) => setAccName(e.target.value)}
            className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
          />
          <input
            type="number"
            required
            placeholder="Початковий баланс"
            value={accBalance}
            onChange={(e) => setAccBalance(e.target.value)}
            className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
          />
          {/* НАШ НОВИЙ ВИПАДАЮЧИЙ СПИСОК ВАЛЮТ */}
          <div>
            <label className="text-xs text-slate-400">Валюта</label>
            <select 
              value={accCurrency} 
              onChange={(e) => setAccCurrency(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-white text-sm focus:outline-none focus:border-indigo-500"
            >
              <option value="UAH">UAH (₴)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={isCreatingAccount}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-sm font-medium py-2 rounded-xl transition-colors"
          >
            {isCreatingAccount ? 'Створення...' : '+ Додати рахунок'}
          </button>
        </form>
      </div>

      {/* БЛОК 2: Нова форма переказу коштів між рахунками */}
      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-sm">
        <h3 className="text-lg font-bold mb-4 text-indigo-400">Переказ між рахунками</h3>
        
        <form onSubmit={handleTransfer} className="space-y-4">
          <div>
            <label className="text-xs text-slate-400">З якого рахунку (Джерело)</label>
            <select
              value={fromAccount}
              onChange={(e) => setFromAccount(e.target.value)}
              className="mt-1 w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              required
            >
              <option value="">-- Оберіть рахунок --</option>
              {accounts.map(acc => (
                <option key={acc.id} value={acc.id}>{acc.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-400">На який рахунок (Отримувач)</label>
            <select
              value={toAccount}
              onChange={(e) => setToAccount(e.target.value)}
              className="mt-1 w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              required
            >
              <option value="">-- Оберіть рахунок --</option>
              {accounts.map(acc => (
                <option key={acc.id} value={acc.id}>{acc.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-400">Сума переказу</label>
            <input
              type="number"
              required
              placeholder="0.00"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              className="mt-1 w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={isTransferring || accounts.length < 2}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 disabled:text-slate-500 text-sm font-medium py-2 rounded-xl transition-colors"
          >
            {isTransferring ? 'Обробка переказу...' : 'Переказати кошти'}
          </button>
          
          {accounts.length < 2 && (
            <p className="text-[11px] text-amber-400 text-center mt-1">
              Для переказу потрібно мати мінімум 2 рахунки.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
