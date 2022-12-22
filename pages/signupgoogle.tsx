import React from 'react'
import { userData } from '../data/user'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router";
import Home from './home';
import Register from './register';

type Props = {}

export default function signupgoogle({ }: Props) {
  const { data: session } = useSession()
  const router = useRouter()
  if (session) {
    return (
      <>
        <Register/>
        Signed in as {session.user?.email} <br/>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
}