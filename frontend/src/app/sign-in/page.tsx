import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Page() {

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
                placeholder="user@example.com"
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
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
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
