import React, { useState } from 'react'
import Layout from '../components/Layout'
import { Line } from "react-chartjs-2"
import { dashData } from '../data/dashdata'
import LineChart from '../components/LineChart'
import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto';
Chart.register(CategoryScale);

type Props = {}

export default function dashboard({ }: Props) {
  const [userData, setUserData] = useState({
    labels: dashData.map((data) => data.month),
    datasets: [
      {
        label: "Amount",
        data: dashData.map((data) => data.amount),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  return (
    <Layout>
      <div className="bg-gray-50">
        <div className="px-4 py-5 sm:px-6 bg-white shadow">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Dashboard
          </h3>
        </div>
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="">
            <LineChart chartData={userData}/>
          </div>
        </div>
      </div>
    </Layout>
  )
}