"use client";
import { Button } from "../invoiceMaker/ui/button";
import { signOut } from "next-auth/react";

export const HeaderAuth = ({ session }: any) => {
  //   const { data: session } = useSession();
  return (
    <div>
      <div className="flex justify-between p-4">
        <div className="text-lg font-bold">Lancekit.</div>
        <div className="flex items-center gap-4">
          <div>{session?.user.name}</div>
          <img
            alt=""
            src={session?.user.image as string}
            width={40}
            height={40}
            className="rounded-full"
          />
          <Button onClick={() => signOut()}>Logout</Button>
        </div>
      </div>
    </div>
  );
};
