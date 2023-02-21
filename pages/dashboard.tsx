import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { Line } from "react-chartjs-2"
import { dashData } from '../data/dashdata'
import LineChart from '../components/LineChart'
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import { useSession } from "next-auth/react";
Chart.register(CategoryScale);

type Props = {}

export default function dashboard({ }: Props) {
  const { data: session } = useSession()
  const mailGoo = session?.user?.email as string
  const nameGoo = session?.user?.name as string
  const [userCurr, setUser] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    dateborn: "",
    address: "",
    province: "",
    district: "",
    postcode: "",
  });
  if (session) {
    const userLocal = localStorage.getItem("userLogin") ? JSON.parse(localStorage.getItem("userLogin")!) : "";
    if (userLocal.email == "") {
      console.log('eiei')
      userCurr.email = mailGoo
      userCurr.firstname = nameGoo
      localStorage.setItem('userLogin', JSON.stringify(userCurr));
    }
  }
  const [datadash, setDatadash] = useState({
    visit: 0,
    booking: 0,
    checkout: 0,
    commission: 0,
  })
  dashData.map((item, index) => {
    datadash.visit = item.visit
    datadash.booking = item.booking
    datadash.checkout = item.checkout
    datadash.commission = 23
  })
  const [userData, setUserData] = useState({
    labels: dashData.map((data) => data.time),
    datasets: [
      {
        label: "Visit",
        type: 'line' as const,
        data: dashData.map((data) => data.visit),
        backgroundColor: ["rgba(245,39,39,0.8)",],
        borderColor: "red",
        borderWidth: 2,
      },
      {
        label: "Bookings",
        type: 'line' as const,
        data: dashData.map((data) => data.checkout),
        backgroundColor: ["rgba(238,245,39,0.8)",],
        borderColor: "yellow",
        borderWidth: 2,
      },
      {
        label: "Check out",
        type: 'bar' as const,
        data: dashData.map((data) => data.booking),
        backgroundColor: ["rgba(85,85,85,1)",],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  return (
    <Layout>
      <title>Dashboard</title>
      <div className="bg-white">
       
        <div className='flex flex-row justify-center p-4'>
          <div className='mx-4 w-1/6 rounded border-2 border-zinc-500'>
            <p className='px-2'>Visits</p>
            <div className='flex flex-row'>
              <p className='text-lg text-orange-500 px-2'>{datadash.visit}</p>
              <p className='ml-auto px-2'>คน</p>
            </div>
          </div>
          <div className='mx-4 w-1/6 rounded border-2 border-zinc-500'>
            <p className='px-2'>Booking</p>
            <div className='flex flex-row'>
              <p className='text-lg text-green-500 px-2'>{datadash.booking}</p>
              <p className='ml-auto px-2'>ครั้ง</p>
            </div>
          </div>
          <div className='mx-4 w-1/6 rounded border-2 border-zinc-500'>
            <p className='px-2'>Check out</p>
            <div className='flex flex-row'>
              <p className='text-lg text-red-500 px-2'>{datadash.checkout}</p>
              <p className='ml-auto px-2'>ครั้ง</p>
            </div>
          </div>
          <div className='mx-4 w-1/6 rounded border-2 border-zinc-500'>
            <p className='px-2'>Comission</p>
            <div className='flex flex-row'>
              <p className='text-lg px-2'>{datadash.commission}</p>
              <p className='ml-auto px-2'>THB</p>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-8 sm:px-6 lg:max-w-5xl lg:px-8 rounded-lg border-4 border-dashed border-gray-200">
          <div className="">
            <LineChart chartData={userData} />
          </div>
        </div>
      </div>
    </Layout>
  )
}