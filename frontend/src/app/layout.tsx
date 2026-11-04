'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import '../index.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Залізобетонний синглтон для Next.js 16 та React 19
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 хвилина
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <html lang="uk">
      <body className="bg-slate-950 text-slate-100 min-h-screen antialiased">
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}


