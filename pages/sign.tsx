import React from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react"


type Props = {};

export default function sign({ }: Props) {
  const router = useRouter();
  const { data: session } = useSession()
  
  if(session){
    router.push('/home')
  }
  return (
    <div className={styles.main}>
      <div className="outline outline-offset-2 outline-1 rounded min-w-fit flex flex-col justify-center w-1/3">
        <Link
          className="flex justify-center m-2 first-letter:bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          href="/signin"
        >
          Sign in
        </Link>
        <Link
          className="flex justify-center m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          href="/signup"
        >
          Sign up
        </Link>
        <button onClick={() => signIn()} className="flex justify-center m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Sign up with google
        </button>
      </div>
    </div>
  );
}
