import { ReactNode } from "react";
import { StoreInitializer } from "./store-initializer";
import { cookies } from "next/headers";
import { clientErrorHandler } from "@/lib/error-handler";

const URL = process.env.NEXT_PUBLIC_API_URL;

async function getUser() {
  let response;
  try {
    response = await fetch(`${URL}/api/me`, {
      headers: {
        cookie: (await cookies()).toString(),
      },
    });
    return await response.json();
  } catch (error) {
    clientErrorHandler(error)
    return null; // Or handle gracefully depending on the use case
  }
}

async function getEnrollments(userId: string) {
  let response;
  try {
    response = await fetch(`${URL}/api/class-enrollments?user_id=${userId}`, {
      headers: {
        cookie: (await cookies()).toString(),
      },
    });
    return await response.json();
  } catch (error) {
    clientErrorHandler(error)
    return null;
  }
}

async function getOrgs(userId: string) {
  let response;
  try {
    response = await fetch(`${URL}/api/org-members?user_id=${userId}`, {
      headers: {
        cookie: (await cookies()).toString(),
      },
    });
    return await response.json();
  } catch (error) {
    clientErrorHandler(error)
    return null;
  }
}

export default async function StoreWrapper({
  children,
}: {
  children: ReactNode;
}) {
  // First get the user data since we need it for the enrollments query
  const user = await getUser();

  // If user fetch failed, handle appropriately (e.g., redirect, show error)
  if (!user) {
    return <div>Error fetching user data.</div>;
  }

  const [orgs, enrollments] = await Promise.all([
    getOrgs(user.id),
    getEnrollments(user.id),
  ]);

  return (
    <main>
      <StoreInitializer
        user={user}
        orgs={orgs || []}
        enrollments={enrollments || []}
      />
      {children}
    </main>
  );
}
