"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Loader from '@/components/custom/Loader'
import createTask from "../actions/createTask";
import { AlerList } from "./AlerList";
import Cookies from "js-cookie";
import session from "../actions/session"; // Assuming you have a session function

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description is required.",
  }),
  assignTo: z.string().min(2, {
    message: "Assign to someone.",
  }),
});

const FormTask = () => {
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState("");
  const [showAlert, setStopShowingAlert] = useState(false);
  const cookieState = Cookies.get('appContextState');

  const [email, setEmail] = useState<string | any>("");

  // Define the types
  type User = {
    name: string | null;
    email: string | null;
    image: string | null;
  };

  type UserSession = {
    user: User;
    expires: string|"";
  };

  useEffect(() => {
    session().then((res: UserSession|any) => {
      if (res !== null && res.user.email !== null) {
        setEmail(res.user.email);
      } else {
        console.log('Session is null or email is null');
      }
    });
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      description: "",
      assignTo: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const result = await createTask(values, email);
    if (result.data.status === "success") {
      setStopShowingAlert(true);
      setAlertMessage("Successfully created task");
      setLoading(false);
      setIsSuccess("success");
      form.reset();
    } else {
      setStopShowingAlert(true);
      setAlertMessage("Failed to create task");
      setLoading(false);
      setIsSuccess("error");
    }
    setTimeout(() => {
      setStopShowingAlert(false);
    }, 3000);
  }

  return (
    <div>
      {showAlert && alertMessage !== '' && <AlerList type={isSuccess} message={alertMessage} />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Task"
                    {...field}
                    className="w-60 sm:w-80"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Enter description" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="assignTo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assign to</FormLabel>
                <FormControl>
                  <Input placeholder="Assigned to" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          {loading ? <Loader /> : <Button variant="secondary" size="sm" type="submit">Submit</Button>}
        </form>
      </Form>
    </div>
  );
};

export default FormTask;
