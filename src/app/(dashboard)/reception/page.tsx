'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const patientSchema = z.object({
  name: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  dateOfBirth: z.string().min(1, "Vui lòng chọn ngày sinh"),
  gender: z.string().min(1, "Vui lòng chọn giới tính"),
  phone: z.string().min(10, "Số điện thoại không hợp lệ"),
  address: z.string().min(5, "Địa chỉ quá ngắn"),
  idCardNumber: z.string().min(9, "Số CMND/CCCD không hợp lệ"),
  insuranceNumber: z.string().optional(),
});

type PatientFormValues = z.infer<typeof patientSchema>;

export default function ReceptionPage() {
  const form = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      idCardNumber: "",
      insuranceNumber: "",
    },
  });

  function onSubmit(values: PatientFormValues) {
    console.log(values);
    alert("Đã đăng ký bệnh nhân mới thành công!");
    form.reset();
  }

  return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tiếp đón bệnh nhân</h1>
          <p className="text-muted-foreground">Đăng ký thông tin bệnh nhân mới vào hệ thống.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Thông tin hành chính</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }: { field: any }) => (
                      <FormItem>
                        <FormLabel>Họ và tên</FormLabel>
                        <FormControl>
                          <Input placeholder="Nguyễn Văn A" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }: { field: any }) => (
                      <FormItem>
                        <FormLabel>Số điện thoại</FormLabel>
                        <FormControl>
                          <Input placeholder="090xxxxxxx" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }: { field: any }) => (
                      <FormItem>
                        <FormLabel>Ngày sinh</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }: { field: any }) => (
                      <FormItem>
                        <FormLabel>Giới tính</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn giới tính" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Nam</SelectItem>
                            <SelectItem value="female">Nữ</SelectItem>
                            <SelectItem value="other">Khác</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="idCardNumber"
                    render={({ field }: { field: any }) => (
                      <FormItem>
                        <FormLabel>Số CMND/CCCD</FormLabel>
                        <FormControl>
                          <Input placeholder="001xxxxxxxx" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="insuranceNumber"
                    render={({ field }: { field: any }) => (
                      <FormItem>
                        <FormLabel>Mã số BHYT (Nếu có)</FormLabel>
                        <FormControl>
                          <Input placeholder="HS4xxxxxxxx" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>Địa chỉ thường trú</FormLabel>
                      <FormControl>
                        <Input placeholder="Số nhà, đường, phường/xã..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end gap-4">
                  <Button type="button" variant="outline" onClick={() => form.reset()}>Hủy</Button>
                  <Button type="submit">Lưu hồ sơ</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
  );
}
