import { JoinRequestType } from '@/types/types'
import React from 'react'
import Action from './action/action'

export default function RequestCard({data}:{data:JoinRequestType}) {
  return (
    <div className='p-2 border shadow-md rounded-md flex flex-row gap-2 items-center justify-between'>
        {data && (<p>{data.user.name}</p>)}
        <Action data={data}/>
    </div>
  )
}
