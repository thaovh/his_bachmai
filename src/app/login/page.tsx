'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="relative flex min-h-screen items-center justify-center p-4">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/login-bg.webp"
          alt="HIS Bạch Mai Background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" />
      </div>

      <Card className="relative z-10 w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-2 flex flex-col items-center">
          <div className="mb-4">
            <img
              src="/logo.png"
              alt="HIS Bạch Mai Logo"
              className="h-16 w-16 object-contain"
            />
          </div>
          <CardTitle className="text-3xl font-extrabold tracking-tight">Hệ thống HIS Bạch Mai</CardTitle>
          <CardDescription className="text-base">
            Đăng nhập để vào hệ thống quản lý bệnh viện
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-base font-semibold">Tên đăng nhập</Label>
              <Input
                id="username"
                placeholder="admin"
                className="h-12 text-base"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-base font-semibold">Mật khẩu</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-12 text-base pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
            <Button type="submit" className="w-full h-12 text-lg font-semibold shadow-md transition-all hover:shadow-lg active:scale-[0.98]">
              Đăng nhập
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Copyright © 2026 Bach Mai Hospital. All rights reserved.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
