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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/`, {
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
      <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold">User Management</h1>
          <p className="text-sm text-muted-foreground">
            Manage users and their permissions
          </p>
        </div>
      </section>
      <section className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6">
        <div className="min-w-[300px]">
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
        <div className="min-w-[150px]">
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
        <div className="w-full sm:w-auto">
          <AddUserForm onUserCreated={fetchUsers} />
        </div>
      </section>
      <div className="overflow-x-auto border border-blue-50 rounded-md">
        <div className="hidden sm:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="hidden md:table-cell">
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
                    className="bg-blue-50 odd:bg-blue-50/50 border-0"
                  >
                    <TableCell className="font-medium">{u.username}</TableCell>
                    <TableCell>
                      <div className="text-xs bg-blue-500 text-white rounded-full inline-block py-1 px-2 max-w-[200px] truncate">
                        {u.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs bg-blue-950 py-1 px-2 text-white rounded-full uppercase">
                        {u.role.replace("-", " ")}
                      </span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-blue-950 font-medium">
                      {formatDate(u.createdAt)}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <EditUserDialog user={u} onRoleUpdated={fetchUsers} />
                        <DeleteUserDialog
                          userId={u._id}
                          userName={u.username}
                          onUserDeleted={fetchUsers}
                        />
                      </div>
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
      </div>
      {/* Mobile Card View */}
      <div className="sm:hidden">
        {filteredUsers.length > 0 ? (
          <div className="space-y-3 ">
            {filteredUsers.map((u) => (
              <div
                key={u._id}
                className="bg-blue-50 rounded-lg p-4 space-y-3 border border-blue-100"
              >
                {/* User Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm uppercase">
                      @{u.username}
                    </h3>
                    <span className="text-xs bg-blue-950 py-1 px-2 text-white rounded-full uppercase">
                      {u.role.replace("-", " ")}
                    </span>
                  </div>
                  <div className="text-xs bg-blue-500 text-white rounded-full inline-block py-1 px-2 max-w-full truncate">
                    {u.email}
                  </div>
                  <div className="text-xs text-blue-950 font-medium">
                    Created: {formatDate(u.createdAt)}
                  </div>
                </div>
                <div className="flex gap-2 pt-2 border-t border-blue-200">
                  <EditUserDialog user={u} onRoleUpdated={fetchUsers} />
                  <DeleteUserDialog
                    userId={u._id}
                    userName={u.username}
                    onUserDeleted={fetchUsers}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <div className="flex flex-col items-center gap-2">
              <Users className="h-8 w-8 text-muted-foreground/50" />
              <div className="text-sm">No users found</div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
