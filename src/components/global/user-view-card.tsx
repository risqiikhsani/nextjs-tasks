import { Badge } from '@/components/ui/badge'
import { User } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

export default function UserViewCard({data}:{data:User}) {
  return (
    <div className=''>
        {data ? (
            <div className='flex gap-2 items-center'>
                {data.profile_picture && <Image height={50} width={50} alt='pic' src={data.profile_picture} className='rounded-full w-10 h-10'/>}
                <p>{data.name}</p>
            </div>
        ):(
            <p>User not found</p>
        )}
    </div>
  )
}
