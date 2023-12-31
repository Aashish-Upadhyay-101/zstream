import Link from "next/link";
import React from "react";
import { SignInForm } from "zstream/ui/components";

const SignIn = () => {
  return (
    <div className="mt-16 flex flex-col items-center">
      <h1 className="text-4xl font-semibold">Sign in to your account</h1>

      <p className="mt-2 text-sm text-muted-foreground/60">
        Welcome back, we are lucky to have you.
      </p>

      <SignInForm className="mt-4 w-96" />

      <p className="mt-6 text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link
          href="/auth/signup"
          className="text-primary duration-200 hover:opacity-70"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
