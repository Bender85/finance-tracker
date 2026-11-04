'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar'; // <-- НАШ НОВИЙ ІМПОРТ
import AccountSection from '../components/AccountSection';
import AnalyticsSection from '../components/AnalyticsSection';
import TransactionSection from '../components/TransactionSection';

export default function DashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 text-sm italic">
        Перевірка фінансової сесії...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* ВСТАВЛЯЄМО ВЕРХНЮ ПАНЕЛЬ КЕРУВАННЯ СЕСІЄЮ */}
      <Navbar />

      {/* ОСНОВНИЙ КОНТЕНТ ДАШБОРДУ */}
      <div className="p-4 md:p-8 flex-1">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Ліва колонка: Рахунки та Аналітика */}
          <div className="space-y-6 col-span-1">
            <AccountSection />
            <AnalyticsSection />
          </div>
          
          {/* Права колонка: Історія транзакцій та Фільтри */}
          <div className="col-span-1 lg:col-span-2">
            <TransactionSection />
          </div>

        </div>
      </div>
    </div>
  );
}

