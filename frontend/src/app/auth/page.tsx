'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // 🌟 НАШ НОВИЙ СТЕЙТ ДЛЯ ДИНАМІЧНИХ ПОМИЛОК БЕКЕНДУ
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null); // Скидаємо стару помилку при новій спробі
    
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';
    const url = isLogin ? `${baseUrl}/auth/login` : `${baseUrl}/auth/register`;
    
    try {
      let payload: any;
      let headers: any = {};

      if (isLogin) {
        payload = new URLSearchParams();
        payload.append('username', email);
        payload.append('password', password);
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
      } else {
        payload = { email, password };
      }

      const response = await axios.post(url, payload, { headers });
      const token = response.data.access_token || response.data.token;
      
      if (token) {
        localStorage.setItem('token', token);
        router.push('/');
      }
    } catch (err: any) {
      console.error("Помилка автентифікації:", err);
      
      // 🌟 ДИНАМІЧНО ВИЦІПЛЮЄМО ТОЧНИЙ ТЕКСТ ПОМИЛКИ З FASTAPI RESPONSE
      const serverMessage = err.response?.data?.detail;
      
      if (serverMessage) {
        setErrorMessage(serverMessage);
      } else {
        setErrorMessage(isLogin ? 'Неправильний email або пароль' : 'Не вдалося зареєструвати акаунт');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl w-full max-w-sm space-y-4">
        <h2 className="text-xl font-bold text-indigo-400 text-center">
          {isLogin ? 'Вхід у кабінет' : 'Реєстрація фінтех-акаунта'}
        </h2>

        {/* 🚨 СТИЛЬНИЙ ЧЕРВОНИЙ НЕОНОВИЙ БЛОК ПОМИЛКИ */}
        {errorMessage && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs p-3 rounded-xl text-center font-medium animate-headShake">
            ⚠️ {errorMessage}
          </div>
        )}
        
        <input 
          type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white text-sm focus:border-indigo-500"
        />
        <input 
          type="password" placeholder="Пароль" required value={password} onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white text-sm focus:border-indigo-500"
        />

        <button type="submit" className="w-full bg-indigo-500 text-white rounded-xl py-2 text-sm font-bold shadow-lg shadow-indigo-500/20">
          {isLogin ? 'Увійти' : 'Зареєструватися'}
        </button>

        <p 
          onClick={() => {
            setIsLogin(!isLogin);
            setErrorMessage(null); // Скидаємо помилку при перемиканні режимів
          }} 
          className="text-center text-xs text-slate-400 cursor-pointer hover:text-indigo-300"
        >
          {isLogin ? 'Немає акаунту? Створити' : 'Вже є акаунт? Увійти'}
        </p>
      </form>
    </div>
  );
}

