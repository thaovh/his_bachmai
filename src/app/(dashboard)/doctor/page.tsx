'use client';

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Stethoscope, Eye, FileText, ClipboardList } from "lucide-react";
import { Patient } from "@/lib/types";

const mockPatients: Patient[] = [
  { id: "1", name: "Trần Thị B", phone: "0912345678", gender: "female", dateOfBirth: "1985-05-20", address: "Hàn Nội", idCardNumber: "123456789", createdAt: "2024-03-23" },
  { id: "2", name: "Lê Văn C", phone: "0987654321", gender: "male", dateOfBirth: "1992-10-15", address: "TP.HCM", idCardNumber: "987654321", createdAt: "2024-03-23" },
  { id: "3", name: "Phạm Văn D", phone: "0905556667", gender: "male", dateOfBirth: "1978-02-10", address: "Đà Nẵng", idCardNumber: "456123789", createdAt: "2024-03-23" },
];

export default function DoctorConsolePage() {
  const columns: ColumnDef<Patient>[] = [
    {
      accessorKey: "id",
      header: "Mã BN",
    },
    {
      accessorKey: "name",
      header: "Họ và tên",
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "gender",
      header: "Giới tính",
      cell: ({ row }) => row.getValue("gender") === "male" ? "Nam" : "Nữ",
    },
    {
      accessorKey: "phone",
      header: "Số điện thoại",
    },
    {
      id: "actions",
      header: "Thao tác",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Eye className="h-4 w-4" /> Xem
          </Button>
          <Button variant="default" size="sm" className="gap-1">
            <Stethoscope className="h-4 w-4" /> Khám
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: mockPatients,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Phòng khám (Doctor Console)</h1>
            <p className="text-muted-foreground">Quản lý danh sách bệnh nhân chờ khám và bệnh án.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <ClipboardList className="h-4 w-4" /> Lịch hẹn hôm nay
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Danh sách bệnh nhân chờ khám</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableHead key={header.id}>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows.length ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                          Không có bệnh nhân nào đang chờ.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <div className="flex items-center justify-end space-x-2 py-4">
                <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Trước</Button>
                <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Sau</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" /> Hồ sơ vừa khám
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="p-3 rounded-lg border bg-slate-50 dark:bg-slate-900 space-y-1">
                    <p className="font-medium text-sm">Bệnh nhân 00{i+5}</p>
                    <p className="text-xs text-muted-foreground">Chẩn đoán: Viêm họng cấp</p>
                    <p className="text-[10px] text-muted-foreground italic">Khám lúc: 10:15 - 23/03/2026</p>
                  </div>
                ))}
                <Button variant="link" className="w-full text-xs">Xem tất cả lịch sử</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
