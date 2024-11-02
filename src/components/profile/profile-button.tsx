import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { User } from "next-auth";
import Link from "next/link";
import { ProfilePhoto } from "./profile-photo";

interface ProfileButtonProps {
  user: User;
}

export async function ProfileButton({ user }: ProfileButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <ProfilePhoto name={user.name ?? "^_^"} image={user.image ?? ""} />
      </DropdownMenuTrigger>
      <DropdownMenuContent collisionPadding={16} sideOffset={8}>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild >
          <Link
            href='/profile'
          >
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="text-red-500 hover:text-red-600"
        >
          <Link
            href='/logout'
          >
            Sign Out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu >
  );
}
