'use client';

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { BedDouble } from "lucide-react";

export default function InpatientPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quản lý Buồng bệnh</h1>
          <p className="text-muted-foreground">Theo dõi danh sách bệnh nhân nội trú và phân phòng.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((room) => (
            <div key={room} className="p-6 border rounded-xl bg-card hover:shadow-md transition-shadow flex items-start gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <BedDouble className="h-6 w-6" />
              </div>
              <div>
                <p className="font-bold text-lg">Phòng {100 + room}</p>
                <p className="text-sm text-muted-foreground">Sức chứa: 4 giường</p>
                <p className="text-sm font-medium text-green-600 mt-2">Còn trống: 2 giường</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
