import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/cn";
import { getInitials } from "@/utils/get-initials";

interface ProfilePhotoProps {
  name: string;
  image?: string;
  className?: string;
}

export function ProfilePhoto({ name, image, className }: ProfilePhotoProps) {
  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={image ?? ""} />
      <AvatarFallback>
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
}