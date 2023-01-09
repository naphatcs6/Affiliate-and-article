import React from 'react'
import { Route , Routes } from 'react-router-dom'
import Home from './home'
import Sign from './sign'
import { getSession, useSession } from "next-auth/react"

export default function Component() {
  return (
    <>
      <Sign/>
    </>
  )
}