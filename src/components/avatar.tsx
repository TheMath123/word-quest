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
      className={cn("rounded shadow overflow-hidden border border-gray-300', aspect-square")}
    >
      <Image
        src={image ?? ''}
        alt={`${name} photo`}
        width={64}
        height={64} />
    </div>
  )
}