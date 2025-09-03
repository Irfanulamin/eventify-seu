"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Users, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import AddUserForm from "./_components/AddUser";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EditUserDialog from "./_components/EditRole";
import DeleteUserDialog from "./_components/DeleteUser";

interface User {
  _id: string;
  username: string;
  email: string;
  role: "user" | "admin" | "super-admin";
  createdAt: string;
}

async function getUsers(): Promise<User[]> {
  try {
    const res = await fetch("http://localhost:5000/api/users/", {
      cache: "no-store",
    });
    const data = await res.json();
    if (data?.success) return data.data?.users || [];
  } catch (e) {
    console.error(e);
  }
  return [];
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<User["role"] | "">("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const fetchedUsers = await getUsers();
    setUsers(fetchedUsers);
  };

  const filteredUsers = useMemo(() => {
    let result = users;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (u) =>
          u.username.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q)
      );
    }
    if (roleFilter) result = result.filter((u) => u.role === roleFilter);
    return result;
  }, [users, searchQuery, roleFilter]);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <main className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold">User Management</h1>
          <p className="text-sm text-muted-foreground">
            Manage users and their permissions
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6">
        {/* Search */}
        <div className="flex-1 min-w-[200px]">
          <Label className="mb-1 block">Search Users</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              id="search"
              placeholder="Search by username or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-full"
            />
          </div>
        </div>

        {/* Role filter */}
        <div className="flex-1 min-w-[150px]">
          <Label className="mb-1 block">Filter by Role</Label>
          <Select
            value={roleFilter || "all"}
            onValueChange={(value) =>
              setRoleFilter(value === "all" ? "" : (value as User["role"]))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="super-admin">Super Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Add user button */}
        <div className="w-full sm:w-auto">
          <AddUserForm onUserCreated={fetchUsers} />
        </div>
      </section>

      {/* Table */}
      <div className="overflow-x-auto border border-blue-50 rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="text-sm sm:text-base">
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="hidden sm:table-cell">
                Created Date
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((u) => (
                <TableRow
                  key={u._id}
                  className="bg-blue-50 odd:bg-blue-50/50 border-0 text-sm sm:text-base"
                >
                  <TableCell>{u.username}</TableCell>
                  <TableCell>
                    <div className="text-xs sm:text-sm text-white bg-blue-500 rounded-full inline-block p-1 px-1.5">
                      {u.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs sm:text-sm bg-blue-950 p-1 px-1.5 text-white rounded-full uppercase">
                      {u.role.replace("-", " ")}
                    </span>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-blue-950 font-medium">
                    {formatDate(u.createdAt)}
                  </TableCell>
                  <TableCell className="flex flex-wrap gap-2">
                    <EditUserDialog user={u} onRoleUpdated={fetchUsers} />
                    <DeleteUserDialog
                      userId={u._id}
                      userName={u.username}
                      onUserDeleted={fetchUsers}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-12 text-muted-foreground"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Users className="h-8 w-8 text-muted-foreground/50" />
                    <div>No users found</div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
