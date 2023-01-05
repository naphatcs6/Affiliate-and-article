import React from 'react'
import Sidebar from './Sidebar'
import { AiOutlineMenu } from "react-icons/ai";

export default function Layout({ children }: any) {
  return (
    <>
      <div className='h-screen flex flex-row justify-start bg-gray-100'>
        <Sidebar />
        <div className='flex-1 bg-gray-100 overflow-y-auto'>
          {children}
        </div>
      </div>
    </>
  )
}