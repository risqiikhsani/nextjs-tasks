import type { User } from "@prisma/client";
import React from "react";

const URL = process.env.NEXT_PUBLIC_URL

export default async function page() {
    const response = await fetch(`${URL}/api/users`, { cache: "no-store" });
    const dynamicData: User[] = await response.json();

  return(
    <div>
        {dynamicData && JSON.stringify(dynamicData)}
    </div>
  )
}
