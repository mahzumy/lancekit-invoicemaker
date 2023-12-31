"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/invoiceMaker/ui/button";
import { Input } from "../invoiceMaker/ui/input";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCredentialsLogin = () => {
    signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/dashboard",
    });
  };

  const handleGoogleLogin = () => {
    signIn("google", {
      redirect: true,
      callbackUrl: "/invoice-maker",
    });
  };

  return (
    <main>
      <div className="md:hidden">
        <Image
          src="/asset/freelance-laptop.jpg"
          width={1280}
          height={843}
          alt=""
          className="block dark:hidden"
        />
        <Image
          src="/asset/freelance-laptop.jpg"
          width={1280}
          height={843}
          alt=""
          className="hidden dark:block"
        />
      </div>
      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" style={{ backgroundImage: 'url("/asset/freelance-laptop.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}/>
          <div className="relative z-20 flex items-center text-lg font-medium">
            <img src="/asset/LanceKit Logo-dark.svg" width={120} alt="" />
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;It is essential to have good tools, but it is also essential that the tools should be used in the right way&rdquo;
              </p>
              <footer className="text-sm">Wallace D. Wattles</footer>
            </blockquote>
              </div>
          </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Login with your Google Account below
            </p>
          </div>
            <Button onClick={handleGoogleLogin} variant="default">
            Continue with Google
            </Button>
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
