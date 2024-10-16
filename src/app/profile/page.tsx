import { Suspense } from "react";
import { ProfilePage } from "./components/profile-page";
import { ProfileLoading } from "./components/profile-loading";

export default function ProfileS() {
  return <Suspense fallback={<ProfileLoading />}>
    <ProfilePage />
  </Suspense>
}