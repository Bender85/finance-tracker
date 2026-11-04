import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const axiosClient = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 1. Перехоплювач запитів (додає токен)
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🌟 2. МАГІЯ ВИКИДАННЯ ПРИ ЕКСПІРАЦІЇ: Перехоплювач відповідей
axiosClient.interceptors.response.use(
  (response) => response, // Якщо все добре — просто повертаємо відповідь
  (error) => {
    // Якщо сервер повернув 401 (токен заекспайрився або злетів)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token'); // Вичищаємо мертвий токен
      
      // Надійний спосіб перенаправлення на сторінку логіну з будь-якої точки додатку
      if (typeof window !== 'undefined' && window.location.pathname !== '/auth') {
        window.location.href = '/auth'; 
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;

