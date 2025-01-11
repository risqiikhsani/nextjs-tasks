import { Card, CardContent } from '@/components/ui/card'
import { ConvertDate } from '@/lib/convert-date'
import { ClassEnrollmentType } from '@/types/types'
import DeleteForm from './delete-form'
import { Badge } from '@/components/ui/badge'

export default function EnrollmentCard({data,detail=false}:{data:ClassEnrollmentType,detail?:boolean}) {
  return (
    <div>
        <Card className='p-2 flex items-center justify-between gap-2'>
              <p className='font-bold'>{data.user.name}</p>
              <p className='text-sm text-muted-foreground'>Member since : {ConvertDate(data.enrolledAt)}</p>
              <Badge variant="outline" className='bg-green-400'>{data.role.toLowerCase()}</Badge>
              <DeleteForm data={data}/>
        </Card>
    </div>
  )
}
