import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';
import { cn } from '@/lib/utils';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Gerenciador de Tarefas',
  description: 'Organize suas tarefas de forma simples e eficiente',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="pt-BR" className={cn(geist.variable, 'font-sans antialiased')}>
      <body>
        <Toaster
          position="top-center"
          richColors
          toastOptions={{
            style: {
              background: 'oklch(1 0 0)',
              border: '1px solid oklch(0.9 0.01 90)',
            },
          }}
        />
        <div className="min-h-screen bg-background">{children}</div>
      </body>
    </html>
  );
}
