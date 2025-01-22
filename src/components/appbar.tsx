import { auth } from "@/auth";
import { SignOut } from "./logout-button";
import { Button } from "./ui/button";
import Link from "next/link";
import SearchBar from "./search-bar";
import StoreWrapper from "./store-wrapper";
import { Badge } from "./ui/badge";

export default async function Appbar() {
  const session = await auth();

  return (
    <StoreWrapper>
    <div className="p-4 fixed w-full top-0 start-0 z-50 shadow-xl opacity-100 bg-slate-50 ">
      {session?.user ? (
        <div className="flex justify-between items-center">
          <div>
          <p>welcome, {session.user.name} </p>
          <Badge>{session.user.role.toLowerCase()}</Badge>
          </div>

        <SearchBar/>
        <SignOut/>
        </div>
      ):(
        <div className="flex justify-between items-center">
        <p>Not authenticated</p>
        <SearchBar/>
        <Button asChild variant="outline"><Link href="/auth/login">Login</Link></Button>
        </div>
      )}
    </div>
    </StoreWrapper>
  );
}
