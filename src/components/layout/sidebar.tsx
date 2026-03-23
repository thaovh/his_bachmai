'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  Pill,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Hospital
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const sidebarItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard, roles: ['admin', 'doctor', 'reception', 'pharmacy'] },
  { name: 'Tiếp đón', href: '/reception', icon: Users, roles: ['admin', 'reception'] },
  { name: 'Phòng khám', href: '/doctor', icon: Stethoscope, roles: ['admin', 'doctor'] },
  { name: 'Kho Dược', href: '/pharmacy', icon: Pill, roles: ['admin', 'pharmacy'] },
  { name: 'Cài đặt', href: '/settings', icon: Settings, roles: ['admin'] },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <aside className={cn(
      "relative flex flex-col border-r border-primary/20 bg-primary-deep text-white transition-all duration-300 ease-in-out",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="flex h-16 items-center px-4">
        <Hospital className="h-8 w-8 text-primary-soft" />
        {!isCollapsed && <span className="ml-3 text-xl font-bold tracking-tight text-white">HIS Bạch Mai</span>}
      </div>

      <Separator className="bg-primary/20" />

      <ScrollArea className="flex-1 px-2 py-4">
        <nav className="flex flex-col gap-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link key={item.href} href={item.href}>
                <span className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-primary-muted hover:text-white",
                  isActive ? "bg-primary-muted text-white" : "text-white/60",
                  isCollapsed && "justify-center"
                )}>
                  <Icon className="h-5 w-5 shrink-0" />
                  {!isCollapsed && <span>{item.name}</span>}
                </span>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      <div className="p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 px-3 text-white/60 hover:bg-primary-muted hover:text-white"
          onClick={() => console.log('logout')}
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && <span>Đăng xuất</span>}
        </Button>
      </div>

      <Button
        variant="secondary"
        size="icon"
        className="absolute -right-3 top-20 h-6 w-6 rounded-full border shadow-md"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </Button>
    </aside>
  );
}
