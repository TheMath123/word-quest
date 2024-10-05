"use server";

import { getAPIUrl } from "@/helpers/get-api-url";

export default async function getUser() {
  const response = await fetch(getAPIUrl() + "/api/game/profile");
  const user = await response.json();
  return user;
}
