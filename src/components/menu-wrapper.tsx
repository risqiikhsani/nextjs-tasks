import React, { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SettingsIcon } from "lucide-react";

export default function MenuWrapper({ children }: { children: ReactNode }) {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex gap-1 text-sm items-center">
          <SettingsIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col items-center gap-2">
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {children}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
