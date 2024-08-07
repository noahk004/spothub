"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { login } from "../utils/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import withAuth from "../utils/withAuth";

import axios from "axios";

import {
  ReloadIcon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
  Cross1Icon,
  EyeClosedIcon,
  EyeOpenIcon,
} from "@radix-ui/react-icons";

axios.defaults.withCredentials = true;

function customAlert(
  variant: "default" | "destructive" | "success" | null | undefined,
  header: string,
  message: string,
  Icon: React.ForwardRefExoticComponent<any>,
  onClick: () => void
): React.ReactNode {
  return (
    <Alert variant={variant} className="flex p-4 pb-2 justify-between">
      <div className="flex gap-2">
        <Icon className="h-4 w-4" />
        <div className="m-0 p-0 mb-1">
          <AlertTitle>{header}</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </div>
      </div>

      <div>
        <Cross1Icon className="h-4 w-4 cursor-pointer" onClick={onClick} />
      </div>
    </Alert>
  );
}

function Page() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const popup = searchParams.get("popup");

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [invalidCredentialsError, setInvalidCredentialsError] =
    useState<boolean>(false);
  const [registeredPopupVisible, setRegisteredPopupVisible] = useState<boolean>(
    popup === "registered"
  );

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      setLoading(false);
      router.push("/app/featured");
    } catch (err) {
      setLoading(false);
      setInvalidCredentialsError(true);
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
          {invalidCredentialsError &&
            customAlert(
              "destructive",
              "Error",
              "Invalid credentials. Please try again.",
              ExclamationTriangleIcon,
              () => {
                setInvalidCredentialsError(false);
              }
            )}
          {registeredPopupVisible &&
            customAlert(
              "success",
              "Success",
              "Account has been created successfully.",
              InfoCircledIcon,
              () => {
                setRegisteredPopupVisible(false);
              }
            )}
          <div className="grid gap-4">
            <div className="grid">
              <Label htmlFor="email" className="mb-2">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                maxLength={254}
                placeholder="user@example.com"
                className="mb-2"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid">
              <div className="flex items-center">
                <Label htmlFor="password" className="mb-2">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline mb-2"
                >
                  Forgot your password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  maxLength={254}
                  className=""
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 end-0 flex items-center z-20 px-4 cursor-pointer"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full mt-3"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
              Login
            </Button>
          </div>
          <div className="mt-2 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden lg:block bg-muted contrast-125 brightness-50">
        <Image
          src="/anteater-sitting-on-bench.jpg"
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

export default withAuth(Page);
