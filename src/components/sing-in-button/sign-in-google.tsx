'use client'

import { useState } from "react";
import { BrandGoogle } from "@mynaui/icons-react"
import signInWithGoogle from "@/actions/sign-in-with-google";
import { Button } from "@/components/ui/button";

export function SignInGoogle() {
  const [loading, setLoading] = useState(false);

  return (
    <form action={signInWithGoogle} onProgress={() => setLoading}>
      <Button
        disabled={loading}
        type="submit"
      >
        <BrandGoogle
          className="stroke-foreground"
        />
        Sign in with Google
      </Button>
    </form>
  )
}