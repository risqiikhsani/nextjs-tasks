'use client';
import { useDataStore } from '@/stores/data';


export default function GetDataStore() {
    const {data} = useDataStore((state) => state)
  return (
    <div className='flex flex-col gap-2'>
        <h1>State</h1>
        <p>{data && data.name}</p>
        <p>{data && data.email}</p>
    </div>
  )
}
