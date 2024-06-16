"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import signup from "../actions/signup";
import CustomAlert from "@/components/custom/CustomAlert"

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters long" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const result = await signup(values)
    if(result?.data.status === 500){
      setLoading(false);
      setShowAlert(true);
      setAlertMessage("Email already present!");
      setIsSuccess("failure");
      setTimeout(() => setShowAlert(false), 3000);
    }
    if(result?.data.status === 200){
      setLoading(false);
      setShowAlert(true);
      setAlertMessage("Signed up succesfully!!");
      setIsSuccess("success");
      setTimeout(() => setShowAlert(false), 2500);
      setTimeout(()=>{

        router.push('/login')
      },2000)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="max-w-md w-full bg-[#30363d] p-8 rounded-md shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        {showAlert && alertMessage !== '' && <CustomAlert type={isSuccess} message={alertMessage} />}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Confirm your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : "Sign Up"}
            </Button>
          </form>
        </Form>
        <p className="text-center text-gray-500 mt-4">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
