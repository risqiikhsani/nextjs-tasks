
import { signIn } from "@/auth"
import { Button } from "@/components/ui/button"
 
export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen">
    <form
      action={async () => {
        "use server"
        await signIn("google",{redirectTo:"/"})
      }}
    >
      <Button type="submit">Signin with Google</Button>
    </form>
    </div>
  )
} 