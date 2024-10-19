import { auth } from "@/lib/auth";
import { ProfileButton } from "@/components/profile/profile-button";

export async function ProfileAvatar() {
  const session = await auth();

  if (!session || !session.user) {
    return <div></div>
  }

  return <ProfileButton user={session.user} />
}