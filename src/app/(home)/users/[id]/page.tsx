import React from 'react'
import type { User } from '@prisma/client';

const URL = process.env.NEXT_PUBLIC_URL

export default async function page({params}:{params:{id:string}}) {
    const {id} = params
    let dynamicData: User | null;
    try {
        const response = await fetch(`${URL}/api/users/${id}`, { cache: "no-store" });
        dynamicData = await response.json();        
    } catch (error) {
        dynamicData = null
    }

  return (
    <div>
        {dynamicData ? JSON.stringify(dynamicData) : <p>not found</p>}
    </div>
  )
}
