'use client';
import { SidebarInset } from '@/components/ui/sidebar';
import AppHeader from '@/components/layout/AppHeader';
import { AlertDialog } from '@/components/ui/alert-dialog';
import SosButton from '@/components/layout/SosButton';
import BottomNavBar from '@/components/layout/BottomNavBar';
import AppSidebar from '@/components/layout/AppSidebar';

export default function AppContainer({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <AppSidebar />
            <SidebarInset>
              <div className="relative flex min-h-screen flex-col">
                <AppHeader />
                <div className="flex-1">
                  <main className="container mx-auto p-4 md:p-6 lg:p-8 pb-32 overflow-x-hidden">
                    {children}
                  </main>
                </div>
                <AlertDialog>
                  <SosButton />
                </AlertDialog>
                <BottomNavBar />
              </div>
            </SidebarInset>
        </>
    );
}
