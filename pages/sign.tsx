import React from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react"

type Props = {};

export default function sign({ }: Props) {
  const router = useRouter();
  const { data: session } = useSession()

  if (session) {
    router.push('/home')
  }
  return (
    <div className={`${styles.main} bg-zinc-200`}>
      <img
        className="h-12 w-auto px-2"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-gray-900">
        Sign your account
      </h2>
      <div className="bg-white border-zinc-300 rounded flex justify-center items-center flex-col w-1/3 py-14">
        <Link
          className="w-3/5 flex justify-center m-2 first-letter:bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          href="/signin"
        >
          Sign in
        </Link>
        <Link
          className="w-3/5 flex justify-center m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          href="/signup"
        >
          Sign up
        </Link>
        <button onClick={() => signIn()} className="w-3/5 flex justify-center m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Sign up with google
        </button>
      </div>
    </div>
  );
}
