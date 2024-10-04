import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CreatePost from "./_posts/create-post";
import UpdatePost from "./_posts/update-post";
import DeletePost from "./_posts/delete-post";
import Dashboard from "@/components/dashboard";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth-options";

const URL = process.env.NEXT_PUBLIC_URL;

export default async function Page() {
  const session = await getServerSession(authOptions);

  const response = await fetch(`${URL}/api/tasks`, { cache: "no-store" });
  const dynamicData = await response.json();

  return (
    <>
      {/* You can render the dynamic data here */}

      <div className="flex flex-col gap-2">
        <CreatePost />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {dynamicData.length === 0 && <p>No data available</p>}
          {dynamicData.length != 0 &&
            dynamicData.map((task: any) => (
              <Card
                key={task.id}
                className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
              >
                <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <CardTitle className="text-xl font-bold truncate">
                    {task.name}
                  </CardTitle>

                  <p className="mt-2 text-sm opacity-75">
                    {task.author.name}
                  </p>
                </CardHeader>
                <CardContent className="flex-grow p-4">
                  {task.image && (
                    <div className="relative w-full h-60 mb-4">
                      <Image
                        src={task.image}
                        alt={task.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    </div>
                  )}
                  <p className="text-sm opacity-75">{task.detail}</p>
                </CardContent>
                {task.author.id.toString() === session?.user?.id.toString() && (
                  <CardFooter className="flex justify-end space-x-2 p-4 bg-gray-50">
                    <UpdatePost data={task} />
                    <DeletePost Task_id={task.id} />
                  </CardFooter>
                )}
              </Card>
            ))}
        </div>
      </div>
    </>
  );
}
