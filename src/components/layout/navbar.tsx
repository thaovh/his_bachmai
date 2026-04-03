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
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  Globe,
  MapPin,
  Map,
  Settings2,
  TestTube2,
  Database,
  BookOpen
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
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "../mode-toggle";

interface NavItem {
  name: string;
  href: string;
  icon: any;
  subItems?: NavItem[];
}

const navItems: NavItem[] = [
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
  {
    name: 'Hệ thống',
    href: '/system',
    icon: Settings,
    subItems: [
      {
        name: 'Tài khoản',
        href: '/system/accounts',
        icon: User,
        subItems: [
          { name: 'Tài khoản', href: '/system/accounts/list', icon: User },
          { name: 'Vai trò', href: '/system/accounts/roles', icon: ShieldCheck },
        ]
      },
      {
        name: 'Tổ chức',
        href: '/system/org',
        icon: Hospital,
        subItems: [
          { name: 'Quốc gia', href: '/system/org/countries', icon: Globe },
          { name: 'Tỉnh', href: '/system/org/provinces', icon: MapPin },
          { name: 'Xã', href: '/system/org/wards', icon: Map },
        ]
      },
      {
        name: 'Cấu hình',
        href: '/system/config',
        icon: Settings2,
        subItems: [
          { name: 'Phòng chỉ định - Thực hiện', href: '/system/config/exam-rooms', icon: TestTube2 },
          { name: 'Phòng chỉ định - Lấy mẫu', href: '/system/config/sampling-rooms', icon: TestTube2 },
        ]
      },
      {
        name: 'Danh mục',
        href: '/system/dictionaries',
        icon: Database,
        subItems: [
          { name: 'SNOMED CT', href: '/system/dictionaries/snomed', icon: BookOpen },
        ]
      }
    ]
  }
];

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-primary-deep text-white shadow-sm">
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
              const isItemActive = pathname === item.href || (item.subItems?.some(sub => 
                pathname === sub.href || sub.subItems?.some(s => pathname === s.href)
              ));

              if (item.subItems) {
                return (
                  <DropdownMenu key={item.name}>
                    <DropdownMenuTrigger
                      className={cn(
                        "px-4 py-2 h-9 text-sm font-medium rounded-md transition-colors hover:bg-primary-muted hover:text-white flex items-center gap-1 outline-none",
                        isItemActive ? "bg-primary-muted text-white" : "text-white/70"
                      )}
                    >
                      {item.name}
                      <ChevronDown className="h-3 w-3 opacity-80" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-64">
                      {item.subItems.map((sub) => {
                        if (sub.subItems) {
                          return (
                            <DropdownMenuSub key={sub.name}>
                              <DropdownMenuSubTrigger className="gap-2">
                                <sub.icon className="h-4 w-4" />
                                <span>{sub.name}</span>
                              </DropdownMenuSubTrigger>
                              <DropdownMenuSubContent className="w-64">
                                {sub.subItems.map((s) => (
                                  <DropdownMenuItem key={s.href} className="p-0">
                                    <Link href={s.href} className="flex w-full items-center gap-2 px-2 py-1.5 cursor-pointer">
                                      <s.icon className="h-4 w-4" />
                                      <span>{s.name}</span>
                                    </Link>
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuSubContent>
                            </DropdownMenuSub>
                          );
                        }
                        return (
                          <DropdownMenuItem key={sub.href} className="p-0">
                            <Link href={sub.href} className="flex w-full items-center gap-2 px-2 py-1.5 cursor-pointer">
                              <sub.icon className="h-4 w-4" />
                              <span>{sub.name}</span>
                            </Link>
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }

              return (
                <Link key={item.href} href={item.href} className="h-9">
                  <span className={cn(
                    "px-4 py-2 block text-sm font-medium rounded-md transition-colors hover:bg-primary-muted hover:text-white",
                    isItemActive ? "bg-primary-muted text-white" : "text-white/70"
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
              className="relative h-8 w-8 rounded-full bg-primary-muted hover:bg-primary border border-primary/20 flex items-center justify-center outline-none overflow-hidden"
            >
              <User className="h-5 w-5 text-white/80" />
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
        <div className="md:hidden border-t border-primary/20 bg-primary-deep p-4 space-y-2 animate-in fade-in slide-in-from-top-4 overflow-y-auto max-h-[calc(100vh-4rem)]">
          {navItems.map((item) => (
            <React.Fragment key={item.name}>
              {item.subItems ? (
                <div className="space-y-1">
                  <div className="px-4 py-2 text-base font-semibold text-white flex items-center gap-2">
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </div>
                  <div className="pl-6 space-y-1 border-l border-primary/20 ml-4">
                    {item.subItems.map((sub) => (
                      <React.Fragment key={sub.name}>
                        {sub.subItems ? (
                          <div className="space-y-1">
                            <div className="px-4 py-2 text-sm font-semibold text-white/90 flex items-center gap-2">
                              <sub.icon className="h-4 w-4" />
                              {sub.name}
                            </div>
                            <div className="pl-6 space-y-1 border-l border-primary/20 ml-2">
                              {sub.subItems.map((s) => (
                                <Link key={s.href} href={s.href} onClick={() => setIsMobileMenuOpen(false)}>
                                  <span className={cn(
                                    "block px-4 py-2 text-sm font-medium rounded-md",
                                    pathname === s.href ? "bg-primary-muted text-white" : "text-white/70 hover:bg-primary-muted"
                                  )}>
                                    {s.name}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <Link href={sub.href} onClick={() => setIsMobileMenuOpen(false)}>
                            <span className={cn(
                              "block px-4 py-2 text-sm font-medium rounded-md",
                              pathname === sub.href ? "bg-slate-800 text-white" : "text-slate-400 hover:bg-slate-800"
                            )}>
                              {sub.name}
                            </span>
                          </Link>
                        )}
                      </React.Fragment>
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
            <span className="block px-4 py-2 text-base font-medium text-white/70 hover:bg-primary-muted">
              Cài đặt
            </span>
          </Link>
        </div>
      )}
    </header>
  );
}
