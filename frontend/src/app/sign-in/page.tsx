"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "../utils/auth";
import { isValidEmail } from "../utils/credentials";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ReloadIcon } from "@radix-ui/react-icons";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      setLoading(false);
      router.push("/dashboard");
    } catch (err) {
      setLoading(false);
      console.log("Something went wrong while signing in.");
    }
  };

  return (
    <div className="flex w-full h-screen lg:grid lg:grid-cols-2 lg:min-h-[600px] xl:min-h-[800px]">
      <div className="flex w-full items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="justify-center grid">
            <Image
              src="/spothub.svg"
              alt="icon"
              width="70"
              height="70"
              priority
            />
          </div>
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign In</h1>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                maxLength={254}
                placeholder="user@example.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                maxLength={254}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden lg:block bg-muted contrast-125 brightness-50">
        <Image
          src="/backgroundimage.jpg"
          alt="Image"
          width="2000"
          height="2000"
          className="h-full w-full object-cover"
          priority
        />
      </div>
    </div>
  );
}
