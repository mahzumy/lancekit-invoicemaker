"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/invoiceMaker/ui/button";
import { Input } from "../invoiceMaker/ui/input";
import { useState } from "react";

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
    <main className="flex h-screen items-center justify-center">
      <div className="flex w-[300px] flex-col gap-3">
        <Input
          type="email"
          placeholder="enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleCredentialsLogin}>Login</Button>
        <Button onClick={handleGoogleLogin} variant="default">
          Continue with Google
        </Button>
      </div>
    </main>
  );
};
