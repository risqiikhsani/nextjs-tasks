import { ReactNode } from "react"
import { StoreInitializer } from "./store-initializer"
import { cookies } from "next/headers"




const URL = process.env.NEXT_PUBLIC_API_URL
export default async function StoreWrapper({children}:{children:ReactNode}) {

  const response = await fetch(`${URL}/api/me`,{
    headers:{
      cookie: (await cookies()).toString()
    }
  })
  const data = await response.json()

  return (
    <main>
      <StoreInitializer data={data} />
      {children}
    </main>
  )
}