import { cn } from "zstream/ui/lib/utils";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "zstream/ui/primitives/label";
import { Input } from "zstream/ui/primitives/input";
import { Button } from "zstream/ui/primitives/button";
import { toast } from "sonner";
import Link from "next/link";

interface SignInFromProps {
  className: string;
}

const ZSignInFormSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(6).max(20),
});

type TSignInFormSchema = z.infer<typeof ZSignInFormSchema>;

export default function SignInForm({ className }: SignInFromProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TSignInFormSchema>({
    values: {
      email: "",
      password: "",
    },
    resolver: zodResolver(ZSignInFormSchema),
  });

  const onFormSubmit: SubmitHandler<TSignInFormSchema> = async ({
    email,
    password,
  }) => {
    // TODO(signin): handle user creation
  };

  return (
    <form
      className={cn("flex w-full flex-col gap-y-4", className)}
      onSubmit={handleSubmit(onFormSubmit)}
    >
      <div>
        <Label htmlFor="email" className="text-muted-foreground">
          Email
        </Label>
        <Input
          id="emmail"
          type="email"
          className="mt-2 bg-background"
          {...register("email", { required: true })}
        />

        {errors.email && (
          <span className="mt-1 text-xs text-red-500">
            {errors.email.message}
          </span>
        )}
      </div>

      <div>
        <Label htmlFor="password" className="text-muted-foreground">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          className="mt-2 bg-background"
          {...register("password", { required: true })}
        />

        {errors.password && (
          <span className="mt-1 text-xs text-red-500">
            {errors.password.message}
          </span>
        )}

        <p className="mt-2 text-sm text-muted-foreground">
          <Link
            href="/auth/forgot-password"
            className="text-primary duration-200 hover:opacity-70"
          >
            Forgot password?
          </Link>
        </p>
      </div>

      <Button loading={isSubmitting} disabled={isSubmitting} size="lg">
        {isSubmitting ? "Signing up..." : "Sign Up"}
      </Button>
    </form>
  );
}
