"use client"

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
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default function Page() {
    const [dynamicData, setDynamicData] = React.useState<any>({});

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/me");
                const data = await response.json();
                setDynamicData(data);
            } catch (error) {
                console.error("Error fetching dynamic data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
            <Card className="max-w-md w-full bg-white shadow-lg rounded-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-semibold text-gray-800">
                        User Profile
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-500">
                        {dynamicData.username ? `@${dynamicData.username}` : "Loading..."}
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                    {/* Profile Image */}
                    {dynamicData.image ? (
                        <Image
                            src={dynamicData.image}
                            alt="Profile Picture"
                            width={100}
                            height={100}
                            className="rounded-full mb-4"
                        />
                    ) : (
                        <div className="h-24 w-24 bg-gray-300 rounded-full mb-4"></div>
                    )}

                    {/* Dynamic Data */}
                    <p className="text-lg font-medium text-gray-900">
                        {dynamicData.name || "Loading..."}
                    </p>
                    <p className="text-gray-500">{dynamicData.email || "Loading..."}</p>

                    {/* Badge for role */}
                    {dynamicData.role && (
                        <Badge className="mt-2">{dynamicData.role}</Badge>
                    )}
                </CardContent>
                {/* <CardFooter className="flex justify-center">
                    <Button className="w-full" variant="">
                        Edit Profile
                    </Button>
                </CardFooter> */}
            </Card>
        </div>
    );
}
