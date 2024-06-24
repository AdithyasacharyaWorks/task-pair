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
import signin from "../actions/signin";
import CustomAlert from "@/components/custom/CustomAlert" 
import { useAppContext } from "@/lib/userContextProvder";

// import { AlerList } from "@/AlerList";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

const LoginPage = () => {


  const { setState } = useAppContext();
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
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    const result:any = await signin(values)

    const userId = result.data.user[0];
    const userEmail = result.data.user[1];
    setState((prevState) => ({
      ...prevState,
      userEmail,
      userId,
    }));
    if(result.data.status === 200){
      setLoading(false)
      setAlertMessage("Logged in sucessfully")
      setIsSuccess("success")
      setShowAlert(true)
      setTimeout(()=>{
        setShowAlert(false)
      },2000)
      router.push("/")

      

    }else{
      setLoading(false)
      setAlertMessage("failed to Login please enter valid email and passwod")
      setIsSuccess("failure")
      setShowAlert(true)
      setTimeout(()=>{
        setShowAlert(false)
      },2000)
    }

  }



  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="max-w-md w-full bg-[#30363d] p-8 rounded-md shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        {showAlert && alertMessage !== "" && <CustomAlert type={isSuccess} message={alertMessage} />}
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
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : "Login"}
            </Button>
          </form>
        </Form>
        <p className="text-center text-gray-500 mt-4">
          Dont have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
