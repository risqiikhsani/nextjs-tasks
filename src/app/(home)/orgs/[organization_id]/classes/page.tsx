import React from 'react'
import Classes from '@/components/global/Class/classes';

export default async function Page({
  params,
}: {
  params: Promise<{ organization_id: string }>;
}) {
  return (
    <div>
        <Classes organization_id={(await params).organization_id}/>
    </div>
  )
}
