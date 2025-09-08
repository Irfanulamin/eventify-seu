"use client";

import { LogOut, User } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/use-auth";

export function UserPopover() {
  const { user, logout } = useAuth();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="rounded-full hover:bg-gray-100 ">
          <User className="h-12 w-12" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2" align="end">
        <div className="flex flex-col gap-4 px-2 py-1.5 border-b bg-muted/50">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
              <User className="h-5 w-5 text-blue-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {user?.username}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.email}
              </p>
            </div>
          </div>
          <Button
            onClick={() => logout()}
            variant="destructive"
            className="w-full"
          >
            Sign out
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
