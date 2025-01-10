import GetDataStore from '@/components/get-data-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function page() {
  return (
    <div className='grid grid-cols-2 gap-2'>
      <GetDataStore/>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>List of users</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/users">See more</Link>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>All Classes</CardTitle>
          <CardDescription>List of classes</CardDescription>
        </CardHeader>
        <CardContent>
        <Link href="/classes">See more</Link>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>My Classes</CardTitle>
          <CardDescription>List of classes</CardDescription>
        </CardHeader>
        <CardContent>
        <Link href="/my-classes">See more</Link>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>My Tasks</CardTitle>
          <CardDescription>List of incomplete and completed tasks </CardDescription>
        </CardHeader>
        <CardContent>
        <Link href="/tasks">See more</Link>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Analytics</CardTitle>
          <CardDescription>Graph of</CardDescription>
        </CardHeader>
        <CardContent>
        <Link href="/submitted-tasks">See more</Link>
        </CardContent>
      </Card>
    </div>
  )
}
