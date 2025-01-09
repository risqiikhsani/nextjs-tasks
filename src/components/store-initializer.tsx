'use client'
import { useRef } from 'react'
import { useDataStore } from '@/stores/data'

export function StoreInitializer({ data }: { data: any[] }) {
  const initialized = useRef(false)
  
  if (!initialized.current) {
    useDataStore.setState({ data })
    initialized.current = true
  }
  
  return null
}