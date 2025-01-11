import { ReactNode } from "react"
import { StoreInitializer } from "./store-initializer"
import { cookies } from "next/headers"


const URL = process.env.NEXT_PUBLIC_API_URL

async function getUser() {
  const response = await fetch(`${URL}/api/me`, {
    headers: {
      cookie: (await cookies()).toString()
    }
  })
  return response.json()
}

async function getEnrollments(userId: string) {
  const response = await fetch(`${URL}/api/enrollments?user_id=${userId}`, {
    headers: {
      cookie: (await cookies()).toString()
    }
  })
  return response.json()
}

export default async function StoreWrapper({
  children
}: {
  children: ReactNode
}) {
  // First get the user data since we need it for the enrollments query
  const user = await getUser()
  
  // Then fetch enrollments in parallel with any other data you might need
  const [enrollments] = await Promise.all([
    getEnrollments(user.id),
    // Add more parallel fetches here if needed
  ])

  return (
    <main>
      <StoreInitializer user={user} enrollments={enrollments} />
      {children}
    </main>
  )
}