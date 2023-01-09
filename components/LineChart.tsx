import React from 'react'
import { Line } from "react-chartjs-2";
import { Chart } from 'react-chartjs-2';

type Props = {}

export default function LineChart({ chartData }: any) {
  return (
    <Line data={chartData} />
  )
}