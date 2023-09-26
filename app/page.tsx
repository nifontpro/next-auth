"use client";
import {useSession} from "next-auth/react";

export default function Home() {

  const { data: session } = useSession({ required: true });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        Test screen
      </div>
    </main>
  )
}