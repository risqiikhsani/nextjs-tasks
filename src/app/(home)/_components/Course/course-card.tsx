import MenuWrapper from '@/components/menu-wrapper'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ConvertDate } from '@/lib/convert-date'
import { CourseType } from '@/types/types'
import Link from 'next/link'
import DeleteForm from './delete-form'
import UpdateForm from './update-form'

export default function CourseCard({data,detail=false}:{data:CourseType,detail?:boolean}) {
  return (
    <div>
        <Card className='p-4 border-l-8 border-orange-400'>

              <h1 className="flex gap-2 items-center text-4xl font-bold">
                {data.name}{" "}
                <span>
                  <Badge className="bg-orange-400 p-2">Course</Badge>
                </span>
              </h1>
              <p className="text-sm text-muted-foreground">
                Creator : {data.creator.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {ConvertDate(data.createdAt)}
              </p>

            {data.description}
          
          <div className="flex gap-2 justify-end items-center">
            {!detail && (
              <Button asChild variant="outline">
                <Link href={`/courses/${data.id}`}>Detail</Link>
              </Button>
            )}

            <MenuWrapper>
              <UpdateForm data={data} />
              <DeleteForm data={data} />
            </MenuWrapper>

          </div>
        </Card>
    </div>
  )
}
