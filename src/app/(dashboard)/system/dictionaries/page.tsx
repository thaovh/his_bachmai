'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Database, 
  BookOpen, 
  ChevronRight,
  Settings2,
  Table
} from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const dictionaryItems = [
  {
    name: "SNOMED CT",
    description: "Hệ thống thuật ngữ y tế chuẩn hóa quốc tế.",
    href: "/system/dictionaries/snomed",
    icon: BookOpen,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    name: "ICD-10",
    description: "Phân loại quốc tế về bệnh tật và các vấn đề sức khỏe có liên quan.",
    href: "#",
    status: "Sắp ra mắt",
    icon: Table,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    name: "LOINC",
    description: "Cơ sở dữ liệu các mã xét nghiệm và chẩn đoán lâm sàng.",
    href: "#",
    status: "Sắp ra mắt",
    icon: Settings2,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
];

export default function DictionariesPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-soft">
          Danh mục định nghĩa
        </h1>
        <p className="text-muted-foreground mt-1 text-lg">
          Quản lý các hệ thống mã hóa và thuật ngữ chuẩn hóa.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
        {dictionaryItems.map((item) => (
          <Link key={item.name} href={item.href} className="group">
            <Card className="h-full border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg cursor-pointer relative overflow-hidden group-hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className={`p-2 rounded-lg ${item.bg} ${item.color} transition-colors`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{item.name}</CardTitle>
                  {item.status && (
                    <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-100 text-slate-500 tracking-wider">
                      {item.status}
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                  Truy cập ngay <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </CardContent>
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <item.icon className="h-24 w-24" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
