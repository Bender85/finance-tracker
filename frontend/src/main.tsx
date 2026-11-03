import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.tsx'
import './index.css'

// 1. Створюємо глобальний клієнт для кешування TanStack Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // вимикаємо рефетч при перемиканні вкладок
      retry: 1,
    },
  },
})

// 2. Рендеримо додаток, ОБОВ'ЯЗКОВО обгортаючи його в провайдер
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)
