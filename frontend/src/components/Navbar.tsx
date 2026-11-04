'use client';

import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    // 1. Стираємо JWT-токен розробника з пам'яті браузера
    localStorage.removeItem('token');
    
    // 2. Рекреативно перенаправляємо на сторінку авторизації
    router.push('/auth');
  };

  return (
    <nav className="w-full bg-slate-900/60 backdrop-blur-md border-b border-slate-800/80 px-4 md:px-8 py-3 flex items-center justify-between sticky top-0 z-50">
      {/* Логотип та Назва */}
      <div className="flex items-center gap-2">
        <div className="bg-indigo-500/10 text-indigo-400 p-2 rounded-xl border border-indigo-500/20 font-black text-sm tracking-wider animate-pulse">
          🤖 AI
        </div>
        <div>
          <h1 className="text-sm font-extrabold text-slate-100 tracking-tight">FinTech Concierge</h1>
          <p className="text-[10px] text-indigo-400 font-medium">Wealth Advisor v16</p>
        </div>
      </div>

      {/* Права частина: Профіль та Вихід */}
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex flex-col text-right">
          <span className="text-xs font-semibold text-slate-300">Користувач</span>
          <span className="text-[10px] text-emerald-400 font-bold">Premium Active</span>
        </div>

        {/* КНОПКА ВИХОДУ */}
        <button
          onClick={handleLogout}
          className="bg-slate-800 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 border border-slate-700/60 hover:border-rose-500/30 text-xs font-bold px-3 py-1.5 rounded-xl transition-all duration-300 active:scale-95 flex items-center gap-1.5 shadow-sm"
          title="Вийти з фінансового кабінету"
        >
          <span>Вийти</span>
          <span className="text-[11px]">🚪</span>
        </button>
      </div>
    </nav>
  );
}
