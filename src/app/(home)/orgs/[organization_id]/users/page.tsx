import Users from '@/components/global/Users/users'
import React from 'react'

export default async function Page({params}:{params:Promise<{ organization_id: string }>}) {
  return (
    <div>
      <Users organization_id={(await params).organization_id}/>
    </div>
  )
}
