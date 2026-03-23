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
  Hospital,
  Menu,
  X,
  User,
  BedDouble,
  CreditCard,
  UserPlus,
  ClipboardList,
  FileText,
  ArrowRightLeft,
  ChevronDown
} from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "../mode-toggle";

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  {
    name: 'Tiếp đón',
    href: '/reception',
    icon: Users,
    subItems: [
      { name: 'Tiếp đón', href: '/reception', icon: UserPlus },
      { name: 'Danh sách y lệnh', href: '/reception/orders', icon: ClipboardList },
      { name: 'Hồ sơ điều trị', href: '/reception/records', icon: FileText },
      { name: 'Bệnh nhân', href: '/reception/patients', icon: Users },
      { name: 'Tiếp nhận chuyển khoa', href: '/reception/transfer', icon: ArrowRightLeft },
    ]
  },
  { name: 'Phòng khám', href: '/doctor', icon: Stethoscope },
  { name: 'Buồng bệnh', href: '/inpatient', icon: BedDouble },
  { name: 'Viện phí', href: '/billing', icon: CreditCard },
  { name: 'Kho', href: '/pharmacy', icon: Pill },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-slate-900 text-slate-50 shadow-sm">
      <div className="container mx-auto flex h-16 items-center px-4 gap-8">
        {/* Left Side: Logo + Nav */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="HIS Bạch Mai Logo"
              className="h-8 w-8 object-contain"
            />
            <span className="text-xl font-bold tracking-tight hidden md:block">HIS Bạch Mai</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.subItems?.some(sub => pathname === sub.href));

              if (item.subItems) {
                return (
                  <DropdownMenu key={item.name}>
                    <DropdownMenuTrigger
                      className={cn(
                        "px-4 py-2 h-9 text-sm font-medium rounded-md transition-colors hover:bg-slate-800 hover:text-white flex items-center gap-1 outline-none",
                        isActive ? "bg-slate-800 text-white" : "text-slate-400"
                      )}
                    >
                      {item.name}
                      <ChevronDown className="h-3 w-3 opacity-50" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                      {item.subItems.map((sub) => (
                        <DropdownMenuItem key={sub.href} className="p-0">
                          <Link href={sub.href} className="flex w-full items-center gap-2 px-2 py-1.5 cursor-pointer">
                            <sub.icon className="h-4 w-4" />
                            <span>{sub.name}</span>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }

              return (
                <Link key={item.href} href={item.href} className="h-9">
                  <span className={cn(
                    "px-4 py-2 block text-sm font-medium rounded-md transition-colors hover:bg-slate-800 hover:text-white",
                    isActive ? "bg-slate-800 text-white" : "text-slate-400"
                  )}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Side: Actions (Avatar, Mobile Menu) */}
        <div className="flex items-center gap-2 ml-auto">
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger
              className="relative h-8 w-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center outline-none overflow-hidden"
            >
              <User className="h-5 w-5 text-slate-400" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Quản trị viên</p>
                  <p className="text-xs leading-none text-muted-foreground">admin@hospital.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => window.location.href = '/settings'}>
                <Settings className="h-4 w-4 mr-2" />
                <span>Cài đặt hệ thống</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500 focus:text-red-500" onClick={() => console.log('logout')}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Đăng xuất</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900 p-4 space-y-2 animate-in fade-in slide-in-from-top-4 overflow-y-auto max-h-[calc(100vh-4rem)]">
          {navItems.map((item) => (
            <React.Fragment key={item.name}>
              {item.subItems ? (
                <div className="space-y-1">
                  <div className="px-4 py-2 text-base font-semibold text-slate-200 flex items-center gap-2">
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </div>
                  <div className="pl-6 space-y-1 border-l border-slate-800 ml-4">
                    {item.subItems.map((sub) => (
                      <Link key={sub.href} href={sub.href} onClick={() => setIsMobileMenuOpen(false)}>
                        <span className={cn(
                          "block px-4 py-2 text-sm font-medium rounded-md",
                          pathname === sub.href ? "bg-slate-800 text-white" : "text-slate-400 hover:bg-slate-800"
                        )}>
                          {sub.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                  <span className={cn(
                    "block px-4 py-2 text-base font-medium rounded-md",
                    pathname === item.href ? "bg-slate-800 text-white" : "text-slate-400 hover:bg-slate-800"
                  )}>
                    {item.name}
                  </span>
                </Link>
              )}
            </React.Fragment>
          ))}
          <Separator className="bg-slate-800" />
          <Link href="/settings" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="block px-4 py-2 text-base font-medium text-slate-400 hover:bg-slate-800">
              Cài đặt
            </span>
          </Link>
        </div>
      )}
    </header>
  );
}
