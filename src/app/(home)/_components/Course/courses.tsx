import { CourseWithCreatorType } from '@/types/types'
import CourseCard from './course-card'
import CreateForm from './create-form'


const URL = process.env.NEXT_PUBLIC_API_URL

export default async function Courses({class_id}:{class_id:string}) {
    const response = await fetch(`${URL}/api/courses?class_id=${class_id}`)
    const data : CourseWithCreatorType[] = await response.json()
    
  return (
    <div className='flex flex-col gap-4'>
      <CreateForm class_id={class_id}/>
      {data ? (
        data.map((a,i) => (
          <CourseCard data={a} key={i}/>
        ))
      ):(
        <p>No courses found</p>
      )}
    </div>
  )
}
