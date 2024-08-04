

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
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

const URL = process.env.NEXT_PUBLIC_URL;

export default async function Page() {



  const response = await fetch(`${URL}/api/posts`, { cache: 'no-store' });
  const dynamicData = await response.json();



  return (
    <>
      {/* You can render the dynamic data here */}



      <div className='flex flex-col gap-2'>


        <CreatePost />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {dynamicData.map((post: any) => (
            <Card key={post.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <CardTitle className="text-xl font-bold truncate">{post.name}</CardTitle>
                <Badge variant="outline" className="mt-2 bg-white text-purple-700">
                  {post.category}
                </Badge>
                <p className="mt-2 text-sm opacity-75">Seller: {post.author.name}</p>
              </CardHeader>
              <CardContent className="flex-grow p-4">
                {post.image && (
                  <div className="relative w-full h-60 mb-4">
                    <Image
                      src={post.image}
                      alt={post.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <Badge className="bg-green-500 text-white px-2 py-1">$</Badge>
                  <p className="text-lg font-semibold text-gray-700">{post.price}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2 p-4 bg-gray-50">
                <UpdatePost data={post} />
                <DeletePost post_id={post.id} />
              </CardFooter>
            </Card>
          ))}
        </div>

      </div>


    </>
  );
};

