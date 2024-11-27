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
import CreateForm from "./create-form";
import UpdateForm from "./update-form";
import DeleteForm from "./delete-form";
import Dashboard from "@/components/dashboard";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth-options";
import type { News } from "@prisma/client";

const URL = process.env.NEXT_PUBLIC_URL;

export default async function Page() {
  const session = await getServerSession(authOptions);

  const response = await fetch(`${URL}/api/news`, { cache: "no-store" });
  const dynamicData: News[] = await response.json();

  return (
    <>
      {/* You can render the dynamic data here */}
      <div className="flex flex-col gap-2">
        <CreateForm />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {dynamicData.length === 0 && <p>No data available</p>}
          {dynamicData.length >= 1 &&
            dynamicData.map((data: any) => (
              <Card
                key={data.id}
                className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
              >
                <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <CardTitle className="text-xl font-bold truncate">
                    {data.title}
                  </CardTitle>

                  <p className="mt-2 text-sm opacity-75">
                    {data.author.name}
                  </p>
                </CardHeader>
                <CardContent className="flex-grow p-4">
                  {data.image && (
                    <div className="relative w-full h-60 mb-4">
                      <Image
                        src={data.image}
                        alt={data.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    </div>
                  )}
                  <p className="text-sm opacity-75">{data.text}</p>
                </CardContent>
                {data.author.id.toString() === session?.user?.id.toString() && (
                  <CardFooter className="flex justify-end space-x-2 p-4 bg-gray-50">
                    <UpdateForm data={data} />
                    <DeleteForm id={data.id} />
                  </CardFooter>
                )}
              </Card>
            ))}
        </div>
      </div>
    </>
  );
}
