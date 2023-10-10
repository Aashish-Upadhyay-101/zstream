import { cn } from "zstream/ui/lib/utils";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "zstream/ui/primitives/label";
import { Input } from "zstream/ui/primitives/input";
import { Button } from "zstream/ui/primitives/button";
import { toast } from "sonner";

interface SignUpFromProps {
  className: string;
}

const ZSignUpFormSchema = z.object({
  name: z.string().min(4),
  email: z.string().email().min(1),
  password: z.string().min(6).max(20),
});

type TSignUpFormSchema = z.infer<typeof ZSignUpFormSchema>;

export default function SignInForm({ className }: SignUpFromProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TSignUpFormSchema>({
    values: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(ZSignUpFormSchema),
  });

  const onFormSubmit: SubmitHandler<TSignUpFormSchema> = async ({
    name,
    email,
    password,
  }) => {
    // TODO(signup): handle user creation
  };

  return (
    <form
      className={cn("flex w-full flex-col gap-y-4", className)}
      onSubmit={handleSubmit(onFormSubmit)}
    >
      <div>
        <Label htmlFor="name" className="text-muted-foreground">
          Name
        </Label>
        <Input
          id="name"
          type="text"
          className="mt-2 bg-background"
          {...register("name", { required: true })}
        />

        {errors.name && (
          <span className="mt-1 text-xs text-red-500">
            {errors.name.message}
          </span>
        )}
      </div>

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
      </div>

      <Button loading={isSubmitting} disabled={isSubmitting} size="lg">
        {isSubmitting ? "Signing up..." : "Sign Up"}
      </Button>
    </form>
  );
}
