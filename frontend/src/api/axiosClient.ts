import axios from 'axios';

// Вказуємо базовий URL нашого бекенду FastAPI в Docker
const API_URL = 'http://localhost:8000/api/v1';

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Перехоплювач запитів (Request Interceptor): 
// Автоматично додає JWT-токен у заголовок Authorization для кожного запиту
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('finance_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Перехоплювач відповідей (Response Interceptor):
// Якщо бекенд повертає 401 Unauthorized (наприклад, токен застарів),
// ми автоматично розлогінюємо користувача
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('finance_token');
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
