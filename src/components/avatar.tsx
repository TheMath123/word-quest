'use client'

import Image from "next/image"
import { cn } from "@/lib/cn";
interface UserAvatarProps {
  image?: string | null;
  name?: string | null;
}
export default function UserAvatar({ image, name }: UserAvatarProps) {
  return (
    <div
      className={cn(
        "rounded-md shadow overflow-hidden",
        "aspect-square w-16 h-16",
        "border-2 border-gray-300 dark:border-gray-500"
      )}
    >
      <Image
        src={image ?? ''}
        alt={`${name} photo`}
        width={64}
        height={64} />
    </div>
  )
}