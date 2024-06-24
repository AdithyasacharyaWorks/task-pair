"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const CreateProjectPage = () => {
  const [projectName, setProjectName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);
  const [teamMembers, setTeamMembers] = React.useState<string[]>([]);
  const [status, setStatus] = React.useState("pending");
  const router = useRouter();

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();

    // Redirect to another page or show success message
    router.push("/projects");
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Create Project</h1>
      <form onSubmit={handleCreateProject}>
        <div className="mb-4">
          <Label htmlFor="projectName">Project Name</Label>
          <Input
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="startDate">Start Date</Label>
          {/* <DatePicker
            id="startDate"
            selected={startDate}
            onChange={(date: Date | null) => setStartDate(date)}
            required
          /> */}
        </div>
        <div className="mb-4">
          <Label htmlFor="endDate">End Date</Label>
          {/* <DatePicker
            id="endDate"
            selected={endDate}
            onChange={(date: Date | null) => setEndDate(date)}
            required
          /> */}
        </div>
        <div className="mb-4">
          <Label htmlFor="teamMembers">Team Members</Label>
          <Input
            id="teamMembers"
            value={teamMembers.join(", ")}
            onChange={(e) =>
              setTeamMembers(e.target.value.split(",").map((member) => member.trim()))
            }
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="status">Status</Label>
          <Select value={status} onValueChange={(value) => setStatus(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit">Create Project</Button>
      </form>
    </div>
  );
};

export default CreateProjectPage;
