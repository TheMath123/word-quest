'use client'

import { useState } from "react";
import signInWithGithub from "@/actions/sign-in-with-github";
import { BrandGithub } from "@mynaui/icons-react"
import { Button } from "@/components/ui/button";

interface SignInGithubProps {
  children?: React.ReactNode;
}

export function SignInGithub({ children }: SignInGithubProps) {
  const [loading, setLoading] = useState(false);

  return (
    <form action={signInWithGithub} onProgress={() => setLoading}>
      <Button
        disabled={loading}
        type="submit"
        className="text-gray-50 gap-2 font-medium"
      >
        <BrandGithub
          className="stroke-gray-50  stroke-2"
        />
        {children}
      </Button>
    </form>
  )
}