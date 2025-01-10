'use client'
import { useRef } from 'react'
import { useDataStore } from '@/stores/data'
import { User as UserType } from '@prisma/client'

export function StoreInitializer({ data }: { data: UserType }) {
  const {setData} = useDataStore((state) => state)
  const initialized = useRef(false)
  
  if (!initialized.current) {
    setData(data)
    initialized.current = true
  }
  
  return null
}