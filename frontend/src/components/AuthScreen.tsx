'use client'

import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function AuthScreen() {
  const { 
    login, isLoggingIn, loginError,
    register, isRegistering, registerError, isRegisterSuccess
  } = useAuth();

  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    if (isLoginView) {
      login({ email, password });
    } else {
      register({ email, password });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-700">
        <h2 className="text-center text-3xl font-extrabold text-white">
          {isLoginView ? 'Вхід у Трекер Фінансів' : 'Реєстрація профілю'}
        </h2>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="text-slate-400 text-sm font-medium">Email адреса</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-xl bg-slate-700 border border-slate-600 px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                placeholder="name@example.com"
              />
            </div>
            <div>
              <label className="text-slate-400 text-sm font-medium">Пароль</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-xl bg-slate-700 border border-slate-600 px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          {loginError && <p className="text-red-400 text-sm">Неправильні дані для входу.</p>}
          {registerError && <p className="text-red-400 text-sm">Помилка реєстрації. Email може бути зайнятий.</p>}
          {isRegisterSuccess && <p className="text-green-400 text-sm">Успіх! Тепер увійдіть у профіль.</p>}

          <button
            type="submit"
            disabled={isLoggingIn || isRegistering}
            className="w-full justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
          >
            {isLoggingIn || isRegistering ? 'Обробка...' : isLoginView ? 'Увійти' : 'Зареєструватися'}
          </button>
        </form>

        <div className="text-center">
          <button
            onClick={() => setIsLoginView(!isLoginView)}
            className="text-indigo-400 hover:text-indigo-300 text-sm transition-colors"
          >
            {isLoginView ? 'Немає акаунту? Зареєструватися' : 'Вже є акаунт? Увійти'}
          </button>
        </div>
      </div>
    </div>
  );
}
