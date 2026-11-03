import { useAuth } from './hooks/useAuth';
import AuthScreen from './components/AuthScreen';
import AccountSection from './components/AccountSection';
import TransactionSection from './components/TransactionSection';
import AnalyticsSection from './components/AnalyticsSection';

export default function App() {
  const { user, isAuthorized, isLoadingUser, logout } = useAuth();

  if (isLoadingUser) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-900 text-white text-xl">
        Завантаження профілю фінансів...
      </div>
    );
  }

  // Якщо користувач не авторизований — показуємо чистий екран Auth
  if (!isAuthorized) {
    return <AuthScreen />;
  }

  // Якщо авторизований — віддаємо повноцінний дашборд
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans antialiased">
      <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-wider text-indigo-400">FINANCE.TRACKER</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-400 hidden sm:inline">{user?.email}</span>
          <button
            onClick={logout}
            className="bg-slate-700 hover:bg-red-600/20 hover:text-red-400 px-4 py-2 rounded-xl text-sm font-medium transition-all"
          >
            Вийти
          </button>
        </div>
      </nav>

      {/* Головна сітка */}
      <main className="max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ліва колонка: Рахунки + Аналітика */}
        <div className="space-y-6 lg:col-span-1">
          <AccountSection />
          <AnalyticsSection /> {/* 2. Додаємо сюди наш новий графік */}
        </div>
        
        {/* Права колонка: Форма витрат + Історія (займає 2 стовпці) */}
        <TransactionSection />
      </main>
    </div>
  );
}
