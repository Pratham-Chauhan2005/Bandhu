import type { Metadata } from 'next';
import './globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppContainer from '@/components/layout/AppContainer';
import { Toaster } from '@/components/ui/toaster';
import { Literata, Source_Code_Pro } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import { cn } from '@/lib/utils';

const literata = Literata({
  subsets: ['latin'],
  variable: '--font-literata',
});

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-source-code-pro',
});

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
    <html lang="en" suppressHydrationWarning className={cn(literata.variable, sourceCodePro.variable)}>
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased"
        )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
        >
          <SidebarProvider>
            <AppContainer>
              {children}
            </AppContainer>
          </SidebarProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
