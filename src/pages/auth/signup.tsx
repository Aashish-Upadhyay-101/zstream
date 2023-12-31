import Link from "next/link";
import React from "react";
import { SignUpForm } from "zstream/ui/components";

const SignUp = () => {
  return (
    <div className="mt-16 flex flex-col items-center">
      <h1 className="text-4xl font-semibold">Create a new Account</h1>

      <p className="mt-2 text-sm text-muted-foreground/60">
        Welcome back, we are lucky to have you.
      </p>

      <SignUpForm className="mt-4 w-96" />

      <p className="mt-6 text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/auth/signin"
          className="text-primary duration-200 hover:opacity-70"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
