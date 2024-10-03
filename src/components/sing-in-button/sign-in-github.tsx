'use client'

import { useState } from "react";
import signInWithGithub from "@/actions/sign-in-with-github";
import { BrandGithub } from "@mynaui/icons-react"
import { Button } from "@/components/ui/button";

export function SignInGithub() {
  const [loading, setLoading] = useState(false);

  return (
    <form action={signInWithGithub} onProgress={() => setLoading}>
      <Button
        disabled={loading}
        type="submit"
        className="text-foreground"
      >
        <BrandGithub
          className="stroke-foreground stroke-2"
        />
        Sign in with Github
      </Button>
    </form>
  )
}