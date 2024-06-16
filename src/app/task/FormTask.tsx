"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
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

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "description is must",
  }),
  assignTo: z.string().min(2, {
    message: "assign to someone",
  }),
});

const FormTask = () => {

  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isSucess,setIsSucess] =  useState("")
  const [showAlert,setStopShowingAlert] = useState(false)
  const cookieState = Cookies.get('appContextState');
  const email =cookieState ? JSON.parse(cookieState) : ""



  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      description: "",
      assignTo: "",
    },
  });


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    const result = await createTask(values,email);
    if(result.data.status === "success"){
      setStopShowingAlert(true)
      setAlertMessage("succesully created task")
      setLoading(false)
      setIsSucess("success")
      form.reset()
    }else {
      setStopShowingAlert(true)
      setAlertMessage("failed to created task")
      setLoading(false)
      setIsSucess("error")

    }
    setTimeout(()=>{
      setStopShowingAlert(false)
    },3000)
  }

  return (
    <div>
      {(showAlert && alertMessage !== '')  && <AlerList type={isSucess} message={alertMessage}/>}
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
                  className=" w-60 sm:w-80"
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
        {
          loading ?<Loader />:
        <Button variant={'secondary'} size={"sm"} type="submit">Submit</Button>
        }
      </form>
    </Form>
    </div>
  );
};

export default FormTask;
