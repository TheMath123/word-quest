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
        className="text-gray-50 gap-2 font-medium"
      >
        <BrandGoogle
          className="stroke-gray-50"
        />
        Sign in with Google
      </Button>
    </form>
  )
}