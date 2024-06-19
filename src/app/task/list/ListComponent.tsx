"use client";

import * as React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation"; // Corrected import
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Define the Task type
type Task = {
  $id: string;
  taskName: string;
  taskDesc: string;
  status: string;
  priority: string;
  isAccepted: boolean | null;
  assignedTo: string;
};

// Define columns with necessary changes
const columns: (router: ReturnType<typeof useRouter>) => ColumnDef<Task>[] = (
  router
) => [
  {
    accessorKey: "taskName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Title
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "assignedTo",
    header: "Assigned",
  },
  {
    accessorKey: "isAccepted",
    header: "Accepted",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const task = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(task.$id)}
            >
              Copy task ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => router.push(`/task/list/${task.$id}`)}
            >
              View task details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// Define the ListComponent functional component
const ListComponent = ({ data }: { data: Task[] }) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const router = useRouter(); // Initialize useRouter hook

  const table = useReactTable({
    data,
    columns: columns(router), // Pass the router instance to columns function
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full p-4">
      <div className="flex items-center py-4 gap-2">
        <div className="sm:flex  sm:flex-row sm:gap-5  gap-5">
          <Input
            placeholder="Filter tasks..."
            value={
              (table.getColumn("taskName")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("taskName")?.setFilterValue(event.target.value)
            }
            className="max-w-md hidden sm:block"
          />
          <Input
            placeholder="Filter by assignee email..."
            value={
              (table.getColumn("assignedTo")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("assignedTo")?.setFilterValue(event.target.value)
            }
            className="max-w-md hidden sm:block"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="ml-2 hidden sm:flex">
              Status <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem
              checked={
                (table.getColumn("status")?.getFilterValue() as string) ===
                "Todo"
              }
              onCheckedChange={(value) =>
                table.getColumn("status")?.setFilterValue(value ? "Todo" : "")
              }
            >
              Todo
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={
                (table.getColumn("status")?.getFilterValue() as string) ===
                "In Progress"
              }
              onCheckedChange={(value) =>
                table
                  .getColumn("status")
                  ?.setFilterValue(value ? "In Progress" : "")
              }
            >
              In Progress
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={
                (table.getColumn("status")?.getFilterValue() as string) ===
                "Done"
              }
              onCheckedChange={(value) =>
                table.getColumn("status")?.setFilterValue(value ? "Done" : "")
              }
            >
              Done
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={
                (table.getColumn("status")?.getFilterValue() as string) ===
                "Backlog"
              }
              onCheckedChange={(value) =>
                table
                  .getColumn("status")
                  ?.setFilterValue(value ? "Backlog" : "")
              }
            >
              Backlog
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={
                (table.getColumn("status")?.getFilterValue() as string) ===
                "Cancelled"
              }
              onCheckedChange={(value) =>
                table
                  .getColumn("status")
                  ?.setFilterValue(value ? "Cancelled" : "")
              }
            >
              Cancelled
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="ml-2 hidden sm:flex">
              Priority <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem
              checked={
                (table.getColumn("priority")?.getFilterValue() as string) ===
                "Low"
              }
              onCheckedChange={(value) =>
                table.getColumn("priority")?.setFilterValue(value ? "Low" : "")
              }
            >
              Low
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={
                (table.getColumn("priority")?.getFilterValue() as string) ===
                "Medium"
              }
              onCheckedChange={(value) =>
                table
                  .getColumn("priority")
                  ?.setFilterValue(value ? "Medium" : "")
              }
            >
              Medium
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={
                (table.getColumn("priority")?.getFilterValue() as string) ===
                "High"
              }
              onCheckedChange={(value) =>
                table.getColumn("priority")?.setFilterValue(value ? "High" : "")
              }
            >
              High
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="ml-2 hidden sm:flex">
              Assigned to me
              <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem
              checked={
                (table.getColumn("assignedTo")?.getFilterValue() as string) ===
                "adithyasacharya292@gmail.com"
              }
              onCheckedChange={(value) =>
                table
                  .getColumn("assignedTo")
                  ?.setFilterValue(value ? "adithyasacharya292@gmail.com" : "")
              }
            >
              Show
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="ml-auto hidden sm:flex">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns(router).length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} row(s) in total.
        </div>
        <Button
          variant="default"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ListComponent;
