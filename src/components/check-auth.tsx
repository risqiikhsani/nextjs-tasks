'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CheckAuth({ children }:{children:React.ReactNode}) {
//   const router = useRouter();
//   const { data: session, status } = useSession();

//   useEffect(() => {
//     if (status === "loading") return; // Do nothing while loading
//     if (!session) router.push("/auth/login");
//   }, [session, status, router]);

//   if (status === "loading") {
//     return <div>Loading...</div>; // Or any loading component
//   }

  return <>{children}</>
}