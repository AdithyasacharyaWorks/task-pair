"use client";

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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Loader from "@/components/custom/Loader";
import createTask from "../actions/createTask";
import { AlerList } from "./AlerList";
import Cookies from "js-cookie";
import session from "../actions/session";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import checkEmail from "../actions/checkEmail";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description is required.",
  }),
  assignTo: z
    .string()
    .email({
      message: "Please enter a valid email address for Assign to field.",
    })
    .optional(), // Making assignTo optional since it's dynamically set
  priority: z.string(),
  deadline: z
    .string()
    .refine((value) => !!value, {
      message: "Deadline is required.",
    })
    .refine(
      (value) => {
        // Custom refinement to check if the date is greater than or equal to today
        const today = new Date();
        const selectedDate = new Date(value);
        return selectedDate >= today;
      },
      {
        message: "Deadline must be today or in the future.",
      }
    ),
});

const FormTask = () => {
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState("");
  const [showAlert, setStopShowingAlert] = useState(false);
  const [assignToSelf, setAssignToSelf] = useState(false); // Toggle state
  const [email, setEmail] = useState<string | null>(null);
  const [assignToError, setAssignToError] = useState<string | null>(null);
  const [disableBtn, setDisableBtn] = useState<boolean>(true);
  const [loadingEmailCheck, setLoadingEmailCheck] = useState<boolean>(false);

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
    setAssignToError(null);
    session().then((res: UserSession | any) => {
      if (res !== null && res.user.email !== null) {
        setEmail(res.user.email);
      } else {
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
      values.assignTo = email || "";
    }

    try {
      const assignTo = values.assignTo || "";
      const result = await createTask({ ...values, assignTo }, email || "");
      if (result.data.status === "success") {
        setStopShowingAlert(true);
        setAlertMessage("Successfully created task");
        setIsSuccess("success");
        setAssignToError(null);
        form.reset();
      } else {
        setStopShowingAlert(true);
        setAlertMessage("Failed to create task");
        setIsSuccess("error");
        setAssignToError(null);
      }
    } catch (error) {
      setStopShowingAlert(true);
      setAlertMessage("Failed to create task");
      setIsSuccess("error");
      setAssignToError(null);
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
      form.setValue("assignTo", email || "");
      setDisableBtn(false);
      setAssignToError(null);
    } else {
      form.setValue("assignTo", "");
      setDisableBtn(true);
    }
  };
  const handleEmailAssigned = async (e: any) => {
    const inputEmail = e.target.value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    setLoadingEmailCheck(true);
    if (!emailPattern.test(inputEmail)) {
      setLoadingEmailCheck(false);
      setAssignToError(
        "Invalid email format. Please enter a valid @gmail.com email address."
      );
      return;
    }

    try {
      const result = await checkEmail(inputEmail);

      if (result.data.data.documents.length === 0) {
        setAssignToError("This email is not registered in the Task app.");
        setDisableBtn(true);
        setLoadingEmailCheck(false);
      } else {
        setAssignToError("Sucess");
        setDisableBtn(false);
        setLoadingEmailCheck(false);
        // setAssignToError(null);
      }
    } catch (error) {
      setDisableBtn(true);
      setLoadingEmailCheck(false);
      console.error("Error checking email:", error);
      setAssignToError("Error checking email. Please try again.");
    }
  };

  return (
    <div className="py-2 flex items-center mt-5 justify-center bg-[#0E1117] text-white">
      <div className="bg-[#0E1117] p-8 rounded w-full max-w-4xl border border-gray-600 shadow-lg hover:shadow-xl transition-shadow duration-300">
        {showAlert && alertMessage !== "" && (
          <AlerList type={isSuccess} message={alertMessage} />
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormMessage className="text-green-600 text-lg underline">
              Add task
            </FormMessage>
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
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="Low">Low</SelectItem>
                              <SelectItem value="Medium">Medium</SelectItem>
                              <SelectItem value="High">High</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
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
                          min={new Date().toISOString().split("T")[0]} // Set min to today's date
                          className="w-full bg-white text-black"
                        />
                      </FormControl>
                      {form.formState.errors.deadline && (
                        <FormMessage className="text-red-600">
                          {form.formState.errors.deadline.message}
                        </FormMessage>
                      )}
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
                  <div className="flex space-x-10 mb-5">
                    <FormLabel>Assignee Email</FormLabel>
                    {loadingEmailCheck && <Loader />}
                  </div>

                  <FormControl>
                    <Input
                      placeholder="Assignee Email"
                      {...field}
                      disabled={assignToSelf}
                      className="w-full"
                      onBlur={handleEmailAssigned}
                    />
                  </FormControl>
                  {assignToError && (
                    <FormMessage className="text-red-600">
                      {assignToError === "Sucess" ? (
                        <div className="text-green-500 flex items-center space-x-3 gap-3">
                          <AiOutlineCheckCircle size={"15"} />
                          Email entered is present{" "}
                        </div>
                      ) : (
                        <div className="flex gap-3 items-center">
                          <AiOutlineClose size={"15"} />
                          {assignToError}
                        </div>
                      )}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            {loading ? (
              <Loader />
            ) : (
              <Button
                variant="default"
                size="sm"
                type="submit"
                disabled={disableBtn}
              >
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
