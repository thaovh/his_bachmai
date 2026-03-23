'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Pill, AlertTriangle, Package, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const inventory = [
  { id: "M01", name: "Paracetamol 500mg", category: "Giảm đau", stock: 1200, unit: "Viên", expiry: "2027-12-01", status: "normal" },
  { id: "M02", name: "Amoxicillin 250mg", category: "Kháng sinh", stock: 45, unit: "Lọ", expiry: "2025-06-15", status: "low" },
  { id: "M03", name: "Vitamin C 1000mg", category: "Bổ sung", stock: 0, unit: "Hộp", expiry: "2026-01-10", status: "out" },
  { id: "M04", name: "Siro ho Prospan", category: "Hô hấp", stock: 85, unit: "Lọ", expiry: "2026-08-20", status: "normal" },
];

export default function PharmacyPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Quản lý Kho Dược</h1>
            <p className="text-muted-foreground">Theo dõi tồn kho, hạn dùng và nhập thuốc.</p>
          </div>
          <div className="flex gap-2">
            <Button className="gap-2"><Package className="h-4 w-4" /> Nhập kho</Button>
            <Button variant="outline" className="gap-2"><RefreshCcw className="h-4 w-4" /> Kiểm kê</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Tổng danh mục</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-orange-600">Sắp hết hàng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">8</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-red-600">Hết hạn / Hết hàng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">3</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Danh mục thuốc tồn kho</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã</TableHead>
                  <TableHead>Tên thuốc</TableHead>
                  <TableHead>Loại</TableHead>
                  <TableHead>Tồn kho</TableHead>
                  <TableHead>Đơn vị</TableHead>
                  <TableHead>Hạn dùng</TableHead>
                  <TableHead>Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-mono text-xs">{item.id}</TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className={item.status === 'out' ? 'text-red-600 font-bold' : ''}>{item.stock}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell>{item.expiry}</TableCell>
                    <TableCell>
                      {item.status === 'low' && <span className="flex items-center gap-1 text-orange-600 text-xs font-medium"><AlertTriangle className="h-3 w-3" /> Sắp hết</span>}
                      {item.status === 'out' && <span className="flex items-center gap-1 text-red-600 text-xs font-medium"><AlertTriangle className="h-3 w-3" /> Hết hàng</span>}
                      {item.status === 'normal' && <span className="text-green-600 text-xs font-medium">Ổn định</span>}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
