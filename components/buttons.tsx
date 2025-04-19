"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export function SignInButton() {
  const { status } = useSession();

  if (status === "loading") {
    return <>...</>;
  }

  return status === "unauthenticated" ? (
    <button
      className="hs-dark-mode flex items-center gap-x-2 py-2 px-3 bg-white/10 rounded-full text-sm text-white hover:bg-white/20 focus:outline-hidden focus:bg-white/20"
      data-hs-theme-click-value="dark"
      onClick={() => signIn()}
    >
      Sign in
    </button>
  ) : (
    ""
  );
}

export function SignOutButton() {
  const { data: session, status } = useSession();

  return status === "authenticated" ? (
    <>
      <button
        className="hs-dark-mode flex items-center gap-x-2 py-2 px-3 bg-white/10 rounded-full text-sm text-white hover:bg-white/20 focus:outline-hidden focus:bg-white/20"
        data-hs-theme-click-value="dark"
        onClick={() => signOut()}
      >
        Sign out
      </button>
      <Link href={`/dashboard`}>
        <Image
          src={session.user?.image ?? "/mememan.webp"}
          width={32}
          height={32}
          className="rounded-full"
          alt="Your Name"
        />
      </Link>
    </>
  ) : (
    ""
  );
}
