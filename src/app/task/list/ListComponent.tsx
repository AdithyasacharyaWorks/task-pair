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

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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



type Task = {
  $id: string;
  taskName: string;
  status: string;
  priority: string;
};

const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
    accessorKey: "taskDesc",
    header: "Description",
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
            <DropdownMenuItem>View task details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const ListComponent = ({ data }: { data: Task[] }) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
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
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("taskName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("taskName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="ml-2">
              Status <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem
              checked={
                (table.getColumn("status")?.getFilterValue() as string) === "In Progress"
              }
              onCheckedChange={(value) =>
                table.getColumn("status")?.setFilterValue(value ? "In Progress" : "")
              }
            >
              In Progress
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={
                (table.getColumn("status")?.getFilterValue() as string) === "Backlog"
              }
              onCheckedChange={(value) =>
                table.getColumn("status")?.setFilterValue(value ? "Backlog" : "")
              }
            >
              Backlog
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={
                (table.getColumn("status")?.getFilterValue() as string) === "Todo"
              }
              onCheckedChange={(value) =>
                table.getColumn("status")?.setFilterValue(value ? "Todo" : "")
              }
            >
              Todo
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={
                (table.getColumn("status")?.getFilterValue() as string) === "Done"
              }
              onCheckedChange={(value) =>
                table.getColumn("status")?.setFilterValue(value ? "Done" : "")
              }
            >
              Done
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={
                (table.getColumn("status")?.getFilterValue() as string) === "Canceled"
              }
              onCheckedChange={(value) =>
                table.getColumn("status")?.setFilterValue(value ? "Canceled" : "")
              }
            >
              Canceled
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="ml-2">
              Priority <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem
              checked={
                (table.getColumn("priority")?.getFilterValue() as string) === "Low"
              }
              onCheckedChange={(value) =>
                table.getColumn("priority")?.setFilterValue(value ? "Low" : "")
              }
            >
              Low
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={
                (table.getColumn("priority")?.getFilterValue() as string) === "Medium"
              }
              onCheckedChange={(value) =>
                table.getColumn("priority")?.setFilterValue(value ? "Medium" : "")
              }
            >
              Medium
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={
                (table.getColumn("priority")?.getFilterValue() as string) === "High"
              }
              onCheckedChange={(value) =>
                table.getColumn("priority")?.setFilterValue(value ? "High" : "")
              }
            >
              High
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table?.getRowModel().rows?.length ? (
              table?.getRowModel().rows.map((row) => (
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
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
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
    </div>
  );
};

export default ListComponent;
