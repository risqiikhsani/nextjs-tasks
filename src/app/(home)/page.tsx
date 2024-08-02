

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import CreatePost from './_posts/create-post';
import UpdatePost from './_posts/update-post';
import DeletePost from './_posts/delete-post';
import Dashboard from '@/components/dashboard';

const URL = process.env.NEXT_PUBLIC_URL;

export default async function Page() {



    const response = await fetch(`${URL}/api/posts`, { cache: 'no-store' });
    const dynamicData = await response.json();



  return (
    <>
      {/* You can render the dynamic data here */}

      

      <div className='flex flex-col gap-2'>

      
        <CreatePost/>
        {dynamicData.map((post: any) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              {/* <CardDescription>{post.body}</CardDescription> */}

            </CardHeader>
            <CardContent>
              <p>{post.content}</p>
            </CardContent>
            <CardFooter className='flex gap-2 items-center justify-end'>
              <UpdatePost data={post}/>
              <DeletePost post_id={post.id}/>
            </CardFooter>
          </Card>
        ))}
      </div>


    </>
  );
};

