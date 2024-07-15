"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import {
  CredentialError,
  checkEmail,
  checkOnlyLettersNumbers,
  checkLength,
  checkAlphanumeric,
  checkHasSpecial,
} from "../utils/credentials";
import { register } from "../utils/auth";

import {
  ReloadIcon,
  ExclamationTriangleIcon,
  Cross1Icon,
} from "@radix-ui/react-icons";

export default function Page() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const [emailIsValid, setEmailIsValid] = useState(true);
  const [usernameIsValid, setUsernameIsValid] = useState(true);
  const [passwordMeetsLength, setPasswordMeetsLength] = useState(true);
  const [passwordIsAlphanumeric, setPasswordIsAlphanumeric] = useState(true);
  const [passwordHasSpecial, setPasswordHasSpecial] = useState(true);

  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setLoading(true);

    setEmailIsValid(checkEmail(email));
    setUsernameIsValid(checkOnlyLettersNumbers(username));
    setPasswordMeetsLength(checkLength(password));
    setPasswordIsAlphanumeric(checkAlphanumeric(password));
    setPasswordHasSpecial(checkHasSpecial(password));

    try {
      if (
        !(
          emailIsValid &&
          usernameIsValid &&
          passwordMeetsLength &&
          passwordIsAlphanumeric &&
          passwordHasSpecial
        )
      ) {
        throw new CredentialError("Invalid credentials.");
      }
      await register(email, username, password);
      setLoading(false);
      router.push("/sign-in");
    } catch (err) {
      setLoading(false);
      if (!(err instanceof CredentialError)) {
        setErrorMessage(true);
      }
      console.log("Something went wrong while creating an account.");
    }
  };

  return (
    <div className="h-screen flex items-center">
      <Card className="h-screen mx-auto max-w-sm h-fit">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your credentials to create a new account.
          </CardDescription>
          {errorMessage && (
            <Alert
              variant="destructive"
              className="flex p-4 pb-2 justify-between"
            >
              <div className="flex gap-2">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <div className="m-0 p-0">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    Something went wrong.
                  </AlertDescription>
                </div>
              </div>

              <div>
                <Cross1Icon
                  className="h-4 w-4 cursor-pointer"
                  onClick={() => {
                    setErrorMessage(false);
                  }}
                />
              </div>
            </Alert>
          )}
        </CardHeader>

        <CardContent className="">
          <div className="grid gap-4">
            <div className="grid">
              <Label htmlFor="email" className="mb-2">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                maxLength={254}
                className={(emailIsValid ? "" : "border-red-500 ") + "mb-2"}
                placeholder="user@example.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {!emailIsValid && (
                <div className="text-xs text-red-500">
                  Please enter a valid email.
                </div>
              )}
            </div>
            <div className="grid mb-2">
              <Label htmlFor="username" className="mb-2">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                maxLength={254}
                className={(usernameIsValid ? "" : "border-red-500 ") + "mb-2"}
                placeholder="JDoe"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              {!usernameIsValid && (
                <div className="text-xs text-red-500">
                  Username can only contain letters and numbers.
                </div>
              )}
            </div>
            <div className="grid mb-2">
              <Label htmlFor="password" className="mb-2">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                maxLength={254}
                className={
                  (passwordMeetsLength &&
                  passwordIsAlphanumeric &&
                  passwordHasSpecial
                    ? ""
                    : "border-red-500 ") + "mb-2"
                }
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div>
                {!passwordMeetsLength && (
                  <div className="text-xs text-red-500">
                    Password must be at least 8 characters long.
                  </div>
                )}
                {!passwordIsAlphanumeric && (
                  <div className="text-xs text-red-500">
                    Password must contain both letters and numbers.
                  </div>
                )}
                {!passwordHasSpecial && (
                  <div className="text-xs text-red-500">
                    Password must contain at least one special character.
                  </div>
                )}
              </div>
            </div>
            <Button
              type="submit"
              onClick={handleSubmit}
              className="w-full"
              disabled={loading}
            >
              {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
              Create an account
            </Button>
          </div>
          <div className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link href="/sign-in" className="underline">
              Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
