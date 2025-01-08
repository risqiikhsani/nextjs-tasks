import React from 'react'
import CreateForm from './create-form'
import { Course as CourseType } from '@prisma/client'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { ConvertDate } from '@/lib/convert-date'
import UpdateForm from './update-form'
import DeleteForm from './delete-form'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import MenuWrapper from '@/components/menu-wrapper'

const URL = process.env.NEXT_PUBLIC_API_URL

export default async function Course({class_id}:{class_id:string}) {
    const response = await fetch(`${URL}/api/courses?class_id=${class_id}`)
    const data : CourseType[] = await response.json()
    
  return (
    <div className='flex flex-col gap-4'>
      <h1>Courses</h1>
      <CreateForm class_id={class_id}/>
      {data ? (
        data.map((a,i) => (
          <Card key={i}>
          <CardHeader>
            <div className='bg-orange-500 p-2'>Course</div>
            <h1 className="text-4xl font-bold">{a.name}</h1>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{a.description}</p>
            <div>
              <Badge>Creator</Badge> {a.creatorId}
            </div>
            <div>
              <Badge>Created</Badge> {ConvertDate(a.createdAt)}
            </div>
            <div>
              <Badge>Last Updated</Badge> {ConvertDate(a.updatedAt)}
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline">
              <Link href={`/courses/${a.id}`}>Detail</Link>
            </Button>
            <MenuWrapper>
              <UpdateForm data={a} />
              <DeleteForm data={a} />
            </MenuWrapper>
          </CardFooter>
        </Card>
        ))
      ):(
        <p>No courses found</p>
      )}
    </div>
  )
}
