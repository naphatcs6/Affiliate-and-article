import React from 'react'
import Layout from '../components/Layout'

type Props = {}

export default function dashboard({ }: Props) {
  return (
    <Layout>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Dashboard</h3>
        </div>
      </header>
      <div>
        dashboard
        <div className="px-4 py-6 sm:px-0">
          <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" >
            asd
          </div>
        </div>
      </div>
    </Layout>

  )
}