'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  Activity, 
  Calendar, 
  TrendingUp,
  UserPlus,
  Clock
} from "lucide-react";
import dynamicImport from 'next/dynamic';

const BarChart = dynamicImport(() => import('recharts').then((mod) => mod.BarChart), { ssr: false });
const Bar = dynamicImport(() => import('recharts').then((mod) => mod.Bar), { ssr: false });
const XAxis = dynamicImport(() => import('recharts').then((mod) => mod.XAxis), { ssr: false });
const YAxis = dynamicImport(() => import('recharts').then((mod) => mod.YAxis), { ssr: false });
const CartesianGrid = dynamicImport(() => import('recharts').then((mod) => mod.CartesianGrid), { ssr: false });
const Tooltip = dynamicImport(() => import('recharts').then((mod) => mod.Tooltip), { ssr: false });
const ResponsiveContainer = dynamicImport(() => import('recharts').then((mod) => mod.ResponsiveContainer), { ssr: false });

// export const dynamic = "force-dynamic"; // Removed for now to avoid conflict or used in a way that doesn't conflict

const data = [
  { name: 'Thứ 2', patient: 40, revenue: 2400 },
  { name: 'Thứ 3', patient: 30, revenue: 1398 },
  { name: 'Thứ 4', patient: 20, revenue: 9800 },
  { name: 'Thứ 5', patient: 27, revenue: 3908 },
  { name: 'Thứ 6', patient: 18, revenue: 4800 },
  { name: 'Thứ 7', patient: 23, revenue: 3800 },
  { name: 'Chủ nhật', patient: 34, revenue: 4300 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tổng quan hệ thống</h1>
        <p className="text-muted-foreground">Chào mừng bạn trở lại, Bác sĩ.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng bệnh nhân</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-xs text-muted-foreground">+12% so với tháng trước</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lượt khám hôm nay</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">8 bệnh nhân mới vừa đăng ký</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Doanh thu dự kiến</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45.2tr VNĐ</div>
            <p className="text-xs text-muted-foreground">+5% so với hôm qua</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trạng thái phòng khám</CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Hoạt động</div>
            <p className="text-xs text-muted-foreground">3 bác sĩ đang trực</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Lưu lượng bệnh nhân (Tuần này)</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="patient" fill="#008000" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Bệnh nhân chờ khám</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">
                    B{i}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Bệnh nhân 00{i}</p>
                    <p className="text-xs text-muted-foreground">Chờ khám tổng quát</p>
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {i*5}p
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
