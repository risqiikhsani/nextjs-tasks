import StoreWrapper from '@/components/store-wrapper'
import React from 'react'

export default function Page() {
  console.log("== Refetch store ==")
  return (
    <div>
        <StoreWrapper>
            Refetch Store
        </StoreWrapper>
    </div>
  )
}
