
import { ClassEnrollmentType } from '@/types/types'
import EnrollmentCard from './enrollment-card'


const URL = process.env.NEXT_PUBLIC_API_URL

export default async function Enrollments({class_id}:{class_id:string}) {
    const response = await fetch(`${URL}/api/enrollments?class_id=${class_id}`)
    const data : ClassEnrollmentType[] = await response.json()
    
  return (
    <div className='flex flex-col gap-4'>

      {data ? (
        data.map((a,i) => (
          <EnrollmentCard data={a} key={i}/>
        ))
      ):(
        <p>No Members found</p>
      )}
    </div>
  )
}
