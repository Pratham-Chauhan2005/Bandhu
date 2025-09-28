import type { Metadata } from 'next';
import './globals.css';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/AppSidebar';
import AppHeader from '@/components/layout/AppHeader';
import SosButton from '@/components/layout/SosButton';
import { Toaster } from '@/components/ui/toaster';
import BottomNavBar from '@/components/layout/BottomNavBar';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Bandhu Local',
  description: 'Connect with local guides and experiences.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${inter.variable} bg-white`}>
        <SidebarProvider>
          <div className="relative flex min-h-screen flex-col">
            <AppHeader />
            <div className="flex-1">
              <main className="container mx-auto p-4 md:p-6 lg:p-8 pb-24">
                {children}
              </main>
            </div>
            <SosButton />
            <BottomNavBar />
          </div>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
