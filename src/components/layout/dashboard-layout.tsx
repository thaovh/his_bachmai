import { Navbar } from './navbar';
import { ModeToggle } from '../mode-toggle';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen w-full bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main className="flex-1 overflow-auto px-6 py-8">
        <div className="container mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
