import MenuWrapper from '@/components/menu-wrapper'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ConvertDate } from '@/lib/convert-date'
import { CourseWithCreatorType } from '@/types/types'
import Link from 'next/link'
import DeleteForm from './delete-form'
import UpdateForm from './update-form'

export default function CourseCard({data,detail=false}:{data:CourseWithCreatorType,detail?:boolean}) {
  return (
    <div>
        <Card>
          <CardContent>
            <CardHeader>
              <CardTitle className="flex gap-2 items-center">
                {data.name}{" "}
                <span>
                  <Badge className="bg-orange-400 p-2">Course</Badge>
                </span>
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Creator : {data.creator.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {ConvertDate(data.createdAt)}
              </p>
            </CardHeader>
            {data.description}
          </CardContent>
          <CardFooter className="flex gap-2 justify-end">
            {!detail && (
              <Button asChild variant="outline">
                <Link href={`/courses/${data.id}`}>Detail</Link>
              </Button>
            )}
  
            <MenuWrapper>
              <UpdateForm data={data} />
              <DeleteForm data={data} />
            </MenuWrapper>
          </CardFooter>
        </Card>
    </div>
  )
}
