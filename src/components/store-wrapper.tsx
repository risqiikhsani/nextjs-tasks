import { ReactNode } from "react"
import { StoreInitializer } from "./store-initializer"


async function getData() {
  // Your data fetching logic here
  const res = await fetch('https://api.example.com/data')
  return res.json()
}

export default async function StoreWrapper({children}:{children:ReactNode}) {
  const data = await getData()
  
  return (
    <main>
      <StoreInitializer data={data} />
      {children}
    </main>
  )
}