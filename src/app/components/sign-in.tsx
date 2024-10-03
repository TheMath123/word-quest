'use client'

import { useState } from "react";
import signInWithGithub from "@/actions/sign-in-with-github";
import { cn } from "@/lib/cn";
import { BrandGithub } from "@mynaui/icons-react"

export function SignIn() {
  const [loading, setLoading] = useState(false);

  return (
    <form onSubmit={signInWithGithub} onProgress={() => setLoading}>
      <button
        disabled={loading}
        type="submit"
        className={cn(
          'flex flex-row gap-4',
          "px-4 py-2 bg-blue-600 rounded",
          'absolute top-8 left-8',
          'font-medium text-foreground',
          'disabled:bg-gray-500 disabled:cursor-default'
        )}
      >
        <BrandGithub
          className="stroke-foreground"
        />
        Sign in with Github
      </button>
    </form>
  )
}