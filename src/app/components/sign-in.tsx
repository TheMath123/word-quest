import { signIn } from "@/lib/auth"
import { BrandGithubSolid } from "@mynaui/icons-react"

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("github", { redirectTo: "/" })
      }}
    >
      <button type="submit"><BrandGithubSolid />Sign in</button>
    </form>
  )
}