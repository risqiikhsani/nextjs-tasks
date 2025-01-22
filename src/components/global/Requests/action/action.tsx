"use client"

import { Button } from '@/components/ui/button'
import { RevalidatePath } from '@/lib/actions'
import { instance } from '@/lib/axios'
import { JoinRequest } from '@prisma/client'
import React from 'react'
import { toast } from 'sonner'

export default function Action({data}:{data:JoinRequest}) {

    const onAccept = async () => {
        try {
            await instance.get(`/api/org-join-requests/${data.id}?action=accept`)
            toast.success("Request accepted successfully")
            RevalidatePath("/orgs")
        } catch (error: any) {
            console.error(error)
            toast.error(error.response.data.message || 'An error occurred');
        }
    }
    const onReject = async () => {
        try {
            await instance.get(`/api/org-join-requests/${data.id}?action=reject`)
            toast.success("Request rejected successfully")
            RevalidatePath("/")
        } catch (error: any) {
            console.error(error)
            toast.error(error.response.data.message || 'An error occurred');
        }
    }
  return (
    <div className='flex gap-2'>
        <Button onClick={onAccept} size="sm" variant="outline">Accept</Button>
        <Button onClick={onReject} size="sm" variant="outline">Reject</Button>
    </div>
  )
}
