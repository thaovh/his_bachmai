'use client';

import { CreditCard, History, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BillingPage() {
  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Quản lý Viện phí</h1>
            <p className="text-muted-foreground">Thanh toán, tạm ứng và quyết toán viện phí.</p>
          </div>
          <Button className="gap-2">
            <History className="h-4 w-4" /> Lịch sử thanh toán
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" /> Chờ thanh toán hôm nay
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg bg-slate-50 dark:bg-slate-900">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Bệnh nhân Nguyễn Văn {i}</p>
                        <p className="text-xs text-muted-foreground">Mã BN: BN00{i*12}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{(i*1500000).toLocaleString()} đ</p>
                      <Button variant="link" size="sm" className="h-auto p-0 text-primary">Thanh toán</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  );
}
