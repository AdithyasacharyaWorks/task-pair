'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Loader from "@/components/custom/Loader";
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
  assignTo: z.string().email({
    message: "Please enter a valid email address for Assign to field.",
  }).optional(), // Making assignTo optional since it's dynamically set
  priority: z.string(),
  deadline: z.string().refine((value) => !!value, {
    message: "Deadline is required.",
  }), // Accepts any string since we'll handle file uploads separately
});

const FormTask = () => {
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState("");
  const [showAlert, setStopShowingAlert] = useState(false);
  const [assignToSelf, setAssignToSelf] = useState(false); // Toggle state
  const [email, setEmail] = useState<string | null>(null);

  // Define the types
  type User = {
    name: string | null;
    email: string | null;
    image: string | null;
  };

  type UserSession = {
    user: User;
    expires: string | "";
  };

  useEffect(() => {
    session().then((res: UserSession | any) => {
      if (res !== null && res.user.email !== null) {
        setEmail(res.user.email);
      } else {
        console.log("Session is null or email is null");
      }
    });
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      description: "",
      assignTo: "",
      priority: "",
      deadline: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    if (assignToSelf) {
      values.assignTo = email || ""; // Assign logged-in user's email if "Assign to me" is checked
    }
    try {
      const assignTo = values.assignTo || ""; // Ensure assignTo is a string
      const result = await createTask({ ...values, assignTo }, email || "");
      if (result.data.status === "success") {
        setStopShowingAlert(true);
        setAlertMessage("Successfully created task");
        setIsSuccess("success");
        form.reset();
      } else {
        setStopShowingAlert(true);
        setAlertMessage("Failed to create task");
        setIsSuccess("error");
      }
    } catch (error) {
      setStopShowingAlert(true);
      setAlertMessage("Failed to create task");
      setIsSuccess("error");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setStopShowingAlert(false);
      }, 3000);
    }
  }

  const handleAssignToSelfToggle = () => {
    const newAssignToSelf = !assignToSelf;
    setAssignToSelf(newAssignToSelf);
    if (newAssignToSelf) {
      form.setValue("assignTo", email || ""); // Assign logged-in user's email if toggled on
    } else {
      form.setValue("assignTo", ""); // Clear assignTo field if toggled off
    }
  };

  return (
    <div className="min-h-screen py-2 flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded shadow-lg w-full max-w-4xl">
        {showAlert && alertMessage !== "" && (
          <AlerList type={isSuccess} message={alertMessage} />
        )}
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
                      className="w-full"
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
                    <Input
                      placeholder="Enter description"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex space-x-8">
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="w-full text-white px-3 text-sm rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 bg-gray-800 p-2 border border-white"
                        >
                          <option value="">Select Priority</option>
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="deadline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deadline</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          placeholder="Deadline"
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                id="assignToSelf"
                checked={assignToSelf}
                onChange={handleAssignToSelfToggle}
              />
              <label htmlFor="assignToSelf">Assign to me</label>
            </div>
            <FormField
              control={form.control}
              name="assignTo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assignee Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Assignee Email"
                      {...field}
                      disabled={assignToSelf}
                      className="w-full"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {loading ? (
              <Loader />
            ) : (
              <Button variant="default" size="sm" type="submit">
                Submit
              </Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default FormTask;
