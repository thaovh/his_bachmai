'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    // ... (rest of handleLogin)
    e.preventDefault();
    setError("");

    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Sai tên đăng nhập hoặc mật khẩu (Sử dụng admin/admin)");
      } else {
        router.push("/");
        router.refresh(); // Tải lại để Middleware nhận diện session mới
      }
    } catch (err) {
      setError("Đã có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="mb-4">
            <img
              src="/logo.png"
              alt="HIS Bạch Mai Logo"
              className="h-16 w-16 object-contain"
            />
          </div>
          <CardTitle className="text-2xl font-bold">Hệ thống HIS Bạch Mai</CardTitle>
          <CardDescription>
            Đăng nhập để vào hệ thống quản lý bệnh viện
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Tên đăng nhập</Label>
              <Input
                id="username"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
            <Button type="submit" className="w-full">
              Đăng nhập
            </Button>
          </form>
          <div className="mt-4 text-center text-xs text-muted-foreground">
            Sử dụng tài khoản <span className="font-mono bg-slate-100 px-1">admin</span> / <span className="font-mono bg-slate-100 px-1">admin</span> để thử nghiệm.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
