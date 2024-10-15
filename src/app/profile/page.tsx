import { Suspense } from "react";
import { ProfilePage } from "./components/profile-page";
import { ProfileLoading } from "./components/profile-loading";

export default function Profile() {
  return <Suspense fallback={<ProfileLoading />}>
    <ProfilePage />
  </Suspense>
}