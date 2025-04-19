"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export function SignInButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <>...</>;
  }

  if (status === "authenticated") {
    return (
      <Link href={`/dashboard`}>
        <Image
          src={session.user?.image ?? "/mememan.webp"}
          width={32}
          height={32}
          alt="Your Name"
        />
      </Link>
    );
  }

  return (
    <button
      className="hs-dark-mode hs-dark-mode-active:hidden flex items-center gap-x-2 py-2 px-3 bg-white/10 rounded-full text-sm text-white hover:bg-white/20 focus:outline-hidden focus:bg-white/20"
      data-hs-theme-click-value="dark"
      onClick={() => signIn()}
    >
      Sign in
    </button>
  );
}

export function SignOutButton() {
  return (
    <button
      className="hs-dark-mode hs-dark-mode-active:hidden flex items-center gap-x-2 py-2 px-3 bg-white/10 rounded-full text-sm text-white hover:bg-white/20 focus:outline-hidden focus:bg-white/20"
      data-hs-theme-click-value="dark"
      onClick={() => signOut()}
    >
      Sign out
    </button>
  );
}
