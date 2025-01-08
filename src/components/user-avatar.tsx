import { auth } from "../auth";
import Image from "next/image";
import { SignOut } from "./logout-button";
export default async function UserAvatar() {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <div>
      <Image
        height={100}
        width={100}
        src={session.user.image}
        alt="User Avatar"
      />
      <SignOut/>
    </div>
  );
}
