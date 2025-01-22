import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVerticalIcon } from "lucide-react";
import { ReactNode } from "react";

export default function MenuWrapper({ children }: { children: ReactNode }) {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex gap-1 text-sm items-center">
          <EllipsisVerticalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col items-center gap-2 p-2">
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {children}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
