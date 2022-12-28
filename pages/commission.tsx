import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import styles from "../styles/Home.module.css";

type Props = {}

export default function commission({ }: Props) {
  const [inputs, setInputs] = useState<any>({
    price: 0,
    amount: 0,
    commission: 0,
    result: 0,
  });
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));

  };
  // const valueCom = (inputs.price * inputs.amount) / inputs.commission * 100
  // setInputs({ ...inputs, result: valueCom })

  return (
    <Layout>
      <div className="bg-gray-50">
        <div className="px-4 py-5 sm:px-6 bg-white shadow">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Calculate commission
          </h3>
        </div>
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="">
            <dl>
              <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Price (฿)</dt>
                <dd className="text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <input className='relative block w-5/6 appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                    name="price"
                    type='number'
                    value={inputs.price}
                    onChange={handleChange}
                  />
                </dd>
              </div>
              <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Amount</dt>
                <dd className="text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <input className='relative block w-5/6 appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                    name="amount"
                    type='number'
                    value={inputs.amount}
                    onChange={handleChange}
                  />
                </dd>
              </div>
              <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Commission (%)</dt>
                <dd className="text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <input className='relative block w-5/6 appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                    name="commission"
                    type='number'
                    value={inputs.commission}
                    onChange={handleChange}
                  />
                </dd>
              </div>
              <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Commission amount</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{(inputs.price * inputs.amount) * inputs.commission / 100}</dd>
              </div>
              <div className="bg-gray-200 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Tier 1: Commission</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Commission</dd>

                <dt className="text-sm font-medium text-gray-500">Tier 2: Commission</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Commission</dd>

                <dt className="text-sm font-medium text-gray-500">Tier 3: Commission</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Commission</dd>

                <dt className="text-sm font-medium text-gray-500">Tier 4: Commission</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Commission</dd>

                <dt className="text-sm font-medium text-gray-500">Tier 5: Commission</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Commission</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </Layout>
  );
}