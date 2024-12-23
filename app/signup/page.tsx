"use client";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import ky from "ky";
import { useState } from "react";
import clsx from "clsx";

const schema = z.object({
  email: z.string().email("Email inválido"),
  password: z
    .string()
    .min(6, { message: "A senha deve ter, no mínimo, 6 caracteres" }),
  username: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
});

type Zschema = z.infer<typeof schema>;

export default function Signup() {
  const router = useRouter();
  const [error, setError] = useState<boolean | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Zschema>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Zschema> = async (data) => {
    try {
      const response = await ky.post("http://localhost:4001/user/singup", {
        json: data,
      });
      const toJson: { token: string } = await response.json();
      setCookie("token", toJson.token, { maxAge: 604800 });
      router.push("/movies");
      setError(false);
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] mt-24 px-4">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Signup</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to Signup to your account
            </p>
          </div>
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                {...register("username", {
                  required: "Este campo é obrigatório",
                })}
                placeholder="myusername"
                type="text"
              />
              {errors?.username && (
                <span className={`text-sm text-red-600 font-medium`}>
                  {errors?.username?.message}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email", { required: "Este campo é obrigatório" })}
                placeholder="m@example.com"
                type="email"
              />
              {errors?.email && (
                <span className={`text-sm text-red-600 font-medium`}>
                  {errors?.email?.message}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>

              <Input
                type="password"
                {...register("password", {
                  required: "Este campo é obrigatório",
                })}
              />
              {errors?.password && (
                <span className={`text-sm text-red-600 font-medium`}>
                  {errors?.password?.message}
                </span>
              )}
            </div>
            <Button
              type="submit"
              className={clsx("w-full transition", {
                "bg-red-600 text-white": error === true,
                "bg-emerald-600 text-white": error === false,
                "bg-white text-black": error === null,
              })}
            >
              {isSubmitting == true ? (
                <div
                  className={`w-8 h-8 rounded-full border-2  p-4 border-black transition
             animate-spin border-t-transparent`}
                ></div>
              ) : (
                "Singup"
              )}
            </Button>
            <Button variant="outline" className="w-full">
              Signup with Google
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            already have an account?{" "}
            <Link href="/" className="underline">
              Login
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block rounded-sm"></div>
    </div>
  );
}
